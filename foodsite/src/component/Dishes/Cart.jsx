import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight, FiStar, FiClock, FiHeart, FiAward, FiTrendingUp, FiUser } from 'react-icons/fi';
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
    isPopular: true,
    calories: 650,
    ingredients: ['Angus Beef', 'Brioche Bun', 'Aged Cheddar', 'Bacon', 'Special Sauce']
  },
  { 
    id: 1, 
    image: PizzaImg, 
    title: 'Gourmet Pizza', 
    price: 60.00, 
    rating: 4.9, 
    prepTime: 25,
    description: 'Wood-fired pizza with San Marzano sauce, fresh mozzarella, prosciutto, and truffle oil.',
    isNew: true,
    calories: 850,
    ingredients: ['San Marzano Tomatoes', 'Fresh Mozzarella', 'Prosciutto', 'Truffle Oil', 'Basil']
  },
  { 
    id: 2, 
    image: PastaImg, 
    title: 'Deluxe Pasta', 
    price: 120.00, 
    rating: 5.0, 
    prepTime: 20,
    description: 'Handmade pasta with lobster meat in creamy tomato bisque sauce with garlic and herbs.',
    isChefSpecial: true,
    calories: 720,
    ingredients: ['Handmade Pasta', 'Lobster', 'Creamy Tomato Sauce', 'Garlic', 'Fresh Herbs']
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buying, setBuying] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSeeAllClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/foodlist');
    }, 1000);
  };

  const handleBuyNow = (product) => {
    setBuying(product.id);
    
    // Create cart with the selected product
    const cart = [{
      ...product,
      quantity: 1
    }];
    
    // Calculate totals
    const total = product.price;
    const deliveryFee = total > 50 ? 0 : 5;
    const cartTotal = total + deliveryFee;
    
    setTimeout(() => {
      setBuying(null);
      // Navigate to order summary with product details
      navigate("/order-summary", { 
        state: { 
          cart: cart,
          total: cartTotal,
          fromOrderNow: true,
          productDetails: product
        } 
      });
    }, 800);
  };

  const toggleDescription = (productId) => {
    setExpandedDescription(expandedDescription === productId ? null : productId);
  };

  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-16 dark:text-white px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-200 dark:bg-amber-800 opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-orange-200 dark:bg-orange-800 opacity-20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Food Icons */}
      <motion.div 
        className="absolute top-10 left-20 text-4xl text-amber-300/40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🍕
      </motion.div>
      <motion.div 
        className="absolute top-40 right-32 text-3xl text-orange-300/40"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🍔
      </motion.div>
      <motion.div 
        className="absolute bottom-32 left-32 text-5xl text-amber-400/30"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🥗
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            <span className="px-6 py-3 text-sm font-bold tracking-widest text-amber-700 dark:text-amber-300 uppercase bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-amber-200 dark:border-amber-800 shadow-lg">
              🍽️ Signature Dishes
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 dark:text-white mb-6 leading-tight">
            Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-gradient-x">Excellence</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Handcrafted with passion, served with perfection. Experience the art of fine dining.
          </motion.p>
        </motion.div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 px-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group"
            >
              {/* Main Card */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50 transition-all duration-500 h-full flex flex-col">
                
                {/* Image Container with Overlay */}
                <div className="relative w-full pt-[75%] overflow-hidden">
                  <motion.img
                    variants={imageVariants}
                    whileHover="hover"
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://source.unsplash.com/random/600x400/?food";
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isPopular && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 + 0.5 }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1"
                      >
                        <FiTrendingUp className="text-xs" />
                        Popular
                      </motion.span>
                    )}
                    {product.isNew && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 + 0.6 }}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1"
                      >
                        <FiAward className="text-xs" />
                        New
                      </motion.span>
                    )}
                    {product.isChefSpecial && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 + 0.7 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1"
                      >
                        <FiUser className="text-xs" />
                        Chef's Pick
                      </motion.span>
                    )}
                  </div>
                  
                  {/* Favorite Button */}
                  <motion.button 
                    onClick={(e) => toggleFavorite(product.id, e)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
                      favorites.includes(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <FiHeart className={`text-lg ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  
                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <FiStar className="text-amber-500" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <FiClock className="text-amber-500" />
                      <span>{product.prepTime} min</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {product.title}
                    </h3>
                    
                    {/* Nutrition Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                        {product.calories} cal
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                        expandedDescription === product.id ? '' : 'line-clamp-2'
                      }`}>
                        {product.description}
                      </p>
                      <button 
                        onClick={() => toggleDescription(product.id)}
                        className="text-amber-600 dark:text-amber-400 text-sm font-medium hover:underline mt-2 transition-colors duration-200 flex items-center gap-1"
                      >
                        {expandedDescription === product.id ? 'Show less' : 'Read more'}
                        <FiArrowRight className={`text-xs transition-transform duration-200 ${
                          expandedDescription === product.id ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>

                    {/* Ingredients */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Key Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span key={idx} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                            {ingredient}
                          </span>
                        ))}
                        {product.ingredients.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                            +{product.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price and Action Button */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">per serving</p>
                    </div>
                    <motion.button 
                      onClick={() => handleBuyNow(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-2xl font-bold text-white transition-all duration-300 flex items-center gap-2 ${
                        buying === product.id 
                          ? 'bg-gray-400 dark:bg-gray-600' 
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl'
                      }`}
                    >
                      {buying === product.id ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Ordering...
                        </>
                      ) : (
                        <>
                          <FiShoppingCart className="text-lg" />
                          Order Now
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              {hoveredCard === product.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur-xl opacity-20 -z-10 transition-all duration-500" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced See All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleSeeAllClick}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 overflow-hidden group"
          >
            {/* Animated Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-8 h-full bg-white/20 skew-x-12"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <span className="relative z-10 flex items-center gap-3 text-lg font-bold">
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                  Exploring Menu...
                </>
              ) : (
                <>
                  Discover Full Menu
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FiArrowRight className="text-xl" />
                  </motion.div>
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Cart;