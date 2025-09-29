import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
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
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-white dark:bg-gray-900 py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Brand Name with Animation */}
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Good Food
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
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
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
                      <span className='font-medium max-w-[100px] truncate'>{userName}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <FaSun className="text-xl text-amber-500" />
                ) : (
                  <FaMoon className="text-xl text-gray-700" />
                )}
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white dark:bg-gray-900 overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
        }`}>
          <div className="container mx-auto px-4">
            <ul className="flex flex-col gap-4">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cart')}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                >
                  Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('comments')}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                >
                  Reviews
                </button>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 mt-2">
                  Order
                  <FaShoppingCart className="text-lg" />
                </button>
              </li>
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block py-2 text-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="block py-2 bg-amber-600 text-white rounded-md text-center hover:bg-amber-700 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
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
                      className="w-full py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
                    >
                      Log Out
                    </button>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className="flex items-center justify-center gap-2 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center">
                        {firstLetter || <FaUserCircle className="text-xl" />}
                      </div>
                      <span className='font-medium'>{userName}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Add spacing for fixed navbar - Reduced height to eliminate gap */}
      <div className="h-14 md:h-10"></div>
    </>
  );
};

export default Navbar;