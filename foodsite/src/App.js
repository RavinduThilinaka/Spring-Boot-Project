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
import Admin from './component/Admin/Admin';
import Supplier from './component/Supplier/Supplier';
import Cart from './component/Dishes/Cart';
import FoodList from './component/Dishes/FoodList';
import AddFood from './component/Supplier/AddFood';
import Payment from './component/Payment/Payment';
import ViewFood from './component/Supplier/ViewFood';
import Profile from './component/Profile/Profile';
import Contact from './component/Contact/Contact';



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
              <Cart/>
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/add" element={<AddFood />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/viewfood" element={<ViewFood />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
       
        {UserService.adminOnly() && (
          <>
            <Route path="/user" element={<UserManagement />} />
           
          </>
        
        )}
      </Routes>
    </Router>
  );
}
