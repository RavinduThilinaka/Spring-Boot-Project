import axios from 'axios';
import React, { useState } from 'react'
import UserService from '../Register/UserService';

function ViewFood() {

    const [food,setFood] = useState({
        foodName:"",
        foodPrice:"",
        foodQuantity:"",
        availabilityStatus:"",
        imagePreview:"",
    })

    const [imagePreview,setImagePreview] = useState([]);
    const [imageUrls,setImageUrls] = useState([])

    const fatchImages = async () =>{
        try {
            const response = await axios.get( `${UserService.BASE_URL}/supplier/addsupplier`)
        } catch (error) {
            
        }
    }
  return (
    <div>ViewFood</div>
  )
}

export default ViewFood