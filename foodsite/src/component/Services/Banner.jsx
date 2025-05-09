import React from 'react';
import Food1 from '../../assets/banner.jpg';
import { GrSecure } from 'react-icons/gr';
import { IoFastFood } from 'react-icons/io5';
import { GiFoodTruck } from 'react-icons/gi';

function Banner() {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div 
            data-aos="slide-up"
            data-aos-duration="300"
            className="relative group"
          >
            <img 
              src={Food1} 
              alt="Delicious Food"
              className="w-full max-w-[500px] mx-auto rounded-xl shadow-2xl transform transition-all duration-500 group-hover:rotate-1 group-hover:shadow-2xl"
            />
            <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg shadow-lg">
              Fresh & Tasty
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Quality Food</span> Delivered
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, ratione dolores corporis minima possimus vero consequuntur non animi odio necessitatibus dolorem voluptates perspiciatis exercitationem aperiam nihil modi cum cupiditate ea?
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt accusamus ipsa animi officia doloremque, sequi similique, numquam maxime quidem consequatur autem nemo, maiores perspiciatis!
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="p-4 bg-violet-100 dark:bg-violet-600 rounded-full mb-3">
                  <GrSecure className="text-2xl text-violet-600 dark:text-white" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Secure</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="p-4 bg-orange-100 dark:bg-orange-600 rounded-full mb-3">
                  <IoFastFood className="text-2xl text-orange-600 dark:text-white" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Fast Food</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="p-4 bg-green-100 dark:bg-green-600 rounded-full mb-3">
                  <GiFoodTruck className="text-2xl text-green-600 dark:text-white" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Delivery</span>
              </div>
            </div>

            {/* Button */}
            <button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Order Now
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;