import React, { useEffect } from 'react'
import { clearCartItems } from '../../services/userServices';

export const OrderSuccess = () => {
    useEffect(()=>{
        clearCartItems().then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div>
    <p>ORDER PLACED SUCCESFULLY</p>
    <button className='btn bg-blue-600'>View Details</button>
    </div>
  )
}
