import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [loading, setLoading] = useState(false);

  // Calculate the total balance
  const totalBalance = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/payment");
    }, 1500); // Simulating a delay for the loading state
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Order Summary</h2>

      {/* Order Summary Box */}
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto text">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Item Details */}
              <div className="flex-1 px-4">
                {/* Title */}
                <div className="flex justify-between items-center mb-2 ml-[35%]">
                  <p className="text-lg font-semibold text-gray-800 flex-1">
                    {item.title}
                  </p>
                </div>

                {/* Quantity and Total */}
                <div className="flex justify-between items-center">
                  {/* Quantity */}
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600">Quantity:</p>
                    <span className="font-medium text-gray-900 ml-1">
                      {item.quantity}
                    </span>
                  </div>

                  {/* Total */}
                  <p className="text-lg font-semibold text-green-500">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>

              {/* Remove Icon - Separate from the Total */}
              <div className="flex justify-end items-center ml-4">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500"
                >
                  <i className="fas fa-trash text-xl"></i>
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total Balance */}
        <div className="flex justify-between mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold">Total Balance:</h3>
          <h2 className="text-xl font-bold text-blue-600">${totalBalance}.00</h2>
        </div>

        {/* Payment Button */}
        <div className="text-center mt-6">
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? (
              <div className="animate-spin border-t-2 border-b-2 border-white w-5 h-5 mx-auto border-solid rounded-full"></div>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
