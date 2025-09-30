import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import UserService from "../Register/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faSpinner, 
  faCheckCircle,
  faPaperPlane,
  faUser,
  faComment,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
          setFormData((prevData) => ({ ...prevData, email: storedEmail }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not authenticated! Please login first.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setProcessing(true);

        try {
            await axios.post(`${UserService.BASE_URL}/contact/addContact`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTimeout(() => {
                setProcessing(false);
                setShowSuccessPopup(true);
                setFormData({ name: "", email: "", message: "" });
            }, 2000);
        } catch (error) {
            console.error("Error", error);
            alert("Contact failed, please try again");
        } finally {
            setLoading(false);
        }
    };

    const socialLinks = [
        { icon: faGlobe, color: "hover:text-blue-600", label: "Facebook", href: "#" },
        { icon: faGlobe, color: "hover:text-blue-400", label: "Twitter", href: "#" },
        { icon: faGlobe, color: "hover:text-pink-600", label: "Instagram", href: "#" },
        { icon: faGlobe, color: "hover:text-blue-700", label: "LinkedIn", href: "#" },
    ];

    const contactInfo = [
        {
            icon: faPhone,
            title: "Call Us",
            details: "+94 123 456 789",
            description: "Mon to Fri 9am to 6pm"
        },
        {
            icon: faEnvelope,
            title: "Email Us",
            details: "contact@foodiehub.com",
            description: "Send us your query anytime!"
        },
        {
            icon: faMapMarkerAlt,
            title: "Visit Us",
            details: "123 Food Street, Polonnaruwa",
            description: "Sri Lanka"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl w-full"
            >
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Information Section */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
                    >
                        {/* Background Decorations */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
                        
                        <div className="relative z-10">
                            <motion.h1 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl lg:text-5xl font-bold mb-6"
                            >
                                Get In Touch
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-amber-100 text-lg mb-12 leading-relaxed"
                            >
                                We're here to help and answer any questions you might have about our delicious offerings. 
                                We look forward to hearing from you!
                            </motion.p>

                            {/* Contact Info Cards */}
                            <div className="space-y-6 mb-12">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                                    >
                                        <div className="p-3 bg-white/20 rounded-xl">
                                            <FontAwesomeIcon icon={item.icon} className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                            <p className="font-medium text-amber-50">{item.details}</p>
                                            <p className="text-amber-100 text-sm mt-1">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="flex space-x-4"
                            >
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white ${social.color} transition-all duration-300 hover:bg-white/30`}
                                        title={social.label}
                                    >
                                        <FontAwesomeIcon icon={social.icon} className="text-lg" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form Section */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-amber-100 dark:border-gray-700"
                    >
                        <div className="mb-8">
                            <motion.h2 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-3xl font-bold text-gray-800 dark:text-white mb-3"
                            >
                                Send us a Message
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-gray-600 dark:text-gray-300"
                            >
                                Have questions about our menu or want to give feedback? Fill out the form below and we'll get back to you soon.
                            </motion.p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <FontAwesomeIcon icon={faUser} className="mr-2 text-amber-600" />
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    name="name"
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                                />
                            </motion.div>

                            {/* Email Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-amber-600" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    name="email"
                                    required
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300"
                                />
                            </motion.div>

                            {/* Message Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <FontAwesomeIcon icon={faComment} className="mr-2 text-amber-600" />
                                    Your Message
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={handleChange}
                                    name="message"
                                    required
                                    rows="5"
                                    placeholder="Tell us about your food experience or ask us anything..."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 resize-none"
                                />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:from-amber-600 hover:to-orange-600"
                            >
                                {loading ? (
                                    <FontAwesomeIcon icon={faSpinner} spin className="text-xl" />
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>

            {/* Processing Overlay */}
            <AnimatePresence>
                {processing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 flex flex-col items-center space-y-4 border border-amber-100 dark:border-gray-700"
                        >
                            <FontAwesomeIcon icon={faSpinner} spin className="text-amber-600 text-4xl" />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">Sending your message...</p>
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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center border border-amber-100 dark:border-gray-700"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <FontAwesomeIcon icon={faCheckCircle} className="text-amber-600 text-4xl" />
                            </motion.div>
                            
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Message Sent!
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Thank you for reaching out! We've received your message and will get back to you within 24 hours.
                            </p>
                            
                            <div className="flex space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowSuccessPopup(false)}
                                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-xl font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Stay Here
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setShowSuccessPopup(false);
                                        navigate("/");
                                    }}
                                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium transition-colors hover:from-amber-600 hover:to-orange-600"
                                >
                                    Go Home
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}