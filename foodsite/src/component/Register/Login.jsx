import React, { useState } from 'react';
import Google from "../../assets/google.png";
import BackgroundImage from "../../assets/loginBg2.jpg";
import { Link, useNavigate } from 'react-router-dom';
import UserService from './UserService';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUtensils, FaHeart, FaShippingFast } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userData = await UserService.login(email, password);
            console.log(userData);

            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('name', userData.name);
                localStorage.setItem('email', email);

                if (userData.role === "USER") {
                    navigate("/");
                } else if (userData.role === "ADMIN") {
                    navigate("/role");
                } else if (userData.role === "SUPPLIER") {
                    navigate("/role");
                } else if (userData.role === "MANAGER") {
                    navigate("/role");
                } else {
                    navigate("/");
                }
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-amber-50">
            {/* Main Card */}
            <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
                
                {/* Left Section - Food Theme & Info */}
                <div className="lg:w-2/5 bg-gradient-to-br from-amber-500 to-orange-600 p-12 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                                    <FaUtensils className="text-xl" />
                                </div>
                                <h1 className="text-4xl font-bold">Foodie<span className="text-amber-200">Hub</span></h1>
                            </div>
                            <p className="text-amber-100 text-lg">Welcome back to your culinary journey!</p>
                        </div>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                                    <FaUtensils className="text-amber-200" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Fresh Ingredients</h3>
                                    <p className="text-amber-200 text-sm">Daily delivered from local farms</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                                    <FaShippingFast className="text-amber-200" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Fast Delivery</h3>
                                    <p className="text-amber-200 text-sm">30-minutes or it's free</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                                    <FaHeart className="text-amber-200" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Favorite Dishes</h3>
                                    <p className="text-amber-200 text-sm">Save your preferred meals</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-amber-400/30 pt-8">
                            <p className="text-amber-200 mb-4">New to FoodieHub?</p>
                            <Link
                                to="/signup"
                                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 border border-white/30 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                <i className="fas fa-user-plus"></i>
                                <span>Join Our Food Community</span>
                            </Link>
                        </div>
                    </div>

                    {/* Food Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 text-4xl">🍕</div>
                        <div className="absolute top-1/3 left-8 text-3xl">🍔</div>
                        <div className="absolute bottom-20 right-20 text-4xl">🥗</div>
                        <div className="absolute bottom-10 left-10 text-3xl">🍣</div>
                        <div className="absolute top-10 left-1/3 text-4xl">☕</div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="lg:w-3/5 p-12 bg-white">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                            <p className="text-gray-600">Sign in to continue your food adventure</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center animate-shake">
                                <div className="flex items-center justify-center space-x-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <i className="fas fa-envelope mr-2 text-amber-500"></i>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <i className="fas fa-lock mr-2 text-amber-500"></i>
                                    Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500 transition duration-300"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <button 
                                    type="button"
                                    className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-300 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-amber-200"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <i className="fas fa-utensils"></i>
                                        <span>Sign In to FoodieHub</span>
                                    </div>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center justify-center my-6">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink mx-4 text-sm text-gray-500 bg-white px-3">or continue with</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* Google Sign In */}
                            <button 
                                type="button"
                                className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-[1.02]"
                            >
                                <img src={Google} alt="Google" className="w-5 h-5" />
                                <span>Continue with Google</span>
                            </button>
                        </form>

                        {/* Sign Up Link - Mobile */}
                        <div className="text-center mt-8 pt-6 border-t border-gray-200 lg:hidden">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className="font-semibold text-amber-600 hover:text-amber-700 transition-colors hover:underline"
                                >
                                    Join FoodieHub
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shake Animation */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default Login;