import React from 'react';
import Navbar from './component/Navbar/Navbar';
import Hero from './component/Hero/Hero';
import Services from './component/Services/Services';
import Banner from './component/Services/Banner';
import AppStore from './component/Services/AppStore';
import Comments from './component/Services/Comments';
import Footer from './component/Navbar/Footer';
import Login from './component/Register/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for BrowserRouter
import SignUp from './component/Register/SignUp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserService from './component/Register/UserService';
import UserManagement from './component/Register/UserManagement';
import Role from './component/Register/Role';



export default function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });

    AOS.refresh(); // Refresh animations
  }, []);

  return (
    <Router> {/* Wrap everything in the Router */}
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="bg-white dark:">
              {/* Main page components */}
              <Navbar />
              <Hero />
              <Services />
              <Banner />
              <AppStore />
              <Comments />
              <Footer />
            </div>
          }
        />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/role" element={<Role />} />
        {UserService.adminOnly() && (
          <>
            <Route path="/user" element={<UserManagement />} />
          </>
        
        )}
      </Routes>
    </Router>
  );
}
