// App.js (or any higher-level component)
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Public Stripe API key
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Payment() {
    const location=useLocation()
    const { productId ,amount } = location.state
    console.log("llll",amount)
    const queryParams=new URLSearchParams(location.search)
    const id=queryParams.get('productId')
    console.log("id",id)
    const loadScript = (src, callback) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
      };
      const handlePayment = async () => {
        const options = {
          key: "rzp_test_N7JAloi8EO00qI",
        //   amount: totalPrice * 100 + diliveryCharges * 100,
        amount:90,
          currency: "INR",
          name:"product namw",
          description: "Payment for your service",
        //   img,
          handler: async (response) => {
            // Handle the payment success
            // setPaymentStatus("Payment successful: " + response.razorpay_payment_id);
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
     useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js", () => {});
      }, []);

    
  return (
    <>
    {/* // <Elements stripe={stripePromise}>
    //   <PaymentForm />
    // </Elements> */}
    
    <button
                    onClick={handlePayment}
                    className="primaryblk-button mt-6 rounded-[10%] w-[90%] content-center"
                  >
                    Procced to Checkout
                  </button>
                  {/* {paymentStatus && <p>{paymentStatus}</p>} */}
                  </>
  );
}

export default Payment;
