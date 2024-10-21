// // PaymentForm.js
// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';
//  // Import your CSS file for overall form styling

// const PaymentForm = ({ amount, propertyId, bookingDate }) => {
//   // const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Create a payment intent and get the client secret
//     const res = await axios.post('/api/payment/create-payment-intent', {
//       amount,
//       propertyId,
//       bookingDate,
//     });
    
//     const { clientSecret } = res.data;
    
//     // Confirm card payment with Stripe
//     const cardElement = elements.getElement(CardElement);
//     const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });
    
//     if (paymentResult.error) {
//       setError(paymentResult.error.message);
//       setLoading(false);
//     } else if (paymentResult.paymentIntent.status === 'succeeded') {
//       setSuccess(true);
//       await axios.post('/api/payment/complete-booking', {
//         paymentIntentId: paymentResult.paymentIntent.id,
//         propertyId,
//         bookingDate,
//       });
//       setLoading(false);
//     }
//   };

//   // Define custom styles for Stripe CardElement
//   const cardElementOptions = {
//     style: {
//       base: {
//         color: '#32325d',
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSmoothing: 'antialiased',
//         fontSize: '16px',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//       },
//       invalid: {
//         color: '#fa755a',
//         iconColor: '#fa755a',
//       },
//     },
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <CardElement options={cardElementOptions} />
//       {error && <div className="error-message">{error}</div>}
//       <button disabled={loading || !stripe} className="pay-button">Pay</button>
//       {success && <div className="success-message">Payment Successful!</div>}
//     </form>
//   );
// };

// export default PaymentForm;
