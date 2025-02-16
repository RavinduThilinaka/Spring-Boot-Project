import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProfileCard() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm text-center">
                {/* Profile Image */}
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
                    />
                </div>

                {/* Name & Details */}
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">John Doe</h2>
                <p className="text-gray-500">Software Engineer</p>

                {/* Additional Information */}
                <div className="mt-4 text-gray-600 text-sm space-y-1">
                    <p><span className="font-semibold">Email:</span> johndoe@example.com</p>
                    <p><span className="font-semibold">Gender:</span> Male</p>
                    <p><span className="font-semibold">Age:</span> 28</p>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-300"></div>

                {/* Action Icons */}
                <div className="flex justify-center space-x-6">
                    <button className="text-green-500 hover:text-green-700 transition">
                        <FaEdit size={24} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                        <FaTrash size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
