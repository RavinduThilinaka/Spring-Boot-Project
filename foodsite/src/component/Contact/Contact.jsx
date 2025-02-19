import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", { name, email, message });
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
                    <p className="text-cyan-100 text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis explicabo cumque assumenda!</p>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                        <ion-icon name="call" className="text-teal-300 text-xl"></ion-icon>
                            <span className="text-cyan-100">+94 123456789</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <ion-icon name="mail" className="text-teal-300 text-xl"></ion-icon>
                            <span className="text-cyan-100">contact@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <ion-icon name="location" className="text-teal-300 text-xl"></ion-icon>
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
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name" className="ring-2 ring-gray-300 w-full rounded-lg px-5 py-3 outline-none focus:ring-green-700 transition duration-200" />
                        
                        <label className="text-lg font-semibold">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" className="ring-2 ring-gray-300 w-full rounded-lg px-5 py-3 outline-none focus:ring-green-700 transition duration-200" />
                        
                        <label className="text-lg font-semibold">Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message" className="ring-2 ring-gray-300 w-full rounded-lg px-5 py-3 outline-none focus:ring-green-700 transition duration-200" />
                        
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
        </div>
    );
}