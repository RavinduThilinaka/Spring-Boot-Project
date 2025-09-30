import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiPlus, FiMinus, FiX, FiChevronRight, FiStar, FiHeart, FiSearch, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FoodList = () => {
  const navigate = useNavigate();
  
  // Enhanced product data with more details
  const products = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      title: 'Gourmet Burger', 
      price: 20, 
      rating: 4.8,
      reviews: 124,
      description: 'Juicy beef patty with cheddar cheese, crispy bacon, fresh lettuce, and our special sauce served on a brioche bun',
      category: 'Main Course',
      cookTime: '15-20 min',
      spicy: 1,
      popular: true
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      title: 'Truffle Pizza', 
      price: 60, 
      rating: 4.9,
      reviews: 89,
      description: 'Wood-fired pizza with black truffle paste, mozzarella, wild mushrooms, and a drizzle of truffle oil',
      category: 'Main Course',
      cookTime: '20-25 min',
      spicy: 0,
      popular: true
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
      title: 'Lobster Pasta', 
      price: 120, 
      rating: 5.0,
      reviews: 67,
      description: 'Fresh lobster meat with handmade tagliatelle in a creamy tomato bisque sauce with garlic and herbs',
      category: 'Main Course',
      cookTime: '25-30 min',
      spicy: 1,
      popular: false
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      title: 'Sushi Platter', 
      price: 85, 
      rating: 4.7,
      reviews: 156,
      description: 'Chef\'s selection of 12 premium sushi pieces including tuna, salmon, and sea bass with wasabi and pickled ginger',
      category: 'Appetizer',
      cookTime: '10-15 min',
      spicy: 2,
      popular: true
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
      title: 'Chocolate Soufflé', 
      price: 45, 
      rating: 4.9,
      reviews: 203,
      description: 'Warm chocolate soufflé with a molten center, served with vanilla bean ice cream and raspberry coulis',
      category: 'Dessert',
      cookTime: '12-15 min',
      spicy: 0,
      popular: false
    },
    { 
      id: 6, 
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      title: 'Mediterranean Bowl', 
      price: 35, 
      rating: 4.6,
      reviews: 78,
      description: 'Fresh quinoa with roasted vegetables, feta cheese, olives, and lemon herb dressing',
      category: 'Healthy',
      cookTime: '10-12 min',
      spicy: 1,
      popular: false
    },
    { 
      id: 7, 
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      title: 'Grilled Salmon', 
      price: 42, 
      rating: 4.8,
      reviews: 134,
      description: 'Atlantic salmon fillet with lemon butter sauce, roasted asparagus, and wild rice',
      category: 'Main Course',
      cookTime: '18-22 min',
      spicy: 1,
      popular: true
    },
    { 
      id: 8, 
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      title: 'Margherita Pizza', 
      price: 28, 
      rating: 4.5,
      reviews: 189,
      description: 'Classic pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil',
      category: 'Main Course',
      cookTime: '12-15 min',
      spicy: 0,
      popular: false
    }
  ];

  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItem, setAddedItem] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return (b.popular === a.popular) ? 0 : b.popular ? -1 : 1;
        default:
          return 0;
      }
    });

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
    setAddedItem(product.id);
    
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
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
        item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = total > 50 ? 0 : 5;
  const cartTotal = total + deliveryFee;

  const confirmOrder = () => {
    if (cart.length === 0) return;
    navigate("/order-summary", { state: { cart, total: cartTotal } });
  };

  const getCartItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getSpicyLevel = (level) => {
    const peppers = ['🌶️', '🌶️🌶️', '🌶️🌶️🌶️'];
    return level > 0 ? peppers[level - 1] : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-amber-100 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Brand & Search */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
              {/* Brand */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  FoodieHub
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Culinary excellence delivered
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search dishes, ingredients, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-amber-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FiX className="text-lg" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Cart & Actions */}
            <div className="flex items-center justify-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700 dark:text-gray-300"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* Cart Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartVisible(true)}
                className="relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
              >
                <FiShoppingCart className="text-lg group-hover:scale-110 transition-transform" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-gray-900"
                  >
                    {getCartItemCount()}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mt-6 justify-center"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-amber-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Showing {filteredProducts.length} of {products.length} dishes
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100 dark:border-gray-700 group"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <FiHeart 
                      className={`text-lg ${
                        favorites.includes(product.id) 
                          ? 'fill-rose-500 text-rose-500' 
                          : 'text-gray-400 hover:text-rose-400'
                      } transition-colors`} 
                    />
                  </motion.button>

                  {/* Popular Badge */}
                  {product.popular && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>
                  )}

                  {/* Rating & Cook Time */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1 backdrop-blur-sm">
                      <FiStar className="fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-300">({product.reviews})</span>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm flex items-center space-x-1">
                      <FiClock className="text-gray-500" />
                      <span>{product.cookTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        {product.spicy > 0 && (
                          <span className="text-xs text-rose-600 dark:text-rose-400">
                            {getSpicyLevel(product.spicy)}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400 ml-3">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span>Add to Cart</span>
                    <FiPlus className="group-hover:scale-110 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-3">
              No dishes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              We couldn't find any dishes matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSortBy('default');
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsCartVisible(false)}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col border-l border-amber-100 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Your Order
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {getCartItemCount()} items in cart
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartVisible(false)}
                  className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-colors"
                >
                  <FiX className="text-gray-500 dark:text-gray-400 text-xl" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="text-8xl mb-6">🛒</div>
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-3">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                      Add some delicious items to get started
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartVisible(false)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                    >
                      Browse Menu
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div layout className="space-y-4">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            scale: addedItem === item.id ? 1.02 : 1,
                            backgroundColor: addedItem === item.id ? 'rgba(245, 158, 11, 0.1)' : ''
                          }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30,
                            backgroundColor: { duration: 0.2 }
                          }}
                          className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300"
                        >
                          <div className="flex items-start space-x-4">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                                  {item.title}
                                </h4>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors ml-2"
                                >
                                  <FiX />
                                </button>
                              </div>
                              
                              <p className="text-amber-600 dark:text-amber-400 font-bold text-lg mb-3">
                                ${item.price}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="w-9 h-9 bg-white dark:bg-gray-700 border border-amber-200 dark:border-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                                  >
                                    <FiMinus className="text-gray-600 dark:text-gray-300 text-sm" />
                                  </motion.button>
                                  <span className="w-8 text-center font-semibold text-gray-800 dark:text-white">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => increaseQuantity(item.id)}
                                    className="w-9 h-9 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg flex items-center justify-center hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                                  >
                                    <FiPlus className="text-sm" />
                                  </motion.button>
                                </div>
                                
                                <span className="font-bold text-gray-800 dark:text-white">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-amber-100 dark:border-gray-700 p-6 space-y-4 bg-white dark:bg-gray-900"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                      <span className="font-medium">
                        {deliveryFee === 0 ? (
                          <span className="text-amber-500">Free</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {total < 50 && (
                      <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                        Add ${(50 - total).toFixed(2)} more for free delivery!
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-amber-100 dark:border-gray-700">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmOrder}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      {cart.length > 0 && !isCartVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all border-2 border-white dark:border-gray-900"
          onClick={() => setIsCartVisible(true)}
        >
          <div className="flex items-center space-x-2">
            <FiShoppingCart className="text-xl" />
            <div className="text-left">
              <div className="font-bold text-lg leading-none">${cartTotal.toFixed(2)}</div>
              <div className="text-xs opacity-90">{getCartItemCount()} items</div>
            </div>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default FoodList;