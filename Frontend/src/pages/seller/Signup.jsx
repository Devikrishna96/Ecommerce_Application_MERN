import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sellerSignUp } from '../../services/sellerServices'

export const Signup = () => {
  const [values,setValues]=useState({
    name : '',
    email : '',
    phone : '',
    password : '',
    confirmpassword : ''

  })
  const navigate= useNavigate()
  const onSubmit=()=>{
    sellerSignUp(values).then((res)=>{
      console.log(res);
      toast.success("Signup Successfull")
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnoAylPC22TBSegCndo7NcAtUeJx9oE6H0w&s"
                  alt="Shopping Login"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
    
              {/* Right Section - Login Form */}
              <div className="w-1/2 p-10 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
                <p className="text-gray-600 mb-6">Enter your details below</p>
                
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="email" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
                /> 
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="name" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="phone" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
                />
                
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="password" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
                />
                <input
                  type="password"
                  placeholder="ConfirmPassword"
                  className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="confirmpassword" required onChange={(e)=>{setValues({...values,[e.target.name]:e.target.value})}}
                />
    
                <div className="flex justify-between items-center mb-6">
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600" onClick={onSubmit}>
                    Sign Up
                  </button>
                  
                  
                </div>
                <Link to={"/login"} className="text-blue-500 hover:underline">
                   Already have an account? Login 
                  </Link>
              </div>
            </div>
          </div>
        </div>
  )
}
