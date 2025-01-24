import React, { useEffect, useState } from "react";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import UserService from "../Register/UserService";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

 

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login")
  }

  const fetchUsers = async () => {
     try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllUsers(token)

      setUsers(response.ourUsersList);
     } catch (error) {
      
      console.error('Error fetching users:',error);
     }
  }

  const deleteUser = async (userId) => {
      try {
          const confirmDelete = window.confirm('are you sure to delete this user');
          const token = localStorage.getItem('token');

          if(confirmDelete){
              await UserService.deleteUser(userId,token);
              fetchUsers();
          }
      } catch (error) {
          console.error('error delete user:',error)
      }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-green-500 to-green-600 text-white transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } shadow-lg rounded-r-xl`}
      >
        <ul className="mt-10 space-y-5">
          {/* Logo and Brand */}
          <li className="flex items-center justify-center">
            <span className="text-3xl">
              <ion-icon name="logo-apple"></ion-icon>
            </span>
            {/* When collapsed, shift logo left */}
            <div className={`ml-2 ${!isSidebarCollapsed ? "block" : "hidden"}`}>
              <span className="text-xl font-semibold">Food</span>
            </div>
          </li>

          {/* Sidebar Links */}
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-green-800 rounded-lg transition duration-200"
            >
              <ion-icon name="home-outline" className="text-2xl"></ion-icon>
              {!isSidebarCollapsed && <span className="ml-4">Dashboard</span>}
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-green-800 rounded-lg transition duration-200"
            >
              <ion-icon name="people-outline" className="text-2xl"></ion-icon>
              {!isSidebarCollapsed && <span className="ml-4">Customer</span>}
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-green-800 rounded-lg transition duration-200"
            >
              <ion-icon
                name="chatbubble-outline"
                className="text-2xl"
              ></ion-icon>
              {!isSidebarCollapsed && <span className="ml-4">Message</span>}
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-green-800 rounded-lg transition duration-200"
            >
              <ion-icon name="settings-outline" className="text-2xl"></ion-icon>
              {!isSidebarCollapsed && <span className="ml-4">Settings</span>}
            </a>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 hover:bg-green-800 rounded-lg transition duration-200 w-full"
            >
              <ion-icon name="log-out-outline" className="text-2xl"></ion-icon>
              {!isSidebarCollapsed && <span className="ml-4">Sign-out</span>}
            </button>
          </li>
          
        </ul>
      </nav>

      {/* Main Content */}
      <main
        className={`ml-20 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } flex-grow p-6 bg-gray-100`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-2xl text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <ion-icon name="menu-outline"></ion-icon>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <ion-icon
              name="search-outline"
              className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
            ></ion-icon>
          </div>
          <img
            src="profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <div className="text-2xl font-bold">12340</div>
            <div className="text-sm text-gray-500">Daily Views</div>
            <div className="mt-4 text-gray-400 text-4xl">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <div className="text-2xl font-bold">12340</div>
            <div className="text-sm text-gray-500">Sales</div>
            <div className="mt-4 text-gray-400 text-4xl">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <div className="text-2xl font-bold">12340</div>
            <div className="text-sm text-gray-500">Comments</div>
            <div className="mt-4 text-gray-400 text-4xl">
              <ion-icon name="chatbubble-outline"></ion-icon>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <div className="text-2xl font-bold">12340</div>
            <div className="text-sm text-gray-500">Cash</div>
            <div className="mt-4 text-gray-400 text-4xl">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="userManagement-container p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 text-center">User Management</h2>
            <table className="table-auto w-full mt-6">
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user.id} className="hover:bg-gray-200 text-center">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.gender}</td>
                                <td className="px-4 py-2">{user.age}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">
                                    <button className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600" >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="bg-blue-500 text-white px-3 py-2 rounded ml-2 hover:bg-blue-600">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-2 rounded ml-2 hover:bg-red-600" onClick={()=>deleteUser(user.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </main>
    </div>
  );
}

export default Admin;
