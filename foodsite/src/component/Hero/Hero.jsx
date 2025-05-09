import React from 'react'
import bgImg from "../../assets/background.jpg";
import Food1 from "../../assets/rotate.png"
import Food2 from "../../assets/rotate2.png"
import Food3 from "../../assets/rotate3.png"
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const ImageList = [
    {
        id: 1,
        img: Food1,
    },
    {
        id: 2,
        img: Food2,
    },
    {
        id: 3,
        img: Food3,
    }
];

const bgImage = {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%"
}

const Hero = () => {
    const [imageId, setImageId] = React.useState(Food1);

    return (
        <>
            <div 
                className="min-h-[550px] sm:min-h-[600px] bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 flex justify-center items-center overflow-hidden relative" 
                style={bgImage}
            >
                {/* Animated floating elements */}
                <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-400 opacity-20 animate-float1"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-red-400 opacity-20 animate-float2"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-green-400 opacity-20 animate-float3"></div>
                
                <div className="container pb-8 sm:pb-0 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div
                            data-aos="zoom-out"
                            data-aos-duration="400"
                            data-aos-once="true" 
                            className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
                        >
                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white'>
                                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Good Food</span>
                            </h1>
                            <p className='text-sm text-gray-600 dark:text-gray-300'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat reprehenderit non doloribus magnam ullam saepe, incidunt odio blanditiis, veniam aliquam maiores, assumenda perspiciatis modi nostrum? Consequuntur accusamus consectetur error placeat.
                            </p>
                            <div className="flex gap-4 justify-center sm:justify-start">
                                <button className='bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full hover:scale-105 duration-200 shadow-lg hover:shadow-xl transition-all'>
                                    Order Now
                                </button>
                                <button className='border-2 border-primary text-primary dark:text-white dark:border-white px-6 py-3 rounded-full hover:scale-105 duration-200 hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all'>
                                    View Menu
                                </button>
                            </div>
                        </div>
                        <div className="order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative">
                            <div className="flex justify-center items-center h-[300px] sm:h-[450px] mx-auto animate-rotate-slow">
                                <img 
                                    src={imageId} 
                                    className='w-[300px] sm:w-[450px] mx-auto animate-pulse-slow' 
                                    alt="Food item" 
                                />
                            </div>
                            <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-2 absolute bottom-[0px] lg:-right-6 bg-white/30 rounded-full backdrop-blur-sm">
                                {ImageList.map((item) => (
                                    <img 
                                        key={item.id} 
                                        src={item.img}
                                        className='max-w-[70px] h-[70px] object-contain inline-block hover:scale-105 duration-200 cursor-pointer transition-transform hover:rotate-12'
                                        onClick={() => {
                                            setImageId(
                                                item.id === 1 ? Food1 : 
                                                item.id === 2 ? Food2 : Food3
                                            );
                                        }}
                                        alt={`Food ${item.id}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link 
                to="/contact" 
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50 animate-bounce-slow"
                style={{ transform: 'translateZ(0)' }}
            >
                <FiPhoneCall size={24} />
            </Link>

            {/* Add this to your global CSS or as a style tag */}
            <style jsx>{`
                @keyframes rotate-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes float1 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(15px) translateX(-15px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-rotate-slow {
                    animation: rotate-slow 20s linear infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-float1 {
                    animation: float1 8s ease-in-out infinite;
                }
                .animate-float2 {
                    animation: float2 10s ease-in-out infinite;
                }
                .animate-float3 {
                    animation: float3 12s ease-in-out infinite;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}

export default Hero;