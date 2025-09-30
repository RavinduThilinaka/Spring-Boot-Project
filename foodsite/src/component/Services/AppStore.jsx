import React from 'react';
import playstore from '../../assets/googleplay.png';
import Appstore from '../../assets/appleplay.png';
import gif from '../../assets/gif.gif';
import { FaUtensils } from 'react-icons/fa';

function AppStore() {
  return (
    <div className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
        <FaUtensils />
      </div>
      <div className="absolute bottom-10 right-10 text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
        <FaUtensils />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content Section */}
          <div 
            data-aos="fade-up"
            data-aos-duration="400"
            className="space-y-8 text-center lg:text-left max-w-2xl"
          >
            <h1 className='text-3xl md:text-5xl font-bold text-gray-800 dark:text-white'>
              Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Foodly</span> App Now
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get the best food delivery experience with our mobile app. Order your favorite meals with just a few taps!
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
              <a href="#" className="transition-transform hover:scale-105 duration-300">
                <img 
                  src={playstore} 
                  alt="Get on Google Play" 
                  className='h-14 md:h-16 w-auto object-contain'
                />
              </a>
              <a href="#" className="transition-transform hover:scale-105 duration-300">
                <img 
                  src={Appstore} 
                  alt="Download on the App Store" 
                  className='h-14 md:h-16 w-auto object-contain'
                />
              </a>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Easy Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Exclusive Offers</span>
              </div>
            </div>
          </div>
          
          {/* GIF Section */}
          <div 
            data-aos="zoom-in"
            data-aos-duration="400"
            className="relative max-w-md lg:max-w-xl"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur-lg opacity-20"></div>
            <img 
              src={gif} 
              alt="App Preview" 
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppStore;