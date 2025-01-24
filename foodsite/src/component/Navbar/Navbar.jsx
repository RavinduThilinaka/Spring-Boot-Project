import React from 'react';
import Logo from "../../assets/foodlogo.png";
import { FaCartShopping } from 'react-icons/fa6';
import DarkMode from './DarkMode';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem('name');  // Get the name from localStorage
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : null;
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate("/login"); // Redirect to login page after logout
  };

  
  
  return (
    <>
  
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold">
              <a  className="flex items-center gap-2">
                <img src={Logo} alt="Foodie Zoon" className="w-10" />
                Good Food
              </a>
            </div>

            
            <div className="flex items-center gap-6">
            <DarkMode />
              <ul className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full hover:scale-105 duration-300 flex items-center gap-3">
                Order
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
                <li>
                  <Link
                    href=""
                    className="inline-block py-4 px-4 hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    className="inline-block py-4 px-4 hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/login" className="inline-block py-4 px-4 hover:text-primary">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="inline-block py-4 px-4 hover:text-primary">
                        Sign up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {/* Display User Name and Initial */}
                  
                    <li>
                      <button
                        onClick={handleLogout}
                        className="inline-block py-4 px-4 hover:text-primary"
                      >
                        Log Out
                      </button>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 dark:bg-green-500 text-white rounded-full flex items-center justify-center">
                        {firstLetter}
                      </div>
                      <span className='font-bold'>{userName}</span>
                    </li>
                  </>
                )}
              </ul>

              
             

              {/* Dark Mode Toggle */}
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
