import React, { useState } from 'react';
import BackgroundImage from "../../assets/loginBg1.jpg";
import BackgroundImage2 from "../../assets/loginBg2.jpg";
import { useNavigate } from 'react-router-dom';
import UserService from './UserService';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SignUp() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputsEnabled, setInputsEnabled] = useState(true);
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
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
      setInputsEnabled(false);  // Disable other inputs until secret key is verified
    } else {
      setIsAdmin(false);
      setInputsEnabled(true);  // Enable inputs for regular user
    }
  };

  const handleSecretKeySubmit = () => {
    const correctKey = "1234";  // Replace with your actual key (secure handling required in production)
    
    if (secretKey === correctKey) {
      setIsAdmin(true);
      setInputsEnabled(true);  // Enable fields after key is correct
      setShowSecretKeyModal(false);  // Close modal
      setError('');
      alert("Secret key is correct. Admin access granted!");
    } else {
      setError('Invalid secret key. Please try again.');
      setInputsEnabled(false);  // Keep fields disabled until correct key is entered
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await UserService.register(formData,token);

      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        role: "",
      });

      alert('User Registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error("Error registering user", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"  style={{ backgroundImage: `url(${BackgroundImage2})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="relative w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden ">
        {/* Form Section */}
        <div className="w-1/2 bg-gray-100 px-8 py-12 flex flex-col justify-center shadow-lg ">
          <h2 className="text-3xl font-bold mb-4 text-center">Create Account!</h2>
          <p className="mb-6 text-zinc-700">
            Join us today! Enter your details to create your account.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Role */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                <i className="fas fa-user-tag"></i>
              </div>
              <select
                id="role"
                name="role"
                onChange={handleRoleChange}
                className="pl-10 block w-full border-2 border-gray-300 rounded-md py-2 focus:border-blue-400 focus:outline-none sm:text-sm"
                value={formData.role}
              >
                <option value="">Role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPPLIER">Supplier</option>
                <option value="MANAGER">Manager</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
            </div>
            {/* Full Name */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                disabled={!inputsEnabled}
                onChange={handleInputChange}
                value={formData.name}
                className="pl-10 block w-full border-2 border-gray-300 rounded-md py-2 focus:border-blue-400 focus:outline-none sm:text-sm"
              />
            </div>
            {/* Email */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                <i className="fas fa-envelope"></i>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                disabled={!inputsEnabled}
                onChange={handleInputChange}
                value={formData.email}
                className="pl-10 block w-full border-2 border-gray-300 rounded-md py-2 focus:border-blue-400 focus:outline-none sm:text-sm"
              />
            </div>
            {/* Gender */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                <i className="fas fa-venus-mars"></i>
              </div>
              <select
                id="gender"
                name="gender"
                disabled={!inputsEnabled}
                onChange={handleInputChange}
                value={formData.gender}
                className="pl-10 block w-full border-2 border-gray-300 rounded-md py-2 focus:border-blue-400 focus:outline-none sm:text-sm"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Age */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                <i className="fas fa-birthday-cake"></i>
              </div>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                disabled={!inputsEnabled}
                onChange={handleInputChange}
                value={formData.age}
                className="pl-10 block w-full border-2 border-gray-300 rounded-md py-2 focus:border-blue-400 focus:outline-none sm:text-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400">
                <i className="fas fa-lock"></i>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                disabled={!inputsEnabled}
                onChange={handleInputChange}
                value={formData.password}
                className="pl-10 block w-full border-2 border-gray-300 rounded-md py-2 focus:border-blue-400 focus:outline-none sm:text-sm"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-1/2 relative bg-blue-100 flex items-center justify-center">
          <div className="absolute z-10 text-center">
            <p className="text-zinc-900 text-sm mb-5">Already have an account?</p>
            <a
              href="/login"
              className="border-2 border-blue-400 text-blue-400 py-2 px-5 rounded hover:bg-blue-400 hover:text-white transition"
            >
              Login
            </a>
          </div>
          <img
            src={BackgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Secret Key Modal */}
      {showSecretKeyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Enter Secret Key</h3>
            <input
              type="password"
              className="border-2 border-gray-300 rounded-md py-2 px-4 w-full mb-4"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between gap-1">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition "
                onClick={() => setShowSecretKeyModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={handleSecretKeySubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
