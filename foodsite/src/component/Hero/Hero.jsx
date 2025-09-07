import { useState, useEffect } from 'react';

const FoodHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeDish, setActiveDish] = useState(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Savor The Flavor",
      subtitle: "Journey With Us",
      description: "Indulge in a culinary adventure where each dish tells a story of passion and expertise."
    },
    {
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Taste The Difference",
      subtitle: "Fresh Ingredients",
      description: "Our dishes are crafted with the freshest locally-sourced ingredients for exceptional flavor."
    },
    {
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      title: "Culinary Excellence",
      subtitle: "Master Chefs",
      description: "Experience the artistry of our award-winning chefs with every bite you take."
    }
  ];

  const dishes = [
    {
      id: 1,
      name: "Truffle Risotto",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Creamy Arborio rice with black truffle",
      price: "$24"
    },
    {
      id: 2,
      name: "Beef Wellington",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Prime beef wrapped in puff pastry",
      price: "$36"
    },
    {
      id: 3,
      name: "Chocolate Soufflé",
      image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      description: "Decadent chocolate dessert with vanilla ice cream",
      price: "$14"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [slides.length]);

  const handleDishClick = (dishId) => {
    setActiveDish(activeDish === dishId ? null : dishId);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow with Parallax Effect */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 10s ease-in-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
          <div className="max-w-2xl">
            {/* Animated tagline */}
            <div className="mb-8">
              <div className="inline-block bg-orange-500/20 px-4 py-2 rounded-full mb-6">
                <p className="text-orange-300 text-sm font-semibold">Epicurean Excellence Since 2005</p>
              </div>
              
              <div className="relative h-32 md:h-40 overflow-hidden mb-6">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                      currentSlide === index ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                      {slide.title}
                      <span className="text-orange-400 block mt-2 text-4xl md:text-5xl">{slide.subtitle}</span>
                    </h1>
                  </div>
                ))}
              </div>
              
              <div className="relative h-20 mb-8 overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 transition-transform duration-1000 ease-in-out delay-300 ${
                      currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                  >
                    <p className="text-white text-xl mb-8 max-w-lg font-light leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-700 ${
              isTransitioning ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
              <button className="relative bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Reserve a Table
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="relative border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-10 rounded-full transition-all duration-300 overflow-hidden group flex items-center justify-center">
                <span className="relative z-10 flex items-center justify-center">
                  View Menu
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
            
            {/* Social Proof */}
            <div className={`mt-16 flex items-center space-x-8 transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${1500000000000 + item}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80`} alt="Customer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-white font-semibold">4.9/5</p>
                  <p className="text-orange-200 text-sm">From 850+ reviews</p>
                </div>
              </div>
              
              <div className="h-12 w-px bg-white/30"></div>
              
              <div>
                <p className="text-white font-semibold">Award Winning</p>
                <p className="text-orange-200 text-sm">2023 Culinary Excellence</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Featured dishes with interactive animation */}
          <div className="hidden lg:flex flex-col justify-center items-center relative">
            <div className="relative w-96 h-96">
              {dishes.map((dish, index) => (
                <div
                  key={dish.id}
                  className={`absolute w-60 h-60 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-700 cursor-pointer ${
                    activeDish === dish.id 
                      ? 'active-dish scale-110 z-50' 
                      : activeDish 
                        ? 'inactive-dish scale-90 opacity-70' 
                        : `dish-${index}`
                  }`}
                  onClick={() => handleDishClick(dish.id)}
                  style={{
                    transform: activeDish 
                      ? activeDish === dish.id 
                        ? 'translate(0, 0) scale(1.15)' 
                        : `translate(${(index % 2) * 40 - 20}px, ${(index % 3) * 30 - 30}px) scale(0.9)`
                      : `translate(${index * 30 - 45}px, ${index * 20 - 40}px) rotate(${index * 5 - 10}deg)`
                  }}
                >
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-4">
                    <h3 className="text-white font-bold text-xl text-center">{dish.name}</h3>
                    <p className="text-orange-300 text-sm text-center">{dish.description}</p>
                    <p className="text-white font-semibold mt-1 text-lg">{dish.price}</p>
                  </div>
                  {activeDish === dish.id && (
                    <div className="absolute inset-0 bg-orange-400/10 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-orange-300 mb-2 text-lg">Click on a dish to explore</p>
              <p className="text-white text-sm">Our chef's recommendations</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-10 z-10 animate-float">
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
      
      <div className="absolute top-1/3 left-20 z-10 animate-float animation-delay-1000">
        <div className="w-16 h-16 rounded-full bg-orange-500/30 backdrop-blur-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-12 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-orange-500' : 'bg-white/50 hover:bg-white/80'
            }`}
          ></button>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="flex flex-col items-center">
          <p className="text-white text-sm mb-2">Scroll to discover</p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* Dish initial positions */
        .dish-0 {
          transform: translate(-45px, -40px) rotate(-10deg);
          z-index: 30;
        }
        
        .dish-1 {
          transform: translate(-15px, -20px) rotate(-5deg);
          z-index: 40;
        }
        
        .dish-2 {
          transform: translate(15px, 0px) rotate(5deg);
          z-index: 50;
        }
        
        .active-dish {
          box-shadow: 0 0 40px rgba(255, 165, 0, 0.6);
          z-index: 60 !important;
        }
        
        .inactive-dish {
          filter: blur(1px);
          z-index: 20;
        }
      `}</style>
    </div>
  );
};

export default FoodHero;