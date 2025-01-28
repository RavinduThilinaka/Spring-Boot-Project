import React, { useState } from 'react';
import rotateImg from '../../assets/rotate.png';
import Logo from "../../assets/foodlogo.png";

const FoodList = () => {
  const products = [
    { id: 0, image: rotateImg, title: 'Product 1', price: 20 },
    { id: 1, image: rotateImg, title: 'Product 2', price: 60 },
    { id: 2, image: rotateImg, title: 'Product 3', price: 120 },
    { id: 3, image: rotateImg, title: 'Product 4', price: 120 },
    { id: 4, image: rotateImg, title: 'Product 5', price: 120 },
  ];

  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartVisible(true);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-6 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 w-4/5 p-4 rounded-xl shadow-lg mb-8 dark:bg-gray-800">
        <img src={Logo} alt="" className="w-20 h-20" />
        <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">Good Food</p>
        <div className="flex items-center bg-white p-2 rounded-xl shadow-md dark:bg-gray-700">
          <i className="fa-solid fa-cart-shopping text-yellow-500 text-xl mr-2"></i>
          <p className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
            {cart.length}
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex w-4/5 gap-6">
        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
            >
              <div className="h-48 w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-md mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                />
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{product.title}</p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">${product.price}</h3>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {isCartVisible && (
          <div className="w-2/5 max-w-sm border p-6 rounded-xl bg-white shadow-lg dark:bg-gray-800">
            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-xl mb-6 text-center">
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">My Cart</p>
            </div>
            <div>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full border border-yellow-600 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                      <p className="text-sm ml-4 text-gray-700 dark:text-gray-200">{item.title}</p>
                    </div>
                    <div className="flex items-center">
                      <h2 className="text-lg text-gray-800 dark:text-gray-200">${item.price}.00</h2>
                      <i
                        className="fa-solid fa-trash text-red-600 cursor-pointer ml-4 hover:text-red-700 transition duration-200"
                        onClick={() => removeFromCart(index)}
                      ></i>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total</h3>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">${total}.00</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;
