import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosRequest } from '../service/axiosRequest'; // Assuming axiosRequest is your Axios instance

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { propertyId, amount ,name} = location.state; // Get propertyId and amount from location state

  console.log("Property ID:", propertyId, "Amount:", amount);

  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  };

  // Function to handle payment
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_N7JAloi8EO00qI", // Replace with your Razorpay test/live key
      amount: amount * 100, // Razorpay expects the amount in paise, so multiply by 100
      currency: "INR",
      name: "Real Estate Property",
      description: `Payment for property booking ID: ${propertyId}`,
      handler: async (response) => {
        console.log("Payment Successful:", response);

        try {
          // After successful payment, make a request to the booking API
          const bookingDate = new Date();
          const bookingData = {
            propertyId: propertyId,
            date: bookingDate,
          };

          const res = await axiosRequest('POST', '/api/bookings', bookingData);

          if (res.status === 201) {
            alert('Booking confirmed!');
            navigate('/booking-success', { state: { propertyId } });
          } else {
            alert('Booking failed. Please try again.');
          }
        } catch (error) {
          console.error("Error confirming booking:", error);
          alert('Error occurred while confirming the booking.');
        }
      },
      prefill: {
        name: "John Doe", // Prefill user name if available
        email: "johndoe@example.com", // Prefill user email if available
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Load the Razorpay checkout script
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js", () => {});
  }, []);

  return (
    <div className="payment-container text-center p-6">
      {/* Payment Details Section */}
      <h2 className="text-xl font-bold mb-4">Payment for Property</h2>
      <div className="payment-details text-gray-700">
        <p>Property Name: <span className="font-semibold">{name}</span></p>
        <p>Amount: <span className="font-semibold">₹{amount}</span></p>
      </div>

      {/* Proceed to Payment Button */}
      <button
        onClick={handlePayment}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Pay ₹{amount}
      </button>
    </div>
  );
}

export default Payment;
