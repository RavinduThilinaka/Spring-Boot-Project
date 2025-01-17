import React from 'react';
import Img2 from '../../assets/rotate3.png';

const ServiceData = [
  {
    id: 1,
    img: Img2,
    name: 'Biryyani',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur quisquam rerum delectus quae sequi, officia, quaerat quas animi, optio unde soluta fugiat a iure aut pariatur voluptatibus placeat in veritatis!',
  },
  {
    id: 2,
    img: Img2,
    name: 'Kebab',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur quisquam rerum delectus quae sequi, officia, quaerat quas animi, optio unde soluta fugiat a iure aut pariatur voluptatibus placeat in veritatis!',
  },
  {
    id: 3,
    img: Img2,
    name: 'Curry',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur quisquam rerum delectus quae sequi, officia, quaerat quas animi, optio unde soluta fugiat a iure aut pariatur voluptatibus placeat in veritatis!',
  },
];

function Services() {
  return (
    <>
      <div className="py-10 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:text-white">
              Our Services
            </p>
            <h1 className="text-3xl font-bold dark:text-white">Services</h1>
            <div className="text-xs text-gray-400 dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur quisquam rerum delectus quae sequi, officia, quaerat
              quas animi, optio unde soluta fugiat a iure aut pariatur
              voluptatibus placeat in veritatis!
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 place-items-center">
            {ServiceData.map(({ id, img, name, description }) => {
                return(
              <div
              data-aos="zoom-in"
              data-aos-duration="300"
                key={id}
                className="max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 dark-hover:bg-primary hover:text-white hover:bg-primary  duration-300 p-4 shadow-xl dark:text-white"
              >
                <div className="h-[120px] -mt-11">
                  <img
                    src={img}
                    alt={name}
                    className="max-w-[200px]  mx-auto block transform -translate-y-20 group-hover:scale-105 group-hover:rotate-6 duration-300 dark:text-white"
                  />
                </div>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold translate-y-7">{name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 translate-y-7 dark:text-white">
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
