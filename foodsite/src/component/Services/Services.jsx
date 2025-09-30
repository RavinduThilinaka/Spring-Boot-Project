import React from 'react';
import Img from '../../assets/services1.png';
import Img2 from '../../assets/services2.png';
import Img3 from '../../assets/services3.png';
import { FaUtensils } from 'react-icons/fa';

const ServiceData = [
  {
    id: 1,
    img: Img,
    name: 'Coastal Fish Curry',
    description: 'Fresh catch simmered in aromatic coconut gravy with traditional spices. A coastal delicacy that brings the ocean to your plate with every flavorful bite.',
  },
  {
    id: 2,
    img: Img2,
    name: 'Grilled Fish & Garden Medley',
    description: 'Perfectly grilled fish fillet served with seasonal garden vegetables. A healthy and delicious harmony of land and sea flavors.',
  },
  {
    id: 3,
    img: Img3,
    name: 'Herb-Roasted Chicken Feast',
    description: 'Tender chicken roasted with fresh herbs and secret spices, served with golden potatoes. A classic comfort dish reimagined with gourmet flair.',
  },
];

function Services() {
  return (
    <>
      <div className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
          <FaUtensils />
        </div>
        <div className="absolute bottom-10 right-10 text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
          <FaUtensils />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:text-white">
              🍽️ Ocean & Garden Delights
            </p>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Fresh Catch & Comfort</h1>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              From the ocean's bounty to garden-fresh produce, experience culinary excellence 
              with our carefully curated selection of premium dishes crafted with passion.
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 place-items-center">
            {ServiceData.map(({ id, img, name, description }) => {
                return(
              <div
              data-aos="zoom-in"
              data-aos-duration="300"
                key={id}
                className="max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 duration-300 p-4 shadow-xl dark:text-white border border-gray-200 dark:border-gray-700"
              >
                <div className="h-[110px] -mt-8">
                  <img
                    src={img}
                    alt={name}
                    className="max-w-[190px] mx-auto block transform -translate-y-16 group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-white duration-300 translate-y-4">{name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 translate-y-4 dark:text-gray-300">
                    {description}
                  </p>
                </div>
              </div>
                )
})}
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;