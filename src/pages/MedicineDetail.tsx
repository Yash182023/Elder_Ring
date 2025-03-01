import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MedicineDetail.module.scss';
import Background from '../components/Background/Background';

interface Medicine {
  id: number;
  name: string;
  image: string;
  description: string;
  shortDescription: string;
  price: number;
  dosage: string;
  usageInstructions: string;
  sideEffects: string;
  requiresPrescription: boolean;
  inStock: boolean;
}

const MedicineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  // This would ideally come from an API, but for demo purposes we'll simulate it
  useEffect(() => {
    // Simulating API call to get medicine details
    const fetchMedicineDetails = () => {
      setLoading(true);
      // For demo, we'll create mock data based on ID
      // In a real app, this would be an API call
      setTimeout(() => {
        const mockMedicines: Record<string, Medicine> = {
          '1': {
            id: 1,
            name: "Amoxicillin",
            image: "/image/Pharma/antibiotic.jpg",
            description: "Amoxicillin is a penicillin antibiotic that fights bacteria in your body. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.",
            shortDescription: "Broad-spectrum antibiotic for bacterial infections",
            price: 12.99,
            dosage: "250mg, 500mg tablets",
            usageInstructions: "Take every 8 hours with or without food. Complete the full course as prescribed.",
            sideEffects: "Diarrhea, stomach upset, nausea, vomiting, rash",
            requiresPrescription: true,
            inStock: true
          },
          '2': {
            id: 2,
            name: "Lisinopril",
            image: "/image/Pharma/Cardi.jpg",
            description: "Lisinopril is an ACE inhibitor that is used to treat high blood pressure (hypertension) or congestive heart failure. It is also used to improve survival after a heart attack.",
            shortDescription: "ACE inhibitor for hypertension and heart failure",
            price: 15.49,
            dosage: "10mg, 20mg tablets",
            usageInstructions: "Take once daily at the same time each day. May be taken with or without food.",
            sideEffects: "Dizziness, headache, dry cough, fatigue",
            requiresPrescription: true,
            inStock: true
          },
          '3': {
            id: 3,
            name: "Metformin",
            image: "/image/Pharma/Diabetes.jpg",
            description: "Metformin is an oral diabetes medicine that helps control blood sugar levels. It is used together with diet and exercise to improve blood sugar control in adults with type 2 diabetes.",
            shortDescription: "First-line medication for type 2 diabetes",
            price: 14.99,
            dosage: "500mg, 850mg, 1000mg tablets",
            usageInstructions: "Take with meals to minimize stomach upset. Do not crush or chew extended-release tablets.",
            sideEffects: "Nausea, vomiting, stomach upset, diarrhea, metallic taste",
            requiresPrescription: true,
            inStock: true
          },
          '4': {
            id: 4,
            name: "Albuterol Inhaler",
            image: "/image/Pharma/Respira.png",
            description: "Albuterol is a bronchodilator that relaxes muscles in the airways and increases air flow to the lungs. It is used to treat or prevent bronchospasm in people with reversible obstructive airway disease.",
            shortDescription: "Bronchodilator for asthma and COPD",
            price: 29.99,
            dosage: "90mcg per actuation",
            usageInstructions: "For acute symptoms, inhale 2 puffs every 4-6 hours. Wait at least 1 minute between inhalations.",
            sideEffects: "Nervousness, shaking, headache, throat irritation",
            requiresPrescription: true,
            inStock: true
          },
          '5': {
            id: 5,
            name: "Ibuprofen",
            image: "/image/Pharma/Pain.jpg",
            description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that reduces hormones that cause inflammation and pain in the body. It is used to reduce fever and treat pain or inflammation.",
            shortDescription: "NSAID for pain relief and inflammation",
            price: 8.99,
            dosage: "200mg tablets",
            usageInstructions: "Take with food or milk to prevent stomach upset. Do not exceed recommended dosage.",
            sideEffects: "Stomach pain, heartburn, nausea, dizziness",
            requiresPrescription: false,
            inStock: true
          },
          '6': {
            id: 6,
            name: "DayQuil Cold & Flu",
            image: "/image/Pharma/Cold.jpg",
            description: "DayQuil is a combination medicine used to treat headache, fever, body aches, cough, congestion, and sinus pressure caused by allergies, the common cold, or the flu.",
            shortDescription: "Multi-symptom cold and flu relief",
            price: 11.49,
            dosage: "Liquid capsules, 30 count",
            usageInstructions: "Take 2 capsules every 4 hours, not exceeding 12 capsules in 24 hours.",
            sideEffects: "Nervousness, dizziness, insomnia",
            requiresPrescription: false,
            inStock: true
          },
          '7': {
            id: 7,
            name: "Vitamin D3 Supplement",
            image: "/image/Pharma/Vitamin_D.jpg",
            description: "Vitamin D3 supplements help maintain strong bones by assisting in calcium absorption, supporting immune function, and promoting cell growth.",
            shortDescription: "Essential vitamin for bone health and immunity",
            price: 13.99,
            dosage: "2000 IU, 60 softgels",
            usageInstructions: "Take one softgel daily with a meal.",
            sideEffects: "Generally well-tolerated. Excess may cause fatigue, weakness",
            requiresPrescription: false,
            inStock: true
          },
          '8': {
            id: 8,
            name: "First Aid Antibiotic Ointment",
            image: "/image/Pharma/First_Aid.jpg",
            description: "This antibiotic ointment is used to prevent and treat minor skin infections caused by small cuts, scrapes, or burns.",
            shortDescription: "Topical antibiotic for minor wounds",
            price: 6.99,
            dosage: "1 oz tube",
            usageInstructions: "Clean affected area before applying a small amount 1-3 times daily.",
            sideEffects: "Skin irritation, rash, itching (rare)",
            requiresPrescription: false,
            inStock: true
          }
        };

        const medicineData = mockMedicines[id || '1'];
        if (medicineData) {
          setMedicine(medicineData);
        } else {
          setError('Medicine not found');
        }
        setLoading(false);
      }, 500); // Simulate network delay
    };

    fetchMedicineDetails();
  }, [id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPrescriptionFile(e.target.files[0]);
    }
  };

  // This function should remain in the MedicineDetail.tsx file
// Just update its implementation
    const handleCheckout = () => {
    if (medicine?.requiresPrescription && !prescriptionFile) {
      setError('Please upload a prescription before checkout');
      return;
    }
  
    setError('');
    // Navigate to checkout with medicine details and prescription file info
    navigate('/checkout', {
      state: {
        price: medicine?.price ? medicine.price * quantity : 0,
        productTitle: medicine ? `${medicine.name} (${quantity} ${quantity === 1 ? 'unit' : 'units'})` : '',
        isMedicine: true,
        requiresPrescription: medicine?.requiresPrescription,
        prescriptionFile: prescriptionFile
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading medicine details...</p>
        <Background />
      </div>
    );
  }

  if (error && !medicine) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/pharma')} className={styles.backButton}>
          Back to Medicines
        </button>
        <Background />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className={styles.medicineDetail}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.breadcrumbs}>
            <span onClick={() => navigate('/pharma')} className={styles.breadcrumbLink}>Medicines</span>
            <span> &gt; </span>
            <span>{medicine?.name}</span>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.imageContainer}>
              <img src={medicine?.image} alt={medicine?.name} />
            </div>

            <div className={styles.detailsContainer}>
              <h1>{medicine?.name}</h1>
              <p className={styles.shortDescription}>{medicine?.shortDescription}</p>
              <div className={styles.priceContainer}>
                <span className={styles.price}>${medicine?.price.toFixed(2)}</span>
                <span className={styles.stock}>
                  {medicine?.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className={styles.dosageInfo}>
                <h4>Dosage</h4>
                <p>{medicine?.dosage}</p>
              </div>

              {medicine?.requiresPrescription && (
                <div className={styles.prescriptionRequired}>
                  <div className={styles.prescriptionAlert}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>Prescription Required</span>
                  </div>
                  <div className={styles.uploadSection}>
                    <label htmlFor="prescription">Upload Prescription</label>
                    <input 
                      type="file" 
                      id="prescription" 
                      accept=".jpg,.jpeg,.png,.pdf" 
                      onChange={handleFileChange}
                    />
                    {prescriptionFile && (
                      <div className={styles.fileInfo}>
                        <span>✓ {prescriptionFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className={styles.quantitySelector}>
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>

              <button 
                onClick={handleCheckout}
                className={styles.checkoutButton}
                disabled={!medicine?.inStock}
              >
                {medicine?.inStock ? 'Order Now' : 'Out of Stock'}
              </button>
            </div>
          </div>

          <div className={styles.additionalInfo}>
            <div className={styles.infoTab}>
              <h3>Description</h3>
              <p>{medicine?.description}</p>
            </div>
            
            <div className={styles.infoTab}>
              <h3>Usage Instructions</h3>
              <p>{medicine?.usageInstructions}</p>
            </div>
            
            <div className={styles.infoTab}>
              <h3>Side Effects</h3>
              <p>{medicine?.sideEffects}</p>
            </div>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default MedicineDetail;