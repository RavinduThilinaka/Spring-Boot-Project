import React from 'react';
import Slider from "react-slick";
import slide from '../../assets/slide.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft, FaStar, FaUtensils, FaHeart } from 'react-icons/fa';

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
            <div className="w-3 h-3 rounded-full bg-amber-300/50 hover:bg-amber-500 transition-all duration-300 mt-8"></div>
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
                className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300 fill-current'} transition-transform duration-300 hover:scale-110`}
            />
        ));
    };

    return (
        <div className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-10 left-10 text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
                <FaUtensils />
            </div>
            <div className="absolute bottom-10 right-10 text-6xl text-amber-200 dark:text-amber-900/30 opacity-60">
                <FaUtensils />
            </div>
            
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block mb-4 px-4 py-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-300 uppercase bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-800">
                        ❤️ Customer Love
                    </span>
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Food Lovers</span> Say
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover why our customers keep coming back for more delicious experiences
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Section - Carousel Cards */}
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <Slider {...settings}>
                            {commentsData.map(({ id, name, role, text, img, rating }) => (
                                <div key={id} className="px-4">
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-8 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl border border-amber-100 dark:border-gray-700">
                                        <div className="flex flex-col items-center text-center">
                                            {/* Customer Image with Gradient Border */}
                                            <div className="relative mb-6">
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transform rotate-45 scale-110 animate-pulse-slow"></div>
                                                <img 
                                                    src={img} 
                                                    alt={name} 
                                                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl z-10"
                                                />
                                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                                                    <FaQuoteLeft className="text-sm" />
                                                </div>
                                            </div>
                                            
                                            {/* Rating Stars */}
                                            <div className="flex mb-4 gap-1">
                                                {renderStars(rating)}
                                            </div>
                                            
                                            {/* Testimonial Text */}
                                            <div className="relative mb-6">
                                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl text-amber-100 dark:text-amber-900/30">
                                                    <FaQuoteLeft />
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed italic relative z-10 px-4">
                                                    {text}
                                                </p>
                                                <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2 text-5xl text-amber-100 dark:text-amber-900/30 rotate-180">
                                                    <FaQuoteLeft />
                                                </div>
                                            </div>
                                            
                                            {/* Customer Info */}
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{name}</h3>
                                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-sm uppercase tracking-wider">
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
                    <div className="space-y-8">
                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-3">500+</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Happy Customers</div>
                            </div>
                            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-3">4.9</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Average Rating</div>
                            </div>
                            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-3">98%</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Would Recommend</div>
                            </div>
                            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-3">50+</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Award Dishes</div>
                            </div>
                        </div>

                       

                        {/* Trust Indicators */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700">
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <FaStar className="text-amber-400" />
                                Why Customers Trust Us
                            </h4>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                    Fresh ingredients sourced daily
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                    Expert chefs with 10+ years experience
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                    Consistent quality across all locations
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
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
                .shadow-3xl {
                    box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.25);
                }
            `}</style>
        </div>
    );
}

export default Comments;