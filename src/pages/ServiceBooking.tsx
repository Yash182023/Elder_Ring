import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ServiceBooking.module.scss';
import Background from '../components/Background/Background';


interface Provider {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  image: string;
  availability: string[];
}

interface ServiceDetails {
  id: number;
  name: string;
  image: string;
  description: string;
  providers: number;
  type: 'healthcare' | 'service';
  hourlyRate: number;
  fullDescription: string;
}

const ServiceBooking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Mock data for service details
  const servicesData: ServiceDetails[] = [
    {
      id: 1,
      name: "Medical Doctors",
      image: "/image/Services/MedDoc.jpg",
      description: "Experienced physicians providing remote consultations and monitoring",
      providers: 48,
      type: 'healthcare',
      hourlyRate: 120,
      fullDescription: "Our network of board-certified physicians offers comprehensive virtual and in-person consultations. Services include general check-ups, specialist referrals, prescription management, and ongoing health monitoring."
    },
    {
      id: 2,
      name: "Nursing Care",
      image: "/image/Services/Nurse.jpg",
      description: "Professional nurses offering both in-home and remote care services",
      providers: 35,
      type: 'healthcare',
      hourlyRate: 75,
      fullDescription: "Our registered nurses provide compassionate care in your home. Services include medication management, wound care, vital signs monitoring, and health assessments. Available for short-term recovery or long-term care needs."
    },
    // Add other services data
    {
      id: 4,
      name: "Caregiving Services",
      image: "/image/Services/Caregiver.jpg",
      description: "Professional caregivers providing personal care and assistance",
      providers: 52,
      type: 'service',
      hourlyRate: 45,
      fullDescription: "Our professional caregivers offer personalized assistance with daily activities, companionship, medication reminders, light housekeeping, and personal care. All caregivers are thoroughly screened and trained."
    }
  ];

  // Mock data for providers
  const providersData: { [key: number]: Provider[] } = {
    1: [
      { id: 101, name: "Dr. Sarah Johnson", specialization: "General Medicine", rating: 4.8, image: "/image/Providers/doctor1.jpg", availability: ["Monday", "Wednesday", "Friday"] },
      { id: 102, name: "Dr. Michael Chen", specialization: "Internal Medicine", rating: 4.7, image: "/image/Providers/doctor2.jpg", availability: ["Tuesday", "Thursday", "Saturday"] },
      { id: 103, name: "Dr. Emily Rodriguez", specialization: "Family Medicine", rating: 4.9, image: "/image/Providers/doctor3.jpg", availability: ["Monday", "Tuesday", "Thursday"] }
    ],
    2: [
      { id: 201, name: "Nurse Rachel Greene", specialization: "Critical Care", rating: 4.7, image: "/image/Providers/nurse1.jpg", availability: ["Monday", "Tuesday", "Wednesday"] },
      { id: 202, name: "Nurse David Wilson", specialization: "Geriatric Care", rating: 4.8, image: "/image/Providers/nurse2.jpg", availability: ["Thursday", "Friday", "Saturday"] }
    ],
    4: [
      { id: 401, name: "Maria Garcia", specialization: "Senior Care", rating: 4.9, image: "/image/Providers/caregiver1.jpg", availability: ["Monday", "Wednesday", "Friday"] },
      { id: 402, name: "Thomas Brown", specialization: "Disability Care", rating: 4.6, image: "/image/Providers/caregiver2.jpg", availability: ["Tuesday", "Thursday", "Saturday", "Sunday"] }
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch service details
    setLoading(true);
    
    const serviceIdNumber = serviceId ? parseInt(serviceId) : 0;
    const serviceData = servicesData.find(s => s.id === serviceIdNumber);
    
    if (serviceData) {
      setService(serviceData);
      // Fetch providers for this service
      const serviceProviders = providersData[serviceIdNumber] || [];
      setProviders(serviceProviders);
      setError('');
    } else {
      setError('Service not found');
    }
    
    setLoading(false);
  }, [serviceId]);

  const handleProviderSelection = (providerId: number) => {
    setSelectedProvider(providerId);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(parseInt(e.target.value));
  };

  const handleBookNow = () => {
    if (!selectedProvider || !selectedDate || !selectedTime) {
      setError('Please select a provider, date, and time');
      return;
    }

    const provider = providers.find(p => p.id === selectedProvider);
    
    if (!service || !provider) {
      setError('Invalid selection');
      return;
    }

    // Calculate total price
    const totalPrice = service.hourlyRate * duration;
    
    // Create booking details
    const bookingDetails = {
      serviceId: service.id,
      serviceName: service.name,
      providerId: provider.id,
      providerName: provider.name,
      date: selectedDate,
      time: selectedTime,
      duration: duration,
      totalPrice: totalPrice
    };
    
    // Store booking details in session storage for checkout
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    
    // Navigate to checkout
    navigate('/checkout', { 
      state: { 
        price: totalPrice, 
        productTitle: `${service.name} with ${provider.name} (${duration} hour${duration > 1 ? 's' : ''})` 
      } 
    });
  };

  if (loading) {
    return <div className="container"><div className={styles.loading}>Loading...</div></div>;
  }

  if (error) {
    return <div className="container"><div className={styles.error}>{error}</div></div>;
  }

  if (!service) {
    return <div className="container"><div className={styles.error}>Service not found</div></div>;
  }

  // Generate available times
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      times.push(`${formattedHour}:00`);
      if (hour < 17) {
        times.push(`${formattedHour}:30`);
      }
    }
    return times;
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="container">
        <div className={styles.booking_page}>
          <div className={styles.header}>
            <h1>Book {service.name}</h1>
            <p>{service.fullDescription}</p>
          </div>

          <div className={styles.booking_container}>
            <div className={styles.service_info}>
              <div className={styles.image_container}>
                <img src={service.image} alt={service.name} />
              </div>
              <div className={styles.info_details}>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <div className={styles.price_info}>
                  <span className={styles.price}>${service.hourlyRate}/hour</span>
                </div>
              </div>
            </div>

            <div className={styles.booking_form}>
              <h3>Select a Provider</h3>
              <div className={styles.providers_list}>
                {providers.map(provider => (
                  <div 
                    key={provider.id} 
                    className={`${styles.provider_card} ${selectedProvider === provider.id ? styles.selected : ''}`}
                    onClick={() => handleProviderSelection(provider.id)}
                  >
                    <div className={styles.provider_image}>
                      <img src={provider.image || '/image/placeholder.jpg'} alt={provider.name} />
                    </div>
                    <div className={styles.provider_details}>
                      <h4>{provider.name}</h4>
                      <p>{provider.specialization}</p>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={i < Math.floor(provider.rating) ? styles.star_filled : styles.star}
                          >
                            ★
                          </span>
                        ))}
                        <span className={styles.rating_number}>{provider.rating}/5</span>
                      </div>
                      <div className={styles.availability}>
                        <p>Available: {provider.availability.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.datetime_section}>
                <div className={styles.date_picker}>
                  <h3>Select Date</h3>
                  <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={handleDateChange} 
                    min={today}
                    required
                  />
                </div>

                <div className={styles.time_picker}>
                  <h3>Select Time</h3>
                  <select value={selectedTime} onChange={handleTimeChange} required>
                    <option value="">Select a time</option>
                    {generateTimeOptions().map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.duration_picker}>
                  <h3>Duration</h3>
                  <select value={duration} onChange={handleDurationChange}>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </select>
                </div>
              </div>

              <div className={styles.summary}>
                <h3>Booking Summary</h3>
                <div className={styles.summary_details}>
                  <div className={styles.summary_row}>
                    <span>Service:</span>
                    <span>{service.name}</span>
                  </div>
                  <div className={styles.summary_row}>
                    <span>Provider:</span>
                    <span>{selectedProvider ? providers.find(p => p.id === selectedProvider)?.name : 'Not selected'}</span>
                  </div>
                  <div className={styles.summary_row}>
                    <span>Date:</span>
                    <span>{selectedDate || 'Not selected'}</span>
                  </div>
                  <div className={styles.summary_row}>
                    <span>Time:</span>
                    <span>{selectedTime || 'Not selected'}</span>
                  </div>
                  <div className={styles.summary_row}>
                    <span>Duration:</span>
                    <span>{duration} hour{duration > 1 ? 's' : ''}</span>
                  </div>
                  <div className={styles.total_row}>
                    <span>Total:</span>
                    <span>${(service.hourlyRate * duration).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                className={styles.book_button}
                onClick={handleBookNow}
                disabled={!selectedProvider || !selectedDate || !selectedTime}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default ServiceBooking;