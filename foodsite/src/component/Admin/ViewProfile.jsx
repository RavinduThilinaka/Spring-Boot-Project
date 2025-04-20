import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import UserService from "../Register/UserService";

export default function ViewProfile() {

    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <motion.div
                className="bg-white shadow-lg rounded-2xl p-6 max-w-sm text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* First Letter Avatar */}
                <motion.div
                    className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400 flex items-center justify-center bg-blue-500 text-white text-3xl font-bold"
                    whileHover={{ scale: 1.1 }}
                >
                    {profileInfo.name?.charAt(0).toUpperCase() || "U"}
                </motion.div>

                {/* User Details */}
                <h2 className="text-xl font-semibold mt-4">Name: {profileInfo.name}</h2>
                <p className="text-gray-600 text-sm">Email: {profileInfo.email}</p>
                <p className="text-gray-600 text-sm">Gender: {profileInfo.gender}</p>
                <p className="text-gray-600 text-sm">Age: {profileInfo.age}</p>
                <span className="text-sm font-medium text-blue-500">Software Engineer</span>

                <p className="mt-3 text-gray-500 text-sm">
                    Passionate about coding, design, and creating meaningful experiences.
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-4">
                    <motion.a href="#" className="text-blue-400 text-xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}>
                        <FaTwitter />
                    </motion.a>
                    <motion.a href="#" className="text-blue-700 text-xl"
                        whileHover={{ scale: 1.2, rotate: -10 }}>
                        <FaLinkedin />
                    </motion.a>
                    <motion.a href="#" className="text-gray-800 text-xl"
                        whileHover={{ scale: 1.2 }}>
                        <FaGithub />
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
}
