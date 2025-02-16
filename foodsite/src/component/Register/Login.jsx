import React, { useState } from 'react';
import Google from "../../assets/google.png";
import BackgroundImage from "../../assets/loginBg2.jpg";
import { Link, useNavigate } from 'react-router-dom';
import UserService from './UserService';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const userData = await UserService.login(email, password);
            console.log(userData);

            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('name', userData.name);
                localStorage.setItem('email', email);

                // Redirect based on the user role
                if (userData.role === "USER") {
                    navigate("/"); // Redirect to customer home page
                } else if (userData.role === "ADMIN") {
                    navigate("/role"); // Redirect to admin dashboard
                } else if (userData.role === "SUPPLIER") {
                    navigate("/role"); // Redirect to supplier dashboard
                } else if (userData.role === "MANAGER") {
                    navigate("/role"); // Redirect to manager dashboard
                } else {
                    navigate("/"); // Default home page
                }
            } else {
                setError(userData.message);
            }
        }  catch (error) {
            console.log(error);
            setError(error.message);

            setTimeout(() => {
                setError('');
            }, 5000);
        } finally {
            setIsLoading(false); // Stop loading after request is complete
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="relative flex flex-col m-6 space-y-8 bg-gray-100 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <span className='mb-3 text-4xl font-bold text-center'>Welcome Back !!</span>
                        <span className='font-light text-gray-400 mb-8 text-center'>
                            Welcome back, please enter your details
                        </span>
                        <form onSubmit={handleSubmit}>
                            <div className="py-4">
                                <span className='mb-2 text-md'>Email</span>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
                                    placeholder='Enter your Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div className="py-4">
                                <span className='mb-2 text-md'>Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <div className="flex justify-between w-full py-4">
                                <div className="mr-24">
                                    <input type="checkbox" className='mr-2' />
                                    <span>Remember for 30 days</span>
                                </div>
                                <span className='font-bold text-md'>Forget password</span>
                            </div>

                            <button
                                type="submit"
                                className='w-full bg-blue-500 text-white p-2 rounded-lg mb-6 hover:bg-blue-600 hover:border hover:border-gray-300 duration-500'
                                disabled={isLoading} // Disable the button when loading
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div> // Spinner
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <button className='w-full border border-gray-300 text:md p-2 rounded-lg md-6 hover:bg-gray-200 duration-300 hover:text-black'>
                                <img src={Google} alt="" className='w-6 h-6 inline mr-2' />
                                Sign in with Google
                            </button>
                        </form>
                        <div className="text-center text-gray-400">
                            Don't have an account?
                            <Link className='font-bold text-black ml-3' to={"/signup"}>Sign up for free</Link>
                        </div>
                    </div>

                    <div className="relative">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
