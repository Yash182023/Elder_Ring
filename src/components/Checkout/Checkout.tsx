// //Claude's edit


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './Checkout.module.scss';
// import Background from '../Background/Background';

// export interface CheckoutProps {
//   price: number;
//   productTitle: string;
// }

// interface ShippingData {
//   fullName: string;
//   email: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// interface PaymentData {
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// const Checkout: React.FC<CheckoutProps> = ({ price, productTitle }) => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [success, setSuccess] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
  
//   const [shippingData, setShippingData] = useState<ShippingData>({
//     fullName: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: ''
//   });

//   const [paymentData, setPaymentData] = useState<PaymentData>({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: ''
//   });

//   const handleShippingSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setStep(2);
//   };

//   // Payment validation helpers
//   const validateCardNumber = (cardNumber: string): boolean => {
//     const cleanNumber = cardNumber.replace(/[\s-]/g, '');
//     return /^\d{16}$/.test(cleanNumber);
//   };

//   const validateExpiryDate = (expiryDate: string): boolean => {
//     if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    
//     const [month, year] = expiryDate.split('/').map(Number);
//     const now = new Date();
//     const currentYear = now.getFullYear() % 100;
//     const currentMonth = now.getMonth() + 1;

//     if (month < 1 || month > 12) return false;
    
//     if (year < currentYear || (year === currentYear && month < currentMonth)) {
//       return false;
//     }

//     return true;
//   };

//   const validateCVV = (cvv: string): boolean => {
//     return /^\d{3,4}$/.test(cvv);
//   };

//   const formatCardNumber = (cardNumber: string): string => {
//     const cleaned = cardNumber.replace(/\D/g, '');
//     const chunks = cleaned.match(/.{1,4}/g) || [];
//     return chunks.join(' ');
//   };

//   const handlePaymentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Validate card details
//       const cleanCardNumber = paymentData.cardNumber.replace(/[\s-]/g, '');
//       if (!validateCardNumber(cleanCardNumber)) {
//         setError('Invalid card number - must be 16 digits');
//         setLoading(false);
//         return;
//       }

//       if (!validateExpiryDate(paymentData.expiryDate)) {
//         setError('Invalid expiry date - use MM/YY format');
//         setLoading(false);
//         return;
//       }

//       if (!validateCVV(paymentData.cvv)) {
//         setError('Invalid CVV - must be 3 or 4 digits');
//         setLoading(false);
//         return;
//       }

//       // Check for authentication token
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be logged in to checkout');
//         setLoading(false);
//         return;
//       }
      
//       console.log('Preparing checkout request with token:', token);
      
//       // Prepare checkout data
//       const checkoutData = {
//         shipping: shippingData,
//         items: [{
//           title: productTitle,
//           quantity: 1,
//           price: price
//         }],
//         totalPrice: price
//       };
      
//       console.log('Sending checkout data:', JSON.stringify(checkoutData));
      
//       // Send checkout data to server
//       const response = await fetch('http://localhost:3001/api/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(checkoutData)
//       });
      
//       console.log('Server response status:', response.status);
      
//       const data = await response.json();
//       console.log('Server response data:', data);
      
//       if (!response.ok) {
//         throw new Error(data.error || `Error ${response.status}: Failed to process payment`);
//       }
      
//       console.log('Checkout successful:', data);
//       setSuccess(true);
//     } catch (err) {
//       console.error('Checkout error:', err);
//       setError(err instanceof Error ? err.message : 'An error occurred during checkout');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className={styles.success}>
//         <div className={styles.successContent}>
//           <h2>Payment Successful!</h2>
//           <p>Thank you for your purchase.</p>
//           <p>Your order will be shipped soon.</p>
//           <a href="/" className={styles.returnBtn}>Return to Shop</a>
//         </div>
//         <Background />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container">
//         <div className={styles.checkout}>
//           {error && <div className={styles.error}>{error}</div>}
          
//           <div className={styles.steps}>
//             <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
//               1. Shipping
//             </div>
//             <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
//               2. Payment
//             </div>
//           </div>

//           <div className={styles.orderSummary}>
//             <h3>Order Summary</h3>
//             <div className={styles.orderDetails}>
//               <p>{productTitle}</p>
//               <p>${price.toFixed(2)}</p>
//             </div>
//           </div>

//           {step === 1 && (
//             <form className={styles.form} onSubmit={handleShippingSubmit}>
//               <h2>Shipping Information</h2>
//               <div className={styles.formGroup}>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={shippingData.fullName}
//                   onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={shippingData.email}
//                   onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   value={shippingData.address}
//                   onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={shippingData.city}
//                   onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
//                   required
//                 />
//                 <div className={styles.row}>
//                   <input
//                     type="text"
//                     placeholder="State"
//                     value={shippingData.state}
//                     onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="ZIP Code"
//                     value={shippingData.zipCode}
//                     onChange={(e) => setShippingData({...shippingData, zipCode: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className={styles.nextBtn}>
//                   Continue to Payment
//                 </button>
//               </div>
//             </form>
//           )}

//           {step === 2 && (
//             <form className={styles.form} onSubmit={handlePaymentSubmit}>
//               <h2>Payment Details</h2>
//               <div className={styles.formGroup}>
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   value={paymentData.cardNumber}
//                   onChange={(e) => {
//                     const formatted = formatCardNumber(e.target.value);
//                     setPaymentData({...paymentData, cardNumber: formatted});
//                   }}
//                   maxLength={19} // 16 digits + 3 spaces
//                   required
//                 />
//                 <div className={styles.row}>
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     value={paymentData.expiryDate}
//                     onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="CVV"
//                     value={paymentData.cvv}
//                     onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className={styles.payBtn} disabled={loading}>
//                   {loading ? 'Processing...' : `Pay $${price.toFixed(2)}`}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//       <Background />
//     </>
//   );
// };

// export default Checkout;

//CLAUDE EDIT FOR SERVICES.TSX

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Checkout.module.scss';
import Background from '../Background/Background';

export interface CheckoutProps {
  price?: number;
  productTitle?: string;
  isMedicine?: boolean;
  requiresPrescription?: boolean;
  prescriptionFile?: File;
}

interface ShippingData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FC<CheckoutProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get props either from direct props or from location state
  const [price, setPrice] = useState<number>(0);
  const [productTitle, setProductTitle] = useState<string>('');
  const [isMedicine, setIsMedicine] = useState<boolean>(false);
  const [requiresPrescription, setRequiresPrescription] = useState<boolean>(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  
  useEffect(() => {
    // Check if we have props passed directly
    if (props.price !== undefined && props.productTitle) {
      setPrice(props.price);
      setProductTitle(props.productTitle);
      setIsMedicine(props.isMedicine || false);
      setRequiresPrescription(props.requiresPrescription || false);
      if (props.prescriptionFile) {
        setPrescriptionFile(props.prescriptionFile);
      }
    }  
    // Otherwise check if we have state from navigation
    else if (location.state && location.state.price !== undefined && location.state.productTitle) {
      setPrice(location.state.price);
      setProductTitle(location.state.productTitle);
      setIsMedicine(location.state.isMedicine || false);
      setRequiresPrescription(location.state.requiresPrescription || false);
      if (location.state.prescriptionFile) {
        setPrescriptionFile(location.state.prescriptionFile);
      }
    } else {
      // If no price/product info is available, navigate back to home
      console.error("Checkout requires price and product title");
      // Optional: navigate back or show error
      // navigate('/');
    }
  }, [props.price, props.productTitle, props.isMedicine, props.requiresPrescription, props.prescriptionFile, location.state]);

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // Payment validation helpers
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    return /^\d{16}$/.test(cleanNumber);
  };

  const validateExpiryDate = (expiryDate: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    
    const [month, year] = expiryDate.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (month < 1 || month > 12) return false;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  };

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
  };

  const formatCardNumber = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\D/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // Validate card details
      const cleanCardNumber = paymentData.cardNumber.replace(/[\s-]/g, '');
      if (!validateCardNumber(cleanCardNumber)) {
        setError('Invalid card number - must be 16 digits');
        setLoading(false);
        return;
      }

      if (!validateExpiryDate(paymentData.expiryDate)) {
        setError('Invalid expiry date - use MM/YY format');
        setLoading(false);
        return;
      }

      if (!validateCVV(paymentData.cvv)) {
        setError('Invalid CVV - must be 3 or 4 digits');
        setLoading(false);
        return;
      }

      // Check for authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to checkout');
        setLoading(false);
        return;
      }

      
      console.log('Preparing checkout request with token:', token);

      
      
      // Prepare checkout data
      const checkoutData = {
        shipping: shippingData,
        items: [{
          title: productTitle,
          quantity: 1,
          price: price
        }],
        totalPrice: price,
        isMedicine: isMedicine,
        requiresPrescription: requiresPrescription,
        prescriptionFile: prescriptionFile ? {
          name: prescriptionFile.name,
          type: prescriptionFile.type,
          size: prescriptionFile.size
        } : null
      };
      
      console.log('Sending checkout data:', JSON.stringify(checkoutData));
      
      // Send checkout data to server
      const response = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(checkoutData)
      });
      
      console.log('Server response status:', response.status);
      
      const data = await response.json();
      console.log('Server response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: Failed to process payment`);
      }
      
      console.log('Checkout successful:', data);
      setSuccess(true);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.success}>
        <div className={styles.successContent}>
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <p>Your order will be shipped soon.</p>
          <a href="/" className={styles.returnBtn}>Return to Shop</a>
        </div>
        <Background />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className={styles.checkout}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.steps}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
              1. Shipping
            </div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
              2. Payment
            </div>
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <div className={styles.orderDetails}>
              <p>{productTitle || 'Unknown Product'}</p>
              <p>${(price || 0).toFixed(2)}</p>
            </div>
          </div>

          {step === 1 && (
            <form className={styles.form} onSubmit={handleShippingSubmit}>
              <h2>Shipping Information</h2>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={shippingData.email}
                  onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingData.address}
                  onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingData.city}
                  onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                  required
                />
                <div className={styles.row}>
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingData.zipCode}
                    onChange={(e) => setShippingData({...shippingData, zipCode: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className={styles.nextBtn}>
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className={styles.form} onSubmit={handlePaymentSubmit}>
              <h2>Payment Details</h2>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentData.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setPaymentData({...paymentData, cardNumber: formatted});
                  }}
                  maxLength={19} // 16 digits + 3 spaces
                  required
                />
                <div className={styles.row}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className={styles.payBtn} disabled={loading}>
                  {loading ? 'Processing...' : `Pay $${(price || 0).toFixed(2)}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Background />
    </>
  );
};

export default Checkout;