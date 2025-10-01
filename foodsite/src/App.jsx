import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Navbar and Footer
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Navbar/Footer';

// Home Components
import Hero from './component/Hero/Hero';
import Services from './component/Services/Services';
import Banner from './component/Services/Banner';
import AppStore from './component/Services/AppStore';
import Comments from './component/Services/Comments';
import Cart from './component/Dishes/Cart';

// Auth & User Management
import Login from './component/Register/Login';
import SignUp from './component/Register/SignUp';
import Role from './component/Register/Role';
import UserService from './component/Register/UserService';
import UserManagement from './component/Register/UserManagement';
import EditUser from './component/Admin/EditUser';
import ViewProfile from './component/Admin/ViewProfile';

// Admin & Supplier
import Admin from './component/Admin/Admin';
import Supplier from './component/Supplier/Supplier';

// Food Management
import FoodList from './component/Dishes/FoodList';
import AddFood from './component/Supplier/AddFood';
import ViewFood from './component/Supplier/ViewFood';
import Payment from './component/Payment/Payment';

// Other Pages
import Profile from './component/Profile/Profile';
import Contact from './component/Contact/Contact';
import OrderSummary from './component/Dishes/OrderSummary';

function Layout() {
  const location = useLocation();

  // Hide navbar only on /foodlist page
  const showNavbar = location.pathname !== '/foodlist';

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
      disable: window.innerWidth < 768, // 👈 Disable AOS on mobile
    });
    AOS.refresh();
  }, []);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <div id="hero"><Hero /></div>
              <div id="cart"><Cart /></div>
              <div id="services"><Services /></div>
              <div id="banner"><Banner /></div>
              <div id="appstore"><AppStore /></div>
              <div id="comments"><Comments /></div>
              <div id="footer"><Footer /></div>
            </>
          }
        />

        {/* Auth & Role */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/role" element={<Role />} />

        {/* Admin & Supplier */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/supplier" element={<Supplier />} />

        {/* Food Management */}
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/add" element={<AddFood />} />
        <Route path="/viewfood" element={<ViewFood />} />
        <Route path="/payment" element={<Payment />} />

        {/* Profile & Contact */}
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-summary" element={<OrderSummary />} />

        {/* Admin-only routes */}
        {UserService.adminOnly() && (
          <>
            <Route path="/user" element={<UserManagement />} />
            <Route path="/edit/:userId" element={<EditUser />} />
            <Route path="/view/:userId" element={<ViewProfile />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Spring-Boot-Project">
      <Layout />
    </BrowserRouter>
  );
}
