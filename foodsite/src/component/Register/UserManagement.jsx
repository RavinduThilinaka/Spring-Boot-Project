import React, { useState,useEffect } from 'react'
import UserService from './UserService';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../Navbar/Navbar';



function UserManagement() {
    const [users,setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

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
    <>
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
        </>
  )
}

export default UserManagement;