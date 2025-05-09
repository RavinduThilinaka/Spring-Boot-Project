import React from 'react';
import Slider from "react-slick";
import slide from '../../assets/slide.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from 'react-icons/fa';

function Comments() {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
        customPaging: i => (
            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mt-8"></div>
        ),
    };

    const commentsData = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Food Blogger",
            text: "The flavors here are absolutely incredible! Every dish is a masterpiece that delights the senses.",
            img: slide,
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Regular Customer",
            text: "Consistently excellent service and food quality. My go-to place for a perfect dining experience.",
            img: slide2,
            rating: 5
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "First-time Visitor",
            text: "The ambiance combined with the exquisite flavors made for an unforgettable evening. Will definitely return!",
            img: slide3,
            rating: 4
        },
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg 
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 uppercase">
                        Testimonials
                    </span>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Customers</span> Say
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Hear from our valued customers about their dining experiences at our restaurant
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Slider {...settings}>
                        {commentsData.map(({ id, name, role, text, img, rating }) => (
                            <div key={id} className="px-4">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 transform transition-all duration-300 hover:shadow-xl">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-6">
                                            <img 
                                                src={img} 
                                                alt={name} 
                                                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full">
                                                <FaQuoteLeft className="text-sm" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex mb-3">
                                            {renderStars(rating)}
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 italic text-lg mb-6 relative">
                                            <span className="absolute -top-6 left-0 text-4xl text-gray-200 dark:text-gray-600">"</span>
                                            {text}
                                            <span className="absolute -bottom-6 right-0 text-4xl text-gray-200 dark:text-gray-600">"</span>
                                        </p>
                                        
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{name}</h3>
                                            <p className="text-amber-500 dark:text-amber-400 text-sm">{role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Comments;