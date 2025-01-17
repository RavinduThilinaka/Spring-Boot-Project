import React from 'react';
import FooterLogo from "../../assets/foodlogo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from 'react-icons/fa6';
import { FaMobileAlt } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-950 dark:text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 py-5">
            {/* Left Section */}
            <div className="py-8 px-4">
              <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-bold text-left">
                <img src={FooterLogo}  className="max-w-[50px]" />
                Good Food
              </h1>
              <p className="mt-4 text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Enim distinctio vel obcaecati doloribus dignissimos inventore eius nobis,
                numquam incidunt quos velit culpa ipsum! Molestiae eveniet iure quisquam! Minus,
                cum at.
              </p>
              <br />
              <div className="flex items-center gap-2 ">
                <div className=""></div>
                <FaLocationArrow />
                <p>New York, USA</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt/>
                <p>+94 123456789</p>
              </div>
              <div className="">
              <div className="flex items-center gap-3 mt-6">

                <a href="">
                  <FaInstagram className='text-3xl'/>
                </a>
                <a href="">
                  <FaFacebook className='text-3xl'/>
                </a>
                <a href="">
                  <FaLinkedin className='text-3xl'/>
                </a>

              </div>
            </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 dark:text-white">

              <div className="">
                <div className="py-8 px-4">
                  <h1 className='text-xl font-bold  text-justify sm:text-left mb-3'>Important Links</h1>
                  <ul className='flex flex-col gap-3'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Login</li>
                  </ul>
                </div>
              </div>

              <div className="">
                <div className="py-8 px-4">
                  <h1 className='text-xl font-bold  text-justify sm:text-left mb-3'>Important Links</h1>
                  <ul className='flex flex-col gap-3'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Login</li>
                  </ul>
                </div>
              </div>

              <div className="">
                <div className="py-8 px-4">
                  <h1 className='text-xl font-bold  text-justify sm:text-left mb-3'>Important Links</h1>
                  <ul className='flex flex-col gap-3'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Login</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            <div className="w-full text-center py-10 border-t-2 border-gray-300/50 whitespace-nowrap">
              © 2025 All rights reserved || Made with ❤️ by Ravindu
            </div>

        </div>
      </div>
    </>
  );
}

export default Footer;
