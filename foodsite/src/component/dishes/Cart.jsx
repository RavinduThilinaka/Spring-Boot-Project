import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import rotateImg from '../../assets/rotate.png'; // Product image
import Logo from "../../assets/foodlogo.png";

// Sample products for the homepage product section
const products = [
  { id: 0, image: rotateImg, title: 'Product 1', price: 20 },
  { id: 1, image: rotateImg, title: 'Product 2', price: 60 },
  { id: 2, image: rotateImg, title: 'Product 3', price: 120 },
];

const Cart = () => {
  const navigate = useNavigate(); // Initialize navigate for React Router v6
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // This function is triggered when the "See All" button is clicked
  const handleSeeAllClick = () => {
    setIsLoading(true); // Start loading

    // Simulate a loading process (e.g., API call or processing time)
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      navigate('/food'); // Navigate to the food list after loading
    }, 2000); // Simulate a 2-second loading process
  };

  return (
    <div className="home-page flex flex-col items-center bg-white py-10 dark:bg-gray-800 dark:text-white">
      {/* Product Section */}
      <div className="product-section w-4/5 mb-12" data-aos="slide-up" data-aos-duration="300">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-black p-6 rounded-xl flex flex-col items-center bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer dark:bg-gray-700"
            >
              <div className="h-60 w-60 flex items-center justify-center rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover h-full w-full transition-transform duration-500 transform hover:scale-110"
                />
              </div>
              <div className="mt-4 flex flex-col items-center text-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{product.title}</p>
                <h2 className="text-red-600 text-xl dark:text-white">${product.price}</h2>
                <button className="bg-green-600 text-white py-2 px-6 rounded-md mt-4 hover:bg-green-700 transition duration-300 transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeAllClick}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? 'Loading...' : 'See All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
