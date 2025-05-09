import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight, FiStar, FiClock, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Import food images
import BurgerImg from '../../assets/foodImage2.jpg';
import PizzaImg from '../../assets/foodImage.jpg';
import PastaImg from '../../assets/foodImage2.jpg';

const products = [
  { 
    id: 0, 
    image: BurgerImg, 
    title: 'Premium Burger', 
    price: 20.00, 
    rating: 4.8, 
    prepTime: 15,
    description: 'Juicy 1/2 lb Angus beef patty with aged cheddar, crispy bacon, and special sauce on brioche bun.',
    isPopular: true
  },
  { 
    id: 1, 
    image: PizzaImg, 
    title: 'Gourmet Pizza', 
    price: 60.00, 
    rating: 4.9, 
    prepTime: 25,
    description: 'Wood-fired pizza with San Marzano sauce, fresh mozzarella, prosciutto, and truffle oil.',
    isNew: true
  },
  { 
    id: 2, 
    image: PastaImg, 
    title: 'Deluxe Pasta', 
    price: 120.00, 
    rating: 5.0, 
    prepTime: 20,
    description: 'Handmade pasta with lobster meat in creamy tomato bisque sauce with garlic and herbs.',
    isChefSpecial: true
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buying, setBuying] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleSeeAllClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/foodlist');
    }, 1000);
  };

  const handleBuyNow = (product) => {
    setBuying(product.id);
    setTimeout(() => {
      setBuying(null);
      navigate(`/checkout/${product.id}`);
    }, 800);
  };

  const toggleDescription = (productId) => {
    setExpandedDescription(expandedDescription === productId ? null : productId);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white px-4">
      {/* Decorative elements */}
      <div className="fixed top-20 left-10 w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900 opacity-20 blur-xl animate-float1"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 rounded-full bg-green-100 dark:bg-green-900 opacity-20 blur-xl animate-float2"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-green-500">Delicious Menu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Crafted with love and premium ingredients
          </motion.p>
        </div>

        {/* Products section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col border border-gray-100 dark:border-gray-700"
            >
              {/* Image container */}
              <div className="relative w-full pt-[70%] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://source.unsplash.com/random/600x400/?food";
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.isPopular && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      Popular
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      New
                    </span>
                  )}
                  {product.isChefSpecial && (
                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      Chef's Special
                    </span>
                  )}
                </div>
                
                {/* Favorite button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
                    favorites.includes(product.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-700 hover:bg-red-100 hover:text-red-500'
                  }`}
                >
                  <FiHeart className={`${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
                
                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center">
                  <FiStar className="text-yellow-500 mr-1" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h3>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <FiClock className="mr-1" />
                      <span>{product.prepTime} mins</span>
                    </div>
                  </div>

                  {/* Description with read more */}
                  <p className={`text-gray-600 dark:text-gray-300 text-sm mb-4 ${expandedDescription === product.id ? '' : 'line-clamp-2'}`}>
                    {product.description}
                  </p>
                  <button 
                    onClick={() => toggleDescription(product.id)}
                    className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline mb-4 transition-colors duration-200"
                  >
                    {expandedDescription === product.id ? 'Show less' : 'Read more'}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                        buying === product.id 
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white' 
                          : 'bg-gradient-to-r from-indigo-500 to-green-500 text-white hover:from-indigo-600 hover:to-green-600 hover:shadow-lg'
                      }`}
                    >
                      {buying === product.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing
                        </>
                      ) : 'Order Now'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSeeAllClick}
            disabled={isLoading}
            className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-8 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  View Full Menu <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-15px); }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Cart;