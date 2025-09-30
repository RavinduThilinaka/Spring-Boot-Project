import React, { useState, useEffect } from 'react';
import bgImg1 from "../../assets/background1.jpg";
import bgImg2 from "../../assets/background2.jpg";
import bgImg3 from "../../assets/background3.jpg";
import bgImg4 from "../../assets/background4.jpg";
import Food1 from "../../assets/rotate.png";
import Food2 from "../../assets/rotate2.png";
import Food3 from "../../assets/rotate3.png";
import { FiPhoneCall, FiArrowRight, FiStar, FiClock, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

const ImageList = [
  {
    id: 1,
    img: Food1,
    name: "Gourmet Pizza",
    description: "Wood-fired perfection with artisanal toppings"
  },
  {
    id: 2,
    img: Food2,
    name: "Signature Pasta",
    description: "Handcrafted pasta with chef's special sauce"
  },
  {
    id: 3,
    img: Food3,
    name: "Deluxe Burger",
    description: "Premium beef with organic ingredients"
  }
];

const BackgroundImages = [
  bgImg1,
  bgImg2,
  bgImg3,
  bgImg4
];

const Hero = () => {
  const [currentFood, setCurrentFood] = useState(ImageList[0]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  // Auto-swap background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % BackgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Text animation effect
  useEffect(() => {
    const textInterval = setInterval(() => {
      setIsTextVisible(false);
      setTimeout(() => setIsTextVisible(true), 500);
    }, 8000);

    return () => clearInterval(textInterval);
  }, []);

  const handleFoodChange = (food) => {
    setIsTextVisible(false);
    setTimeout(() => {
      setCurrentFood(food);
      setIsTextVisible(true);
    }, 300);
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gray-900">
        {/* Hero Section - Adjusted to remove any gap */}
        <div 
          className="min-h-screen flex justify-center items-center overflow-hidden relative -mt-2" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${BackgroundImages[currentBgIndex]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transition: "background-image 1.5s ease-in-out"
          }}
        >
          {/* Animated floating elements */}
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-400 opacity-20 animate-float1"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-red-400 opacity-20 animate-float2"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-green-400 opacity-20 animate-float3"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-purple-400 opacity-20 animate-float4"></div>
          
          {/* Animated particles */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${15 + Math.random() * 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col justify-center gap-8 text-center lg:text-left">
                <div className="overflow-hidden">
                  <h1 
                    className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 transition-all duration-700 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  >
                    Savor the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Finest</span> Cuisine
                  </h1>
                </div>
                
                <div className="overflow-hidden">
                  <p className={`text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 transition-all duration-700 delay-150 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Experience culinary excellence with our chef's specially curated menu. Each dish tells a story of flavor, passion, and the finest ingredients sourced locally.
                  </p>
                </div>
                
                <div className={`flex flex-col sm:flex-row gap-6 justify-center lg:justify-start transition-all duration-700 delay-300 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <button className='bg-gradient-to-r from-yellow-500 to-red-600 text-white px-8 py-4 rounded-full hover:scale-105 duration-200 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group font-semibold text-lg'>
                    Order Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className='border-2 border-white text-white px-8 py-4 rounded-full hover:scale-105 duration-200 hover:bg-white hover:text-gray-900 transition-all font-semibold text-lg'>
                    View Menu
                  </button>
                </div>
                
                <div className={`grid grid-cols-2 gap-6 mt-8 transition-all duration-700 delay-500 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                        <FiStar className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-white text-lg font-semibold">4.9 Rating</p>
                        <p className="text-gray-400 text-sm">2000+ Reviews</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                        <FiClock className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-white text-lg font-semibold">30 min</p>
                        <p className="text-gray-400 text-sm">Delivery Time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <FiUsers className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-white text-lg font-semibold">500+</p>
                        <p className="text-gray-400 text-sm">Daily Customers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">30+</span>
                      </div>
                      <div>
                        <p className="text-white text-lg font-semibold">Chef's Special</p>
                        <p className="text-gray-400 text-sm">Unique Dishes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative flex justify-center items-center">
                  {/* Main rotating food image */}
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="animate-rotate-slow relative z-10 flex items-center justify-center">
                      <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                        <img 
                          src={currentFood.img} 
                          className='w-full h-full object-cover animate-float-slow' 
                          alt={currentFood.name} 
                        />
                      </div>
                    </div>
                    
                    {/* Floating elements around the main image */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-float-element1">
                      <span className="text-xs text-white font-semibold">Fresh</span>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-float-element2">
                      <span className="text-xs text-white font-semibold">Organic</span>
                    </div>
                    <div className="absolute top-1/2 -right-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-float-element3">
                      <span className="text-xs text-white font-semibold">Tasty</span>
                    </div>
                    <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-float-element4">
                      <span className="text-xs text-white font-semibold">Hot</span>
                    </div>
                  </div>
                </div>
                
                {/* Food description */}
                <div className={`text-center mt-8 transition-all duration-500 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentFood.name}</h3>
                  <p className="text-gray-300 max-w-md mx-auto">{currentFood.description}</p>
                </div>
                
                {/* Food selector */}
                <div className="flex justify-center gap-4 mt-8">
                  {ImageList.map((item) => (
                    <div 
                      key={item.id} 
                      className={`relative cursor-pointer transition-all duration-300 ${currentFood.id === item.id ? 'scale-110 ring-4 ring-yellow-400/50' : 'scale-100 grayscale hover:grayscale-0'}`}
                      onClick={() => handleFoodChange(item)}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                        <img 
                          src={item.img}
                          className='w-full h-full object-cover'
                          alt={item.name}
                        />
                      </div>
                      {currentFood.id === item.id && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          ●
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Background image indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {BackgroundImages.map((_, index) => (
              <div 
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentBgIndex ? 'bg-yellow-400 scale-125' : 'bg-white/50 scale-100'} cursor-pointer`}
                onClick={() => setCurrentBgIndex(index)}
              ></div>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce flex flex-col items-center">
              <span className="text-white text-sm mb-2">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone call button */}
        <Link 
          to="/contact" 
          className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-bounce-slow group"
        >
          <FiPhoneCall size={24} />
          <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Us
          </span>
        </Link>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-30px) translateX(15px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(20px) translateX(-20px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-15px) translateX(-15px) rotate(3deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(25px) translateX(10px) scale(1.1); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
          33% { transform: translateY(-30px) translateX(15px) scale(1.2); opacity: 0.5; }
          66% { transform: translateY(20px) translateX(-20px) scale(0.8); opacity: 0.2; }
        }
        @keyframes float-element1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes float-element2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(10px); }
        }
        @keyframes float-element3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes float-element4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-5px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float1 {
          animation: float1 10s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 12s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 14s ease-in-out infinite;
        }
        .animate-float4 {
          animation: float4 16s ease-in-out infinite;
        }
        .animate-float-element1 {
          animation: float-element1 8s ease-in-out infinite;
        }
        .animate-float-element2 {
          animation: float-element2 9s ease-in-out infinite;
        }
        .animate-float-element3 {
          animation: float-element3 10s ease-in-out infinite;
        }
        .animate-float-element4 {
          animation: float-element4 11s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Hero;