import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import UserService from "../Register/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone, faCalendar, faSpinner, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
            }, 2000);
        } catch (error) {
            console.error("Error", error);
            alert("Contact failed, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="antialiased bg-gray-100 flex w-full min-h-screen justify-center items-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col md:flex-row bg-green-600 max-w-6xl w-full p-12 sm:p-16 rounded-2xl shadow-2xl overflow-hidden"
            >
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-0 w-60 h-60 bg-teal-400 rounded-full -top-14 -left-14"
                ></motion.div>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-0 w-60 h-60 bg-teal-500 rounded-full -bottom-14 -right-14"
                ></motion.div>

                <div className="relative z-10 flex flex-col space-y-8 justify-between w-full md:w-1/2 text-white">
                    <h1 className="font-bold text-5xl tracking-wide">Contact Us</h1>
                    <p className="text-cyan-100 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis explicabo cumque assumenda!
                    </p>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faPhone} className="text-teal-300 text-xl" />
                            <span className="text-cyan-100">+94 123456789</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-teal-300 text-xl" />
                            <span className="text-cyan-100">contact@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-teal-300 text-xl" />
                            <span className="text-cyan-100">123 Street, Polonnaruwa</span>
                        </div>
                    </div>
                    <div className="flex space-x-4 text-lg">
                        <a href="#" className="text-white hover:text-teal-300">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a href="#" className="text-white hover:text-teal-300">
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </a>
                        <a href="#" className="text-white hover:text-teal-300">
                            <ion-icon name="logo-github"></ion-icon>
                        </a>
                        <a href="#" className="text-white hover:text-teal-300">
                            <ion-icon name="logo-whatsapp"></ion-icon>
                        </a>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 bg-white rounded-2xl shadow-lg p-10 text-gray-600 w-full md:w-1/2 max-w-lg"
                >
                    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                        <label className="text-lg font-semibold">Your Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            placeholder="Enter your name"
                            className="ring-2 ring-gray-300 w-full rounded-lg px-5 py-3 outline-none focus:ring-green-700 transition duration-200"
                        />

                        <label className="text-lg font-semibold">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Enter your email"
                            className="ring-2 ring-gray-300 w-full rounded-lg px-5 py-3 outline-none focus:ring-green-700 transition duration-200"
                        />

                        <label className="text-lg font-semibold">Message</label>
                        <textarea
                            value={formData.message}
                            onChange={handleChange}
                            name="message"
                            placeholder="Message"
                            className="ring-2 ring-gray-300 w-full rounded-lg px-5 py-3 outline-none focus:ring-green-700 transition duration-200"
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="self-end bg-cyan-500 hover:bg-cyan-600 transition duration-200 text-white font-bold rounded-lg px-8 py-3 text-lg"
                        >
                            SEND MESSAGE
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>

            {/* Loading Overlay */}
            <AnimatePresence>
                {processing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-50 flex justify-center items-center"
                    >
                        <FontAwesomeIcon icon={faSpinner} spin className="text-white text-6xl" />
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
                        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl mb-3" />
                            <h3 className="text-xl font-semibold text-gray-700">Message Sent Successfully!</h3>
                            <p className="text-gray-500 mb-4">Thank you for contacting us. We will get back to you shortly.</p>
                            <button
                                onClick={() => {
                                    setShowSuccessPopup(false);
                                    navigate("/"); // Navigate to the home page
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
