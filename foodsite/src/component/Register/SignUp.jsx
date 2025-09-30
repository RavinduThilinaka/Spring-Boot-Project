import React, { useState } from 'react';
import BackgroundImage from "../../assets/loginBg1.jpg";
import BackgroundImage2 from "../../assets/loginBg2.jpg";
import { Link, useNavigate } from 'react-router-dom';
import UserService from './UserService';
import { FaUser, FaEnvelope, FaLock, FaVenusMars, FaBirthdayCake, FaUserTag, FaUtensils, FaShippingFast, FaHeart } from 'react-icons/fa';

function SignUp() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputsEnabled, setInputsEnabled] = useState(true);
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  // Handle Role Change
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setFormData({ ...formData, role: selectedRole});

    if (selectedRole === "ADMIN") {
      setShowSecretKeyModal(true);
      setInputsEnabled(false);
    } else {
      setIsAdmin(false);
      setInputsEnabled(true);
    }
  };

  const handleSecretKeySubmit = () => {
    const correctKey = "1234";
    
    if (secretKey === correctKey) {
      setIsAdmin(true);
      setInputsEnabled(true);
      setShowSecretKeyModal(false);
      setError('');
    } else {
      setError('Invalid secret key. Please try again.');
      setInputsEnabled(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      await UserService.register(formData, token);

      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        role: "",
      });

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/login');
      }, 3000);
     
    } catch (error) {
      console.error("Error registering user", error);
      alert("An error occurred while registering user");
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
              <p className="text-amber-100 text-lg">Join our delicious community today!</p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <FaUtensils className="text-amber-200" />
                </div>
                <div>
                  <h3 className="font-semibold">Exclusive Recipes</h3>
                  <p className="text-amber-200 text-sm">Access chef-curated recipes</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <FaShippingFast className="text-amber-200" />
                </div>
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-amber-200 text-sm">Fresh ingredients at your door</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <FaHeart className="text-amber-200" />
                </div>
                <div>
                  <h3 className="font-semibold">Personalized Taste</h3>
                  <p className="text-amber-200 text-sm">Recommendations just for you</p>
                </div>
              </div>
            </div>

            <div className="border-t border-amber-400/30 pt-8">
              <p className="text-amber-200 mb-4">Already a foodie?</p>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 border border-white/30 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Sign In to Your Account</span>
              </Link>
            </div>
          </div>

          {/* Food Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-4xl">🍕</div>
            <div className="absolute top-1/3 left-8 text-3xl">🍔</div>
            <div className="absolute bottom-20 right-20 text-4xl">🥗</div>
            <div className="absolute bottom-10 left-10 text-3xl">🍣</div>
            <div className="absolute top-10 left-1/3 text-4xl">🍰</div>
            <div className="absolute bottom-1/3 right-1/4 text-3xl">☕</div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:w-3/5 p-12 bg-white">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Join FoodieHub</h2>
              <p className="text-gray-600">Create your account and start your culinary journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUserTag className="inline mr-2 text-amber-500" />
                  I want to join as
                </label>
                <select
                  id="role"
                  name="role"
                  onChange={handleRoleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                  value={formData.role}
                >
                  <option value="">Select your role</option>
                  <option value="USER">Food Lover</option>
                  <option value="ADMIN">Restaurant Admin</option>
                  <option value="SUPPLIER">Ingredient Supplier</option>
                  <option value="MANAGER">Kitchen Manager</option>
                  <option value="EMPLOYEE">Restaurant Staff</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2 text-amber-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    disabled={!inputsEnabled}
                    onChange={handleInputChange}
                    value={formData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-amber-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    disabled={!inputsEnabled}
                    onChange={handleInputChange}
                    value={formData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaVenusMars className="inline mr-2 text-amber-500" />
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    disabled={!inputsEnabled}
                    onChange={handleInputChange}
                    value={formData.gender}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaBirthdayCake className="inline mr-2 text-amber-500" />
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="25"
                    disabled={!inputsEnabled}
                    onChange={handleInputChange}
                    value={formData.age}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaLock className="inline mr-2 text-amber-500" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a secure password"
                  disabled={!inputsEnabled}
                  onChange={handleInputChange}
                  value={formData.password}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-amber-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Your Food Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaUtensils />
                    <span>Join FoodieHub</span>
                  </div>
                )}
              </button>
            </form>

            {/* Login Link - Mobile */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200 lg:hidden">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-semibold text-amber-600 hover:text-amber-700 transition-colors hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secret Key Modal */}
      {showSecretKeyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-key text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Admin Verification</h3>
              <p className="text-gray-600">Enter the secret key to register as restaurant admin</p>
            </div>

            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-4"
              placeholder="Enter secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSecretKeySubmit()}
            />

            {error && (
              <div className="flex items-center justify-center text-red-600 bg-red-50 py-2 px-4 rounded-lg mb-4">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300"
                onClick={() => setShowSecretKeyModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors duration-300"
                onClick={handleSecretKeySubmit}
              >
                Verify Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center transform animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-3xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to FoodieHub!</h3>
            <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full animate-progress"></div>
            </div>
            
            <p className="text-sm text-gray-500">Preparing your culinary experience...</p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-progress {
          animation: progress 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default SignUp;