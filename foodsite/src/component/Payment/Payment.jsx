import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "../Register/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCreditCard, 
  faEnvelope, 
  faShieldAlt, 
  faCalendar, 
  faSpinner, 
  faCheckCircle,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    email: "",
    method: "credit_card",
    expDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [cardType, setCardType] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prevData) => ({ ...prevData, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Detect card type
    if (name === "cardNumber") {
      const firstDigit = value.charAt(0);
      if (/^4/.test(value)) {
        setCardType("visa");
      } else if (/^5[1-5]/.test(value)) {
        setCardType("mastercard");
      } else if (/^3[47]/.test(value)) {
        setCardType("amex");
      } else {
        setCardType("");
      }
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
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

      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setShowSuccessPopup(true);
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl animate-float1"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full bg-indigo-100 opacity-20 blur-xl animate-float2"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-indigo-100 opacity-30"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full shadow-lg">
              <FontAwesomeIcon icon={faCreditCard} className="text-white text-2xl" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Payment Details</h2>
          <p className="text-gray-500 text-center mb-6">Complete your purchase securely</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <label className="block text-gray-600 text-sm font-medium mb-2">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formatCardNumber(formData.cardNumber)}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
                <FontAwesomeIcon 
                  icon={faCreditCard} 
                  className="absolute left-4 top-4 text-gray-400" 
                />
                {cardType && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 top-4"
                  >
                    <div className={`w-8 h-5 rounded ${cardType === "visa" ? "bg-blue-500" : cardType === "mastercard" ? "bg-red-500" : "bg-green-500"}`}></div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mb-5">
              <div className="w-1/2 relative">
                <label className="block text-gray-600 text-sm font-medium mb-2">Expiry Date</label>
                <div className="relative">
                  <input
                    type="month"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleChange}
                    className="w-full p-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                  <FontAwesomeIcon icon={faCalendar} className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>
              <div className="w-1/2 relative">
                <label className="block text-gray-600 text-sm font-medium mb-2">CVV</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full p-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                  <FontAwesomeIcon icon={faShieldAlt} className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-5 relative">
              <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="example@email.com"
                  required
                />
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-4 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 text-sm font-medium mb-2">Payment Method</label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-white"
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
              disabled={loading || processing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faReceipt} />
                  Pay Now
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Processing Payment Popup */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mb-5"
              >
                <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-5xl" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
              <p className="text-gray-500 text-center">Please wait while we securely process your payment</p>
              <motion.div 
                className="w-full bg-gray-200 rounded-full h-2.5 mt-6"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2.5 rounded-full"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-5 bg-green-100 p-4 rounded-full"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-6">Your payment has been processed successfully. A receipt has been sent to your email.</p>
              <div className="flex gap-4">
                <motion.button 
                  onClick={() => navigate("/orders")}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Orders
                </motion.button>
                <motion.button 
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-15px); }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Payment;