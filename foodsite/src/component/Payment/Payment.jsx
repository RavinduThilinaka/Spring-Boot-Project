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
  faReceipt,
  faLock,
  faUser,
  faGem
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
    cardHolder: ""
  });

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [cardType, setCardType] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

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
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCardIcon = () => {
    switch(cardType) {
      case "visa": return "💳";
      case "mastercard": return "💳";
      case "amex": return "💳";
      default: return "💳";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-amber-200 opacity-20 blur-xl animate-float1"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full bg-orange-200 opacity-20 blur-xl animate-float2"></div>
      <div className="fixed top-1/2 left-1/4 w-24 h-24 rounded-full bg-yellow-100 opacity-10 blur-lg animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-4xl relative overflow-hidden border border-amber-100 dark:border-gray-700"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-amber-100 opacity-30 dark:bg-amber-900/30"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-orange-100 opacity-30 dark:bg-orange-900/30"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Card Preview */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="bg-white/20 p-4 rounded-2xl shadow-lg backdrop-blur-sm">
                      <FontAwesomeIcon icon={faGem} className="text-white text-2xl" />
                    </div>
                    <motion.div 
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FontAwesomeIcon icon={faLock} className="text-white text-xs" />
                    </motion.div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                  FoodieHub Payments
                </h2>
                <p className="text-amber-100 text-center">
                  Safe, Secure & Reliable
                </p>
              </div>

              {/* Card Preview */}
              <div className="flex justify-center">
                <motion.div 
                  className="relative w-80 h-48 cursor-pointer"
                  onHoverStart={() => setIsFlipped(true)}
                  onHoverEnd={() => setIsFlipped(false)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-2xl border border-white/10" style={{ backfaceVisibility: "hidden" }}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-2xl">{getCardIcon()}</div>
                      <div className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">{cardType.toUpperCase() || "CARD"}</div>
                    </div>
                    <div className="text-xl font-mono tracking-wider mb-6">
                      {formData.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <div className="text-gray-400 text-xs">Card Holder</div>
                        <div className="font-semibold">{formData.cardHolder || "YOUR NAME"}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs">Expires</div>
                        <div className="font-semibold">{formData.expDate ? formData.expDate.slice(5,7) + '/' + formData.expDate.slice(2,4) : "MM/YY"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-2xl border border-white/10" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <div className="h-8 bg-black -mx-6 mt-4 mb-8"></div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">Secured by FoodieHub</div>
                      <div className="bg-white px-4 py-2 rounded text-gray-800 text-sm font-mono font-semibold">
                        {formData.cvv || "•••"}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-6 text-2xl">
                      {getCardIcon()}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Security Features */}
            <div className="relative z-10">
              <div className="text-center text-amber-100">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-400" />
                    <span className="text-sm">256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLock} className="text-green-400" />
                    <span className="text-sm">PCI DSS Compliant</span>
                  </div>
                </div>
                <p className="text-xs opacity-80">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="p-8 flex flex-col justify-center">
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  Complete Payment
                </h2>
                <p className="text-gray-500 dark:text-gray-300">
                  Enter your payment details to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Holder Name */}
                <div className="relative">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Card Holder Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleChange}
                      className="w-full p-4 pl-12 border-2 border-amber-100 dark:border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/20 transition-all bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                      placeholder="John Doe"
                      required
                    />
                    <FontAwesomeIcon 
                      icon={faUser} 
                      className="absolute left-4 top-4 text-amber-500" 
                    />
                  </div>
                </div>

                {/* Card Number */}
                <div className="relative">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formatCardNumber(formData.cardNumber)}
                      onChange={handleChange}
                      className="w-full p-4 pl-12 pr-12 border-2 border-amber-100 dark:border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/20 transition-all bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm font-mono"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                    <FontAwesomeIcon 
                      icon={faCreditCard} 
                      className="absolute left-4 top-4 text-amber-500" 
                    />
                    {cardType && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-4 top-4 text-amber-500"
                      >
                        {getCardIcon()}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div className="relative">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Expiry Date</label>
                    <div className="relative">
                      <input
                        type="month"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleChange}
                        className="w-full p-4 pl-12 border-2 border-amber-100 dark:border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/20 transition-all bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                        required
                      />
                      <FontAwesomeIcon icon={faCalendar} className="absolute left-4 top-4 text-amber-500" />
                    </div>
                  </div>

                  {/* CVV */}
                  <div className="relative">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        className="w-full p-4 pl-12 border-2 border-amber-100 dark:border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/20 transition-all bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm font-mono"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                      <FontAwesomeIcon icon={faShieldAlt} className="absolute left-4 top-4 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 pl-12 border-2 border-amber-100 dark:border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/20 transition-all bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                      placeholder="example@email.com"
                      required
                    />
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-4 text-amber-500" />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Payment Method</label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-amber-100 dark:border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/20 transition-all bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm appearance-none"
                  >
                    <option value="credit_card">💳 Credit Card</option>
                    <option value="debit_card">💳 Debit Card</option>
                    <option value="paypal">🔵 PayPal</option>
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center gap-3 font-semibold text-lg group"
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
                      <FontAwesomeIcon icon={faLock} />
                      Pay Securely
                      <FontAwesomeIcon icon={faReceipt} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
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
            className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm border border-amber-100 dark:border-gray-700"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mb-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} className="text-white text-2xl" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Processing Payment</h3>
              <p className="text-gray-500 dark:text-gray-300 text-center mb-6">Please wait while we securely process your payment</p>
              <motion.div 
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full"></div>
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
            className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm text-center border border-amber-100 dark:border-gray-700"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                className="mb-6 bg-green-100 dark:bg-green-900/30 p-5 rounded-full"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-6">Your payment has been processed successfully. A receipt has been sent to your email.</p>
              <div className="flex gap-3 w-full">
                <motion.button 
                  onClick={() => navigate("/orders")}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Orders
                </motion.button>
                <motion.button 
                  onClick={() => setShowSuccessPopup(false)}
                  className="flex-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl border border-amber-200 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-gray-600 transition-all font-semibold"
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Payment;