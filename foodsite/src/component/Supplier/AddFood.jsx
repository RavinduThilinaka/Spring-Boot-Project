import React, { useState } from 'react';
import axios from 'axios';
import UserService from '../Register/UserService';

export default function AddFood() {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [foodImage, setFoodImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To hold the image preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
      const imageURL = URL.createObjectURL(file); // Generate preview URL
      setImagePreview(imageURL); // Set the preview URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('foodName', foodName);
    formData.append('foodPrice', foodPrice);
    formData.append('availabilityStatus', availabilityStatus);
    formData.append('foodQuantity', foodQuantity);
    if (foodImage) formData.append('foodImage', foodImage);
  
    console.log('Sending request to backend with data:', formData); // Debugging request data
  
    axios
      .post(`${UserService.BASE_URL}/supplier/addsupplier`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Food Supplier Added:', response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        alert('Error in connecting to the backend!');
      });
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Food Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="foodName">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="foodPrice">
            Food Price
          </label>
          <input
            type="text"
            id="foodPrice"
            name="foodPrice"
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="foodQuantity">
            Food Quantity
          </label>
          <input
            type="number"
            id="foodQuantity"
            name="foodQuantity"
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="availabilityStatus">
            Availability Status
          </label>
          <select
            id="availabilityStatus"
            name="availabilityStatus"
            value={availabilityStatus}
            onChange={(e) => setAvailabilityStatus(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="foodImage">
            Food Image
          </label>
          <input
            type="file"
            id="foodImage"
            name="foodImage"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700">Image Preview:</h3>
            <img src={imagePreview} alt="Food Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
