import React, { useEffect, useState } from "react";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import UserService from "../Register/UserService";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : null;

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }
      
      console.log("Fetching users from database...");
      const response = await UserService.getAllUsers(token);
      
      console.log("Database Response:", response);
      
      // Handle different response structures - ONLY REAL DATA
      let usersList = [];
      
      if (Array.isArray(response)) {
        // Direct array response
        usersList = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        // Response with data property
        usersList = response.data;
      } else if (response && response.ourUsersList && Array.isArray(response.ourUsersList)) {
        // Response with ourUsersList property
        usersList = response.ourUsersList;
      } else if (response && response.users && Array.isArray(response.users)) {
        // Response with users property
        usersList = response.users;
      } else if (response && typeof response === 'object') {
        // Try to extract array from object
        const values = Object.values(response);
        if (values.length > 0 && Array.isArray(values[0])) {
          usersList = values[0];
        } else {
          // Check if any value looks like a user object
          usersList = values.filter(item => 
            item && typeof item === 'object' && (item.id || item.email || item.name)
          );
        }
      }
      
      if (!Array.isArray(usersList)) {
        console.error("Invalid response format - not an array:", response);
        throw new Error("Server returned invalid data format. Expected an array of users.");
      }
      
      if (usersList.length === 0) {
        console.log("Database returned empty user list");
        // This is okay - just means no users in database yet
      }
      
      console.log("Loaded users from database:", usersList.length);
      setUsers(usersList);
      
    } catch (error) {
      console.error('Error fetching users from database:', error);
      setError(`Failed to load users: ${error.message}`);
      setUsers([]); // Clear users on error
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
      
      if (confirmDelete) {
        setLoading(true);
        console.log("Deleting user from database with ID:", userId);
        
        const response = await UserService.deleteUser(userId, token);
        console.log("Delete response from server:", response);
        
        // Check for success indicators
        const isSuccess = response && (
          response.success === true || 
          response.message?.toLowerCase().includes('success') ||
          response.status === 200 ||
          response.status === 204 ||
          response.deleted === true
        );
        
        if (isSuccess) {
          // Remove user from local state
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          alert('User deleted successfully from database!');
        } else {
          throw new Error(response?.message || "Delete operation failed on server");
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(`Failed to delete user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (userId) => {
    navigate(`/view/${userId}`);
  };

  const handleEditUser = (userId) => {
    navigate(`/edit/${userId}`);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    
    const name = user.name || "";
    const email = user.email || "";
    const role = user.role || "";
    const gender = user.gender || "";
    
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           gender.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate statistics from REAL database data
  const totalUsers = users.length;
  const adminUsers = users.filter(user => user && user.role === 'admin').length;
  const userRoleCount = users.filter(user => user && user.role === 'user').length;
  const averageAge = users.length > 0 
    ? (users.reduce((sum, user) => sum + (parseInt(user.age) || 0), 0) / users.length).toFixed(1)
    : 0;

  // Get recent users (last 5)
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Orange Gradient Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white transition-all duration-300 z-50 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } shadow-2xl`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-orange-400/30">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <ion-icon name="shield-checkmark" className="text-2xl text-orange-600"></ion-icon>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold tracking-tight">AdminPro</h1>
                <p className="text-xs text-orange-100">Real Database Data</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 mt-2">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group w-full text-left"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20">
                  <ion-icon name="grid-outline" className="text-xl"></ion-icon>
                </div>
                {!isSidebarCollapsed && (
                  <span className="ml-4 font-medium">Dashboard</span>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={fetchUsers}
                className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group w-full text-left"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20">
                  <ion-icon name="refresh-outline" className="text-xl"></ion-icon>
                </div>
                {!isSidebarCollapsed && (
                  <span className="ml-4 font-medium">Refresh Data</span>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/create-user")}
                className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group w-full text-left"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20">
                  <ion-icon name="add-outline" className="text-xl"></ion-icon>
                </div>
                {!isSidebarCollapsed && (
                  <span className="ml-4 font-medium">Add User</span>
                )}
              </button>
            </li>

            <li className="pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group w-full text-left"
              >
                <div className="bg-red-500/20 p-2 rounded-lg group-hover:bg-red-500/30">
                  <ion-icon name="log-out-outline" className="text-xl text-red-300"></ion-icon>
                </div>
                {!isSidebarCollapsed && (
                  <span className="ml-4 font-medium text-red-300">Logout</span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Database Status */}
        {!isSidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-400/30">
            <div className="text-center text-sm text-orange-200">
              <p>Connected to Database</p>
              <p className="text-xs mt-1">{users.length} users loaded</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } p-6`}
      >
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ion-icon name="warning-outline" className="text-red-500 text-xl mr-2"></ion-icon>
                <div>
                  <p className="text-red-700 font-medium">Database Error</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button 
                onClick={fetchUsers} 
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <ion-icon name="menu-outline" className="text-2xl"></ion-icon>
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search in database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-96 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
              />
              <ion-icon
                name="search-outline"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
              ></ion-icon>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{userName}</p>
              <p className="text-sm text-gray-500 capitalize">{userRole} • Database Admin</p>
            </div>
            <Link to="/profile" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                  {firstLetter}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600">Loading data from database...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we fetch real user data</p>
          </div>
        )}

        {/* Main Content when not loading */}
        {!loading && (
          <>
            {/* Stats Cards - Real Database Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Users Card */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Database Users</p>
                    <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                    <p className="text-orange-100 text-sm mt-1">Real data from DB</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <ion-icon name="server-outline" className="text-2xl"></ion-icon>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-orange-200">Live database count</span>
                </div>
              </div>

              {/* Admin Users Card */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-amber-100 text-sm font-medium">Administrators</p>
                    <p className="text-3xl font-bold mt-2">{adminUsers}</p>
                    <p className="text-amber-100 text-sm mt-1">With admin role</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <ion-icon name="shield-checkmark" className="text-2xl"></ion-icon>
                  </div>
                </div>
              </div>

              {/* Regular Users Card */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Regular Users</p>
                    <p className="text-3xl font-bold mt-2">{userRoleCount}</p>
                    <p className="text-green-100 text-sm mt-1">Standard users</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <ion-icon name="people-outline" className="text-2xl"></ion-icon>
                  </div>
                </div>
              </div>

              {/* Average Age Card */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Average Age</p>
                    <p className="text-3xl font-bold mt-2">{averageAge}</p>
                    <p className="text-yellow-100 text-sm mt-1">Calculated from DB</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <ion-icon name="analytics-outline" className="text-2xl"></ion-icon>
                  </div>
                </div>
              </div>
            </div>

            {/* User Management Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="border-b border-gray-100 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Database User Management</h2>
                    <p className="text-gray-500 mt-1">
                      Managing {totalUsers} real users from database
                      {searchTerm && ` • Filtered: "${searchTerm}"`}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={fetchUsers}
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center"
                    >
                      <ion-icon name="refresh-outline" className="mr-2"></ion-icon>
                      Refresh from DB
                    </button>
                    <button 
                      onClick={() => navigate("/create-user")}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-200 flex items-center"
                    >
                      <ion-icon name="add-outline" className="mr-2"></ion-icon>
                      Add to Database
                    </button>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              {filteredUsers.length === 0 ? (
                <div className="p-12 text-center">
                  <ion-icon name="server-outline" className="text-6xl text-gray-300 mb-4"></ion-icon>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {users.length === 0 ? "Database is Empty" : "No Matching Users"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {users.length === 0 
                      ? "No users found in the database. Start by adding your first user." 
                      : `No users in database match "${searchTerm}"`}
                  </p>
                  <button 
                    onClick={() => navigate("/create-user")}
                    className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-medium"
                  >
                    <ion-icon name="add-outline" className="mr-2"></ion-icon>
                    Add First User to Database
                  </button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-gray-600">
                          <th className="py-4 px-6 font-semibold">Database ID</th>
                          <th className="py-4 px-6 font-semibold">User Details</th>
                          <th className="py-4 px-6 font-semibold">Contact Info</th>
                          <th className="py-4 px-6 font-semibold">Profile</th>
                          <th className="py-4 px-6 font-semibold">Database Role</th>
                          <th className="py-4 px-6 font-semibold text-right">Database Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-orange-50/30 transition-colors duration-200">
                            <td className="py-4 px-6">
                              <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="font-mono text-sm text-gray-700">ID: {user.id}</p>
                                {user.createdAt && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Created: {new Date(user.createdAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="ml-4">
                                  <p className="font-semibold text-gray-800">{user.name || "Unknown User"}</p>
                                  <p className="text-sm text-gray-500">Database Record</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-gray-700 font-medium">{user.email || "No email in DB"}</p>
                              {user.phone && (
                                <p className="text-sm text-gray-500 mt-1">{user.phone}</p>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <div className="space-y-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  user.gender?.toLowerCase() === 'male' 
                                    ? 'bg-blue-100 text-blue-800'
                                    : user.gender?.toLowerCase() === 'female'
                                    ? 'bg-pink-100 text-pink-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.gender || 'Not in DB'}
                                </span>
                                <p className="text-gray-700">Age: {user.age || 'Not set'}</p>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                user.role === 'admin'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {user.role || 'user'}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleViewUser(user.id)}
                                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
                                  title="View Database Record"
                                >
                                  <ion-icon name="eye-outline" className="mr-1"></ion-icon>
                                  <span className="text-sm font-medium">View</span>
                                </button>
                                <button
                                  onClick={() => handleEditUser(user.id)}
                                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
                                  title="Edit Database Record"
                                >
                                  <ion-icon name="create-outline" className="mr-1"></ion-icon>
                                  <span className="text-sm font-medium">Edit</span>
                                </button>
                                <button
                                  onClick={() => deleteUser(user.id)}
                                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
                                  title="Delete from Database"
                                  disabled={loading}
                                >
                                  <ion-icon name="trash-outline" className="mr-1"></ion-icon>
                                  <span className="text-sm font-medium">Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 font-medium">
                          Database Records: <span className="text-orange-600">{filteredUsers.length}</span> of <span className="text-orange-600">{users.length}</span>
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          All data is loaded directly from your database
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600 text-sm">
                          Last refresh: {new Date().toLocaleTimeString()}
                        </span>
                        <button 
                          onClick={fetchUsers}
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                          <ion-icon name="refresh-outline" className="mr-2"></ion-icon>
                          Sync Database
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Database Info Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
                <h3 className="text-lg font-semibold mb-4">Database Connection</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Status</span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span className="font-bold">Connected</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Records</span>
                    <span className="font-bold">{users.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Update</span>
                    <span className="font-bold">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Database Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Loaded {users.length} users from database</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Database connection established</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Ready for database operations</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Database Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={fetchUsers}
                    className="p-3 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ion-icon name="refresh-outline" className="text-xl mr-2"></ion-icon>
                    <span className="font-medium">Reload from Database</span>
                  </button>
                  <button 
                    onClick={() => navigate("/create-user")}
                    className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ion-icon name="add-outline" className="text-xl mr-2"></ion-icon>
                    <span className="font-medium">Insert New Record</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Admin;