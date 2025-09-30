import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Role = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch the user's role from localStorage
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      navigate('/login'); // If not logged in, redirect to login page
    }
    setUserRole(role);
  }, [navigate]);

  const selectRole = (role) => {
    if (role === userRole) {
      alert(`You selected: ${role}`);
      // Redirect to the corresponding dashboard
      navigate(`/${role.toLowerCase()}-dashboard`);
    } else {
      alert(`You are not authorized to select the ${role} role.`);
    }
  };

  const addNewRole = () => {
    alert('You selected: Add a new role!');
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-cyan-400 h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl font-bold text-center drop-shadow-md">Select Your Role</h1>
      <div className="gap-6 mt-10 ">

        {/* Supplier Role */}
        {userRole === 'SUPPLIER' && (
          <Link to={"/supplier"}>
          <div
            className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            onClick={() => selectRole('SUPPLIER')}
          >
            <div className="text-5xl text-gray-600 mb-4">🛒</div>
            <div className="text-lg font-semibold text-gray-800 uppercase">Supplier</div>
          </div>
          </Link>
        )}

        {/* Admin Role */}
        {userRole === 'ADMIN' && (
          <Link to="/admin">
            <div
              className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              onClick={() => selectRole('ADMIN')}
            >
              <div className="text-5xl text-gray-600 mb-4">⚙️</div>
              <div className="text-lg font-semibold text-gray-800 uppercase">Admin</div>
            </div>
          </Link>
        )}

         {/* Admin Role */}
         {userRole === 'MANAGER' && (
          <Link to="/admin">
            <div
              className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              onClick={() => selectRole('ADMIN')}
            >
              <div className="text-5xl text-gray-600 mb-4">👔</div>
              <div className="text-lg font-semibold text-gray-800 uppercase">Manager</div>
            </div>
          </Link>
        )}

         {/* Admin Role */}
         {userRole === 'EMPLOYEE' && (
          <Link to="/employee">
            <div
              className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              onClick={() => selectRole('ADMIN')}
            >
              <div className="text-5xl text-gray-600 mb-4">👔</div>
              <div className="text-lg font-semibold text-gray-800 uppercase">Manager</div>
            </div>
          </Link>
        )}

      </div>
      <footer className="mt-10 text-center text-white text-sm drop-shadow-md">
        &copy; 2025 Your Company | All rights reserved.
      </footer>
    </div>
  );
};

export default Role;
