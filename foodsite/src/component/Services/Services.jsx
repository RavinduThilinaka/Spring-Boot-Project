import React from 'react';
import Img2 from '../../assets/rotate3.png';
import { FaUtensils } from 'react-icons/fa';

const ServiceData = [
  {
    id: 1,
    img: Img2,
    name: 'Exquisite Royal Biryani',
    description: 'A symphony of fragrant basmati rice, tender meat, and rare spices, crafted with generations of culinary wisdom. Each grain tells a story of tradition and taste.',
  },
  {
    id: 2,
    img: Img2,
    name: 'Divine Kebab Selection',
    description: 'Masterfully grilled kebabs, kissed by flames and infused with ancient spice blends. A celestial experience for the discerning palate.',
  },
  {
    id: 3,
    img: Img2,
    name: 'Velvet Artisan Curries',
    description: 'Silken curries where spices dance in perfect harmony, slow-simmered to unlock depths of flavor that linger like cherished memories.',
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
              🌟 Epicurean Excellence
            </p>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Culinary Poetry</h1>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Where ingredients transform into emotions and every bite becomes a cherished memory. 
              Our kitchen is our canvas, flavor our masterpiece.
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
                <div className="h-[120px] -mt-11">
                  <img
                    src={img}
                    alt={name}
                    className="max-w-[200px] mx-auto block transform -translate-y-20 group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-white duration-300 translate-y-7">{name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 translate-y-7 dark:text-gray-300">
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