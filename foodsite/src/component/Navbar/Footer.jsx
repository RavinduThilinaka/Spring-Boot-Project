import React from 'react';
import FooterLogo from "../../assets/foodlogo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaUtensils, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { FaMobileAlt, FaHeart, FaArrowRight } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-950 dark:text-white border-t border-amber-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 py-12 px-6">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src={FooterLogo} className="w-12 h-12" alt="Good Food" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  FoodieHub
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Discover the finest culinary experiences with FoodieHub. We bring you authentic flavors, 
                fresh ingredients, and unforgettable dining moments right to your doorstep.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <FaLocationArrow className="text-amber-600 text-sm" />
                  </div>
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <FaMobileAlt className="text-amber-600 text-sm" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-amber-600 text-sm" />
                  </div>
                  <span>hello@foodiehub.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <FaUtensils className="text-amber-500" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Our Menu', 'Special Offers', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 group"
                    >
                      <FaArrowRight className="text-amber-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <FaUtensils className="text-amber-500" />
                Categories
              </h3>
              <ul className="space-y-3">
                {['Italian Cuisine', 'Asian Fusion', 'Healthy Bowls', 'Desserts', 'Beverages', 'Specials'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 group"
                    >
                      <FaArrowRight className="text-amber-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <FaUtensils className="text-amber-500" />
                Newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Subscribe to get updates on new recipes and special offers.
              </p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-3 border border-amber-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-800 transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-200/50">
                  Subscribe Now
                </button>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaInstagram, color: 'hover:text-pink-600', bg: 'hover:bg-pink-500' },
                    { icon: FaFacebook, color: 'hover:text-blue-600', bg: 'hover:bg-blue-500' },
                    { icon: FaLinkedin, color: 'hover:text-blue-700', bg: 'hover:bg-blue-600' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 ${social.color} ${social.bg} hover:text-white transition-all duration-300 transform hover:scale-110`}
                    >
                      <social.icon className="text-lg" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-amber-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center py-6 px-6 gap-4">
              <div className="text-gray-600 dark:text-gray-300 text-center md:text-left">
                © 2025 FoodieHub. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <span>Made with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>by Ravindu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;