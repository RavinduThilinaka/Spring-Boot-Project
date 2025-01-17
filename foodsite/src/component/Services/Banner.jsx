
import React from 'react'
import Food1 from '../../assets/banner.jpg';
import { GrSecure } from 'react-icons/gr';
import { IoFastFood } from 'react-icons/io5';
import { GiFoodTruck } from 'react-icons/gi';

function Banner() {
  return (
    <>
        <div className="min-h-[550px] bg-white dark:bg-gray-800">
            <div>
                <div 
                data-aos="slide-up"
                data-aos-duratio="300"
                className='container'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="pt-8">
                            <img src={Food1} 
                            alt=""
                            className='max-w-[430px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,0.1)]' />
                        </div>

                        <div className="flex flex-col justify-center gap-6 sm:pt-0">
                            <h1 className='text-3xl sm:text-4xl font-bold'>Lorem ipsum </h1>
                            <p className='text-sm text-gray-500 tracking-wide leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, ratione dolores corporis minima possimus vero consequuntur non animi odio necessitatibus dolorem voluptates perspiciatis exercitationem aperiam nihil modi cum cupiditate ea?<br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt accusamus ipsa animi officia doloremque, sequi similique, numquam maxime quidem consequatur autem nemo, maiores perspiciatis! Quaerat delectus magni vitae deleniti culpa.</p>
                        </div>

                        <div className="flex gap-6 justify-center">
                            <div className="">
                                <GrSecure className='text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-violet-100 dark::bg-violet-400 dark:bg-violet-500'/>
                            </div>
                            <div className="">
                                <IoFastFood className='text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-orange-100 dark::bg-orange-400 dark:bg-orange-500'/>
                            </div>
                            <div className="">
                                <GiFoodTruck className='text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-green-100 dark::bg-green-400 dark:bg-green-500'/>
                            </div>
                        </div>

                        <div className="">
                            <button className='bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full hover:scale-105 duration-200'>Order Now</button>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Banner