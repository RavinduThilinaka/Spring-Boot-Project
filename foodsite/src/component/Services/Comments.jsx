import React from 'react'
import Slider from "react-slick";
import slide from '../../assets/slide.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Comments() {

    var setting={
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,          // Enable autoplay
        autoplaySpeed: 2000,     // Set autoplay speed to 2000ms (2 seconds)
        cssEase: "linear",       // Set easing for smooth transition
        pauseOnHover: true,      // Pause on hover to prevent transition when mouse is over the slider
        pauseOnFocus: true,      // Pause on focus (on input or tab)
    }

    const commentsData = [
        {
            id:1,
            name:"samual",
            text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit Consequuntur quisquam rerum delectus quae sequi, officia, quaeratquas animi, optio unde soluta fugiat a iure aut pariatur voluptatibus placeat in veritatis",
            img:slide
        },
        {
            id:2,
            name:"samual",
            text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit Consequuntur quisquam rerum delectus quae sequi, officia, quaeratquas animi, optio unde soluta fugiat a iure aut pariatur voluptatibus placeat in veritatis",
            img:slide2
        },
        {
            id:3,
            name:"samual",
            text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit Consequuntur quisquam rerum delectus quae sequi, officia, quaeratquas animi, optio unde soluta fugiat a iure aut pariatur voluptatibus placeat in veritatis",
            img:slide3
        },
    ]
  return (
    <>
        <div className="py-10 dark:bg-gray-800"
          data-aos="fade-up"
          data-aos-duration="400"
          >
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-20 max-w-[900px] mx-auto">
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r  dark:text-white">
                    Comments
                    </p>
                    <h1 className="text-3xl font-bold dark:text-white">Customer comments</h1><br />
                    <div className="text-xs text-gray-400 dark:text-white">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consequuntur quisquam rerum delectus quae sequi, officia, quaerat
                    quas animi, optio unde soluta fugiat a iure aut pariatur
                    voluptatibus placeat in veritatis!
                    </div>
                    <br />
                    {/*Comments section*/}
                    <div 
                      data-aos="zoom-in"
                      data-aos-duration="400"
                    className="grid grid-cols-1 max-w-[600px] mx-auto gap-6 dark:bg-slate-950">
                        <Slider {...setting}>
                        {commentsData.map(({ id, name, text, img }) => {
                                return (
                                    // Place the key here on the outer div
                                    <div key={id} className="p-6 rounded-2xl bg-white dark:bg-gray-700 dark:hover:bg-primary hover:bg-primary hover:text-white duration-300 shadow-xl">
                                    <div className="my-6">
                                        <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                                        <img src={img} className="rounded-full block mx-auto w-full h-auto max-w-[96px] max-h-[96px] object-center" />
                                        <p className="text-gray-500 text-sm">{text}</p>
                                        <h1 className="text-xl font-bold">{name}</h1>
                                        <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">,,</p>
                                        </div>
                                    </div>
                                    </div>
                                );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Comments