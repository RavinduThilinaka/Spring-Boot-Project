import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rotateImg from '../../assets/rotate.png';

const products = [
  { id: 0, image: rotateImg, title: 'Product 1', price: 20.00 },
  { id: 1, image: rotateImg, title: 'Product 2', price: 60.00 },
  { id: 2, image: rotateImg, title: 'Product 3', price: 120.00 },
];

const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buying, setBuying] = useState(null);

  const handleSeeAllClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/foodlist');
    }, 2000);
  };

  const handleBuyNow = (product) => {
    setBuying(product.id);
    setTimeout(() => {
      setBuying(null);
      navigate(`/checkout/${product.id}`);
    }, 1500);
  };

  return (
    <div className="home-page flex flex-col items-center bg-gradient-to-br from-gray-200 to-gray-100 py-10 dark:from-gray-700 dark:to-black dark:text-white">
      <div className="product-section w-4/5 mb-12" data-aos="fade-up" data-aos-duration="300">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative p-6 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
            >
              <div className="h-48 w-48 rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                />
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {product.title}
              </p>
              <h3 className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 mb-4">
                ${product.price}.00
              </h3>
              <div className="flex space-x-4">
                <button className="bg-green-500 dark:bg-green-800 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300">
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-indigo-500 dark:bg-indigo-800 text-white py-2 px-6 rounded-full shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all duration-300"
                >
                  {buying === product.id ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={handleSeeAllClick}
            className="bg-indigo-500 text-white py-3 px-8 rounded-full shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'See All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
 