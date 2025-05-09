import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiPlus, FiMinus, FiX, FiChevronRight, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Import available images
import Food1 from '../../assets/rotate.png';
import Food2 from '../../assets/rotate2.png';
import Food3 from '../../assets/rotate3.png';
import Logo from "../../assets/foodlogo.png";

// Fallback image
const fallbackImage = Food1;

const FoodList = () => {
  const navigate = useNavigate();
  
  // Enhanced product data with descriptions
  const products = [
    { 
      id: 0, 
      image: Food1, 
      title: 'Gourmet Burger', 
      price: 20, 
      rating: 4.8,
      description: 'Juicy beef patty with cheddar cheese, crispy bacon, fresh lettuce, and our special sauce served on a brioche bun'
    },
    { 
      id: 1, 
      image: Food2, 
      title: 'Truffle Pizza', 
      price: 60, 
      rating: 4.9,
      description: 'Wood-fired pizza with black truffle paste, mozzarella, wild mushrooms, and a drizzle of truffle oil'
    },
    { 
      id: 2, 
      image: Food3, 
      title: 'Lobster Pasta', 
      price: 120, 
      rating: 5.0,
      description: 'Fresh lobster meat with handmade tagliatelle in a creamy tomato bisque sauce with garlic and herbs'
    },
    { 
      id: 3, 
      image: fallbackImage, 
      title: 'Sushi Platter', 
      price: 85, 
      rating: 4.7,
      description: 'Chef\'s selection of 12 premium sushi pieces including tuna, salmon, and sea bass with wasabi and pickled ginger'
    },
    { 
      id: 4, 
      image: fallbackImage, 
      title: 'Chocolate Soufflé', 
      price: 45, 
      rating: 4.9,
      description: 'Warm chocolate soufflé with a molten center, served with vanilla bean ice cream and raspberry coulis'
    },
  ];

  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartVisible(true);
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const confirmOrder = () => {
    if (cart.length === 0) return;
    navigate("/orsummery", { state: { cart } });
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900 opacity-20 blur-xl animate-float1"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full bg-green-100 dark:bg-green-900 opacity-20 blur-xl animate-float2"></div>

      {/* Main container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-8"
        >
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="Logo" 
              className="w-16 h-16 mr-4 object-contain"
              onError={handleImageError}
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-green-500 bg-clip-text text-transparent">
              Gourmet Delights
            </h1>
          </div>
          
          <button 
            onClick={() => setIsCartVisible(!isCartVisible)}
            className="relative p-3 bg-gradient-to-r from-indigo-100 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <FiShoppingCart className="text-indigo-600 dark:text-indigo-300 text-xl" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </motion.header>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid - Enhanced cards with larger images */}
          <motion.div 
            layout
            className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 flex flex-col"
                style={{ minHeight: '480px' }} // Slightly increased height
              >
                {/* Larger image container */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <FiStar className="mr-1" /> {product.rating}
                  </div>
                </div>
                
                {/* Content area with description */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h3>
                  
                  {/* Description with read more/less */}
                  <div className="mb-4 flex-grow">
                    <p className={`text-gray-600 dark:text-gray-300 text-sm ${expandedDescriptions[product.id] ? '' : 'line-clamp-3'}`}>
                      {product.description}
                    </p>
                    <button 
                      onClick={() => toggleDescription(product.id)}
                      className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-1"
                    >
                      {expandedDescriptions[product.id] ? 'Show less' : 'Read more'}
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ${product.price}.00
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-indigo-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cart Sidebar */}
          <AnimatePresence>
            {isCartVisible && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 lg:static lg:z-auto lg:w-1/4"
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsCartVisible(false)}></div>
                <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto lg:relative lg:max-w-full lg:shadow-lg">
                  <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Cart</h2>
                    <button 
                      onClick={() => setIsCartVisible(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="p-4">
                    {cart.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                      >
                        <FiShoppingCart className="mx-auto text-gray-400 text-4xl mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                      </motion.div>
                    ) : (
                      <motion.ul layout className="space-y-4">
                        <AnimatePresence>
                          {cart.map((item) => (
                            <motion.li
                              key={item.id}
                              layout
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.2 }}
                              className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-start">
                                  <div className="h-12 w-12 rounded-lg overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
                                    <img 
                                      src={item.image} 
                                      alt={item.title} 
                                      className="h-full w-full object-contain p-1"
                                      onError={handleImageError}
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800 dark:text-white">{item.title}</h4>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-bold">${item.price}</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <FiX />
                                </button>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="bg-gray-200 dark:bg-gray-600 p-1 rounded-full text-gray-700 dark:text-white"
                                  >
                                    <FiMinus size={16} />
                                  </motion.button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => increaseQuantity(item.id)}
                                    className="bg-gray-200 dark:bg-gray-600 p-1 rounded-full text-gray-700 dark:text-white"
                                  >
                                    <FiPlus size={16} />
                                  </motion.button>
                                </div>
                                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </motion.ul>
                    )}

                    {cart.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Subtotal</span>
                          <span className="font-bold">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Delivery</span>
                          <span className="font-bold">$5.00</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mb-6">
                          <span>Total</span>
                          <span>${(total + 5).toFixed(2)}</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={confirmOrder}
                          className="w-full bg-gradient-to-r from-indigo-600 to-green-500 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                        >
                          Checkout <FiChevronRight className="ml-2" />
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

export default FoodList;