import { useState } from "react";
import axios from "axios";
import UserService from "../Register/UserService"; // Import UserService

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    email: "",
    method: "credit_card",
    expDate: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const token = localStorage.getItem("token"); // Get token
  
    if (!token) {
      alert("You are not authenticated! Please login first.");
      setLoading(false);
      return;
    }
  
    try {
     
      const response = await axios.post(
        `${UserService.BASE_URL}/payments/addPayment`,
        formData, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      alert("Payment successful!");
      console.log("Payment Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Payment Details</h2>

        <form onSubmit={handleSubmit}>
          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          {/* Expiry Date & CVV */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-medium">Expiry Date</label>
              <input
                type="text"
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-medium">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="123"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
