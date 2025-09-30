import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserService from "../Register/UserService";
function EditUser() {

   const navigate = useNavigate();
   const {userId} = useParams();

   const [userData,setUserData] = useState({
    name:"",
    email:"",
    gender:"",
    age:"",
    role:""
   })

   useEffect(()=>{
    fetchUserDataById(userId);
   },[userId]);

   const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId,token);
      const {name,email,gender,age,role} = response.ourUsers;
      setUserData({name,email,gender,age,role})
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
   }

   const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setUserData((prevUserData)=>({
        ...prevUserData,
        [name]: value
    }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

      const confirmUpdate = window.confirm('Are your sure want to Update this user?');

      if(confirmUpdate){
          const token = localStorage.getItem('token');
          await UserService.updateUser(userId,userData,token);

          navigate("/admin")
      }
     
  } catch (error) {
     console.error('Error updating user profile:', error);
     alert(error)
  }
  
};
  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="update name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="update email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="update age"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Role</label>
            <input
                type="text"
                name="role"
                value={userData.role}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled
                />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default EditUser