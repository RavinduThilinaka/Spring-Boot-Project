import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  // Calculate the total balance
  const totalBalance = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    // Navigate to the payment page
    alert('Proceeding to payment');
    navigate('/payment'); // This is how you navigate to another page in React Router v6
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Order Summary</h2>
      
      {/* Order Summary Box */}
      <div className="p-4 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}

        {/* Total Balance */}
        <div className="flex justify-between mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold">Total Balance:</h3>
          <h2 className="text-xl font-bold">${totalBalance}</h2>
        </div>

        {/* Payment Button */}
        <div className="text-center mt-6">
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
