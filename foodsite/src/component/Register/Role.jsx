import React from 'react';
import { Link } from 'react-router-dom';

const Role = () => {
  const selectRole = (role) => {
    alert(`You selected: ${role}`);
  };

  const addNewRole = () => {
    alert("You selected: Add a new role!");
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-cyan-400 h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl font-bold text-center drop-shadow-md">Select Your Role</h1>
      <div className="grid grid-cols-3 gap-6 mt-10">

        <div
          className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={() => selectRole('Supplier')}
        >
          <div className="text-5xl text-gray-600 mb-4">🛒</div>
          <div className="text-lg font-semibold text-gray-800 uppercase">Supplier</div>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={() => selectRole('Manager')}
        >
          <div className="text-5xl text-gray-600 mb-4">👔</div>
          <div className="text-lg font-semibold text-gray-800 uppercase">Manager</div>
        </div>

       <Link to={"/user"}> <div
          className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={() => selectRole('Admin')}
        >
          <div className="text-5xl text-gray-600 mb-4">⚙️</div>
          <div className="text-lg font-semibold text-gray-800 uppercase">Admin</div>
        </div>
        </Link>
        <div
          className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={() => selectRole('Employee')}
        >
          <div className="text-5xl text-gray-600 mb-4">👷</div>
          <div className="text-lg font-semibold text-gray-800 uppercase">Employee</div>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={() => selectRole('Customer')}
        >
          <div className="text-5xl text-gray-600 mb-4">🛍️</div>
          <div className="text-lg font-semibold text-gray-800 uppercase">Customer</div>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg text-center p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={addNewRole}
        >
          <div className="text-5xl text-gray-600 mb-4">➕</div>
          <div className="text-lg font-semibold text-gray-800 uppercase">Add Role</div>
        </div>

      </div>
      <footer className="mt-10 text-center text-white text-sm drop-shadow-md">
        &copy; 2025 Your Company | All rights reserved.
      </footer>
    </div>
  );
};

export default Role;
