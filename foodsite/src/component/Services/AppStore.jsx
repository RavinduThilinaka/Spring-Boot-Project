import React from 'react'
import playstore from '../../assets/googleplay.png';
import Appstore from '../../assets/appleplay.png';
import gif from '../../assets/gif.gif';
function AppStore() {
  return (
    <>
        <div className="bg-gray-100 dark:bg-gray-700 py-14">
            <div className="container">
                <div className="grid grid-cols-2 items-center gap-4">
                    <div 
                      data-aos="fade-up"
                      data-aos-duration="400"
                    className="space-y-6 max-w-xl mx-auto">
                        <h1 className='text-2xl text-center sm:text-left sm:text-4xl font-semibold dark:text-gray-400 text-gray-700'>Foodly is avilable for andriod </h1>

                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
                        <a href="">
                            <img 
                            src={playstore} alt="" 
                            className='max-w-[150px] sm:max-w-[120px] md:max-w-[200px]'/>
                        </a>
                        <a href="">
                            <img 
                            src={Appstore} alt="" 
                            className='max-w-[150px] sm:max-w-[120px] md:max-w-[200px] '/>
                        </a>
                       
                    </div>
                    </div>
                    
                    <div className="w-[350px]"
                      data-aos="zoom-in"
                      data-aos-duration="400"
                      >
                        <img src={gif} alt="" />
                    </div>

                    
                </div>
            </div>
        </div>
    </>
  )
}

export default AppStore