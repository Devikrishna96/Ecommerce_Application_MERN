import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminLogin } from '../../services/adminServices'
import { useDispatch } from 'react-redux';
import { saveUser } from '../../redux/features/userSlice';

export const AdminLogin = () => {
  const [values,setValues]=useState({
    email : '',
    password : '',

  })
  const navigate= useNavigate()
  const dispatch=useDispatch()
  const onSubmit=()=>{
    adminLogin(values).then((res)=>{
      console.log(res);
      toast.success("Login Successfull")
      dispatch(saveUser(res.data.adminExist))
      navigate("/home")
    })
    .catch(err =>{
      console.log(err);
      toast.error(err.response.data.err,{position :'top-center'})
    })
  }
  return (
    <div>
      <div className="flex  items-center justify-center bg-gray-100">
        <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Section - Image */}
          <div className="w-1/2 bg-blue-100 flex items-center justify-center p-6">
            <img
              src="data:image/jpeg;base64,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"
              alt="Shopping Login"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Log in to Exclusive</h2>
            <p className="text-gray-600 mb-6">Enter your details below</p>
            
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="email" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="password" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
            />

            <div className="flex justify-between items-center mb-6">
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600" onClick={onSubmit}>
                Log in
              </button>
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
              
            </div>
            <Link to="/signup" className="text-blue-500 hover:underline">
                Don't have an account? Sign up
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
