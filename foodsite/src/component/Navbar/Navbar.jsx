import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSun, FaMoon, FaUserCircle, FaUtensils } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userName = localStorage.getItem('name');
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : null;
  const isLoggedIn = localStorage.getItem('token');

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      // If we're on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If we're not on home page, navigate to home and then scroll
      navigate('/');
      // Use setTimeout to wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
    setIsMenuOpen(false); // Close mobile menu after click
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate("/login");
  };

  return (
    <>
      <div className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-white dark:bg-gray-900 py-3'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Brand Name with Animation */}
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <FaUtensils className="text-orange-500" />
              <span className="hidden sm:block">FoodieHub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-6">
                <li>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="inline-block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 relative group"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="inline-block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 relative group"
                  >
                    Services
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('cart')}
                    className="inline-block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 relative group"
                  >
                    Dishes
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('comments')}
                    className="inline-block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 relative group"
                  >
                    Reviews
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="inline-block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 relative group"
                  >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
                    Order
                    <FaShoppingCart className="text-lg" />
                  </button>
                </li>
              </ul>

              <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <FaSun className="text-xl text-amber-500 group-hover:rotate-45 transition-transform duration-500" />
                  ) : (
                    <FaMoon className="text-xl text-gray-700 group-hover:rotate-12 transition-transform duration-500" />
                  )}
                </button>

                {!isLoggedIn ? (
                  <>
                    <Link 
                      to="/login" 
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium"
                    >
                      Log Out
                    </button>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
                        {firstLetter || <FaUserCircle className="text-xl" />}
                      </div>
                      <span className='font-medium max-w-[100px] truncate text-gray-700 dark:text-gray-300'>{userName}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Cart Icon for Mobile */}
              <button className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                <FaShoppingCart className="text-lg" />
              </button>

              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <FaSun className="text-lg" />
                ) : (
                  <FaMoon className="text-lg" />
                )}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen py-4 border-t border-amber-100 dark:border-amber-900/30' : 'max-h-0 py-0'
        }`}>
          <div className="container mx-auto px-4">
            <ul className="flex flex-col gap-3">
              {/* Navigation Links */}
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cart')}
                  className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                >
                  Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('comments')}
                  className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                >
                  Reviews
                </button>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>

              {/* Order Button */}
              <li>
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl transition-all duration-300">
                  Order Now
                  <FaShoppingCart className="text-lg" />
                </button>
              </li>

              {/* Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link 
                        to="/login" 
                        className="block py-3 px-4 text-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link 
                        to="/signup" 
                        className="block py-3 px-4 bg-amber-600 text-white rounded-lg text-center hover:bg-amber-700 transition-colors duration-300 font-semibold shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-left"
                      >
                        Log Out
                      </button>
                    </li>
                    <li className="mt-3">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center shadow-md">
                          {firstLetter || <FaUserCircle className="text-xl" />}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-800 dark:text-white">{userName}</div>
                          <div className="text-sm text-amber-600 dark:text-amber-400">View Profile</div>
                        </div>
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Add proper spacing for fixed navbar */}
      <div className="h-16 md:h-16"></div>
    </>
  );
};

export default Navbar;