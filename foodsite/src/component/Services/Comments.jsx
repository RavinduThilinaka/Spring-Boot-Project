import React from 'react';
import Slider from "react-slick";
import slide from '../../assets/slide.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft, FaStar, FaUtensils, FaHeart, FaUsers, FaAward, FaThumbsUp, FaCheckCircle } from 'react-icons/fa';

function Comments() {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
        fade: true,
        customPaging: i => (
            <div className="w-2 h-2 rounded-full bg-amber-300/70 hover:bg-amber-500 transition-all duration-300 mt-6 lg:mt-8 transform hover:scale-125"></div>
        ),
    };

    const commentsData = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Food Blogger",
            text: "The flavors here are absolutely incredible! Every dish is a masterpiece that delights the senses. The attention to detail in both presentation and taste is remarkable.",
            img: slide,
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Regular Customer",
            text: "Consistently excellent service and food quality. My go-to place for a perfect dining experience. The ambiance makes every visit special.",
            img: slide2,
            rating: 5
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "First-time Visitor",
            text: "The ambiance combined with the exquisite flavors made for an unforgettable evening. Will definitely return! The dessert menu is to die for.",
            img: slide3,
            rating: 4
        },
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar 
                key={i}
                className={`w-4 h-4 lg:w-5 lg:h-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300 fill-current'} transition-transform duration-300`}
            />
        ));
    };

    return (
        <div className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-4 left-4 lg:top-10 lg:left-10 text-4xl lg:text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
                <FaUtensils />
            </div>
            <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 text-4xl lg:text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
                <FaUtensils />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-10 lg:mb-16">
                    <span className="inline-block mb-3 lg:mb-4 px-3 lg:px-4 py-1 lg:py-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-300 uppercase bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-800">
                        ❤️ Customer Love
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 lg:mb-6 px-4">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Food Lovers</span> Say
                    </h1>
                    <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
                        Discover why our customers keep coming back for more delicious experiences
                    </p>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Section - Carousel Cards */}
                    <div className="w-full max-w-full lg:max-w-2xl mx-auto order-2 lg:order-1">
                        <Slider {...settings}>
                            {commentsData.map(({ id, name, role, text, img, rating }) => (
                                <div key={id} className="px-2 sm:px-4">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8 transform transition-all duration-500 hover:scale-[1.01] lg:hover:scale-[1.02] border border-amber-100 dark:border-gray-700">
                                        <div className="flex flex-col items-center text-center">
                                            {/* Customer Image with Gradient Border */}
                                            <div className="relative mb-4 lg:mb-6">
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transform rotate-45 scale-110 animate-pulse-slow"></div>
                                                <img 
                                                    src={img} 
                                                    alt={name} 
                                                    className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg lg:shadow-2xl z-10"
                                                />
                                                <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 lg:p-3 rounded-full shadow-md lg:shadow-lg transform hover:scale-110 transition-transform duration-300">
                                                    <FaQuoteLeft className="text-xs lg:text-sm" />
                                                </div>
                                            </div>
                                            
                                            {/* Rating Stars */}
                                            <div className="flex mb-3 lg:mb-4 gap-1">
                                                {renderStars(rating)}
                                            </div>
                                            
                                            {/* Testimonial Text */}
                                            <div className="relative mb-4 lg:mb-6">
                                                <div className="absolute -top-4 lg:-top-6 left-1/2 transform -translate-x-1/2 text-3xl lg:text-5xl text-amber-100 dark:text-amber-900/30">
                                                    <FaQuoteLeft />
                                                </div>
                                                <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed italic relative z-10 px-2 lg:px-4">
                                                    {text}
                                                </p>
                                                <div className="absolute -bottom-4 lg:-bottom-6 right-1/2 transform translate-x-1/2 text-3xl lg:text-5xl text-amber-100 dark:text-amber-900/30 rotate-180">
                                                    <FaQuoteLeft />
                                                </div>
                                            </div>
                                            
                                            {/* Customer Info */}
                                            <div className="text-center">
                                                <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-800 dark:text-white mb-1 lg:mb-2">{name}</h3>
                                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-xs lg:text-sm uppercase tracking-wider">
                                                    {role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Right Section - Additional Content */}
                    <div className="space-y-6 lg:space-y-8 order-1 lg:order-2 w-full">
                        {/* Stats Section */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 lg:gap-6">
                            <div className="text-center p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-2 lg:mb-3">500+</div>
                                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center gap-1">
                                    <FaUsers className="text-amber-500" />
                                    Happy Customers
                                </div>
                            </div>
                            <div className="text-center p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-2 lg:mb-3">4.9</div>
                                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center gap-1">
                                    <FaStar className="text-amber-500" />
                                    Average Rating
                                </div>
                            </div>
                            <div className="text-center p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-2 lg:mb-3">98%</div>
                                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center gap-1">
                                    <FaThumbsUp className="text-amber-500" />
                                    Would Recommend
                                </div>
                            </div>
                            <div className="text-center p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-2 lg:mb-3">50+</div>
                                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center gap-1">
                                    <FaAward className="text-amber-500" />
                                    Award Dishes
                                </div>
                            </div>
                        </div>


                        {/* Trust Indicators */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border border-amber-100 dark:border-gray-700">
                            <h4 className="text-base lg:text-lg font-bold text-gray-800 dark:text-white mb-3 lg:mb-4 flex items-center gap-2">
                                <FaCheckCircle className="text-amber-400" />
                                Why Customers Trust Us
                            </h4>
                            <ul className="space-y-2 lg:space-y-3 text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
                                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                                    Fresh ingredients sourced daily
                                </li>
                                <li className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
                                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                                    Expert chefs with 10+ years experience
                                </li>
                                <li className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
                                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                                    Consistent quality across all locations
                                </li>
                                <li className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
                                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                                    Eco-friendly packaging and practices
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animation */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 0.4; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default Comments;