import { useEffect, useState,useNavigate } from "react";
import axios from "axios";
import UserService from "../Register/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faEnvelope, faShieldAlt, faCalendar, faSpinner, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    email: "",
    method: "credit_card",
    expDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false); // New: Payment processing state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prevData) => ({ ...prevData, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated! Please login first.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${UserService.BASE_URL}/payments/addPayment`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Simulate payment processing time
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setShowSuccessPopup(true);
      }, 2000); // 2 seconds delay before showing success popup

    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Payment Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm font-medium">Card Number</label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="1234 5678 9012 3456"
                required
              />
              <FontAwesomeIcon icon={faCreditCard} className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/2 relative">
              <label className="block text-gray-600 text-sm font-medium">Expiry Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <FontAwesomeIcon icon={faCalendar} className="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
            <div className="w-1/2 relative">
              <label className="block text-gray-600 text-sm font-medium">CVV</label>
              <div className="relative">
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="123"
                  required
                />
                <FontAwesomeIcon icon={faShieldAlt} className="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@email.com"
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

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

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex justify-center items-center"
            disabled={loading || processing}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : "Pay Now"}
          </motion.button>
        </form>
      </motion.div>

      {/* Processing Payment Popup */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-6xl animate-spin mb-3" />
              <h3 className="text-xl font-semibold text-gray-700">Processing Payment...</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl mb-3" />
              <h3 className="text-xl font-semibold text-gray-700">Payment Successful!</h3>
              <p className="text-gray-500 mb-4">Your payment has been processed successfully.</p>
              <button onClick={() => setShowSuccessPopup(false)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;
