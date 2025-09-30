import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import UserService from "../Register/UserService";
import { useParams } from "react-router-dom";

export default function SupplierList() {
  const [food, setFood] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    loadFood();
  })

  const loadFood = async () => {

    const result = await axios.get(`${UserService.BASE_URL}/supplier/getSupply`)
    setFood(result.data)
    
}

 

  const deleteFood = async (id) => {
    await axios.delete(`${UserService.BASE_URL}/supplier/deleteSupply/${id}`)
    loadFood();
    
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Food Suppliers</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Food Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Availability</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {food.map((food) => (
            <tr key={food.id} className="text-center border">
              <td className="border p-2">{food.id}</td>
              <td className="border p-2">{food.foodName}</td>
              <td className="border p-2">{food.foodPrice}</td>
              <td className="border p-2">{food.availabilityStatus}</td>
              <td className="border p-2">{food.foodQuantity}</td>
              <td className="border p-2">
                {food.foodImage && (
                  <img 
                    src={`data:image/jpeg;base64,${food.foodImage}`} 
                    alt={food.foodName} 
                    className="w-16 h-16 object-cover mx-auto" 
                  />
                )}
              </td>
              <td className="border p-2">
                <div className="flex justify-center space-x-2">
                  <button className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full border-0">
                    <FaEye />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-yellow-100 text-yellow-500 rounded-full border-0">
                    <FaEdit />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-full border-0" onClick={()=>deleteFood(food.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
