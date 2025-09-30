import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiTrash2, FiArrowLeft, FiCreditCard, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
  const deliveryFee = totalBalance > 50 ? 0 : 5;
  const finalTotal = totalBalance + deliveryFee;

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/payment");
    }, 1500);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Function to update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-amber-100 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-colors"
              >
                <FiArrowLeft className="text-amber-600 dark:text-amber-400 text-xl" />
              </motion.button>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Order Summary
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Review your delicious selections
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <FiShoppingBag className="text-lg sm:text-xl" />
              <span className="font-semibold text-sm sm:text-base">{cart.length} items</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-amber-100 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center space-x-2 sm:space-x-3">
                  <FiShoppingBag className="text-amber-500" />
                  <span>Your Order</span>
                </h2>
              </div>

              <div className="p-4 sm:p-6">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 sm:py-12"
                    >
                      <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🍽️</div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                        Add some delicious items to get started
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/food-list")}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 sm:px-8 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm sm:text-base"
                      >
                        Browse Menu
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-start sm:items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300"
                        >
                          {/* Image */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0"
                          />

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-white line-clamp-2 sm:truncate">
                                  {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {item.category}
                                </p>
                              </div>
                              <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 ml-2 sm:ml-4">
                                ${item.price}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white dark:bg-gray-700 border border-amber-200 dark:border-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                                >
                                  <span className="text-gray-600 dark:text-gray-300 font-bold text-sm">-</span>
                                </motion.button>
                                <span className="w-6 sm:w-8 text-center font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg flex items-center justify-center hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                                >
                                  <span className="font-bold text-sm">+</span>
                                </motion.button>
                              </div>

                              <div className="flex items-center space-x-3 sm:space-x-4">
                                <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="p-1.5 sm:p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                                >
                                  <FiTrash2 className="text-base sm:text-lg" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 sticky top-20 sm:top-24"
            >
              <div className="p-4 sm:p-6 border-b border-amber-100 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center space-x-2 sm:space-x-3">
                  <FiCreditCard className="text-amber-500" />
                  <span>Order Total</span>
                </h2>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                {/* Order Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ${totalBalance.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-amber-500">Free</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {totalBalance < 50 && deliveryFee > 0 && (
                    <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 sm:p-3 rounded-lg">
                      🚚 Add ${(50 - totalBalance).toFixed(2)} more for free delivery!
                    </div>
                  )}

                  <div className="flex justify-between text-base sm:text-lg font-bold pt-3 border-t border-amber-100 dark:border-gray-700">
                    <span className="text-gray-800 dark:text-white">Total</span>
                    <span className="text-amber-600 dark:text-amber-400">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payment Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={cart.length === 0 || loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <FiCreditCard className="text-base sm:text-lg" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </motion.button>

                {/* Security Note */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 sm:mt-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 sm:mb-3 text-sm sm:text-base">
                🕒 Delivery Information
              </h3>
              <ul className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 space-y-1 sm:space-y-2">
                <li>• Estimated delivery: 25-40 minutes</li>
                <li>• Free delivery on orders over $50</li>
                <li>• Real-time tracking available</li>
                <li>• Contact-free delivery option</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSummary;