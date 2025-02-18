import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/profile.png";
export default function ProfileCard() {
    const userName = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const gender = localStorage.getItem('gender');
    const age = localStorage.getItem('age');
    const role = localStorage.getItem('role');
    const firstLetter = userName.charAt(0).toUpperCase();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
            <motion.div 
                className="bg-white shadow-xl rounded-3xl p-12 w-96 text-center transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* First Letter Avatar */}
                <motion.div 
                    className="w-32 h-32 mx-auto flex items-center justify-center rounded-full border-4 border-blue-500 bg-blue-500 text-white text-5xl font-bold shadow-lg"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  
                >
                    {firstLetter}
                </motion.div>

                {/* Name & Details */}
                <h2 className="text-3xl font-semibold mt-6 text-gray-800">{userName}</h2>
                <p className="text-gray-500 text-xl">{role}</p>

                {/* Additional Information */}
                <div className="mt-6 text-gray-600 text-lg space-y-2 text-left px-8">
                    <p><span className="font-semibold">Email:</span> {email}</p>
                    <p><span className="font-semibold">Gender:</span> {gender}</p>
                    <p><span className="font-semibold">Age:</span> {age}</p>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-gray-300"></div>

                {/* Action Icons */}
                <div className="flex justify-center space-x-8">
                    <motion.button 
                        className="text-green-500 hover:text-green-700 transition transform hover:scale-110"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaEdit size={32} />
                    </motion.button>
                    <motion.button 
                        className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaTrash size={32} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
