import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";
import DarkMode from '../shared/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/features/userSlice';
import { persistor } from '../../redux/store';
import { adminLogout } from '../../services/adminServices';

export const AdminHeader = () => {
  const adminData=useSelector((state)=>state.admin)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=()=>{
    try {
      adminLogout().then((res)=>{
        persistor.purge()
        dispatch(clearUser())
        navigate("/home")
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
         <header className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">ShopEase</Link>
        </div>

        {/* Nav Links (Hidden on Small Screens) */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link className="hover:text-primary" to="/home">Home</Link>
          <Link className="hover:text-primary" to="/product">Products</Link>
          <Link className="hover:text-primary" to="/about">About</Link>
          <Link className="hover:text-primary" to="/contact">Contact</Link>
        </div>

        {/* Search Bar */}
        {/* <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-60"
          />
        </div> */}

        {/* Cart & User Icons */}
        <div className="flex gap-4">
        <DarkMode/>
        
        {adminData.admin && Object.keys(adminData.admin).length >0 ? <div className='flex items-center space-x-4'>
                  {/* <Link className="hover:text-primary" to="/order/admin-specific">My Orders</Link> */}

          <Link to="/wishlist" className="btn btn-ghost">
              <Heart size={24} className="text-red-500" /> {/* Wishlist icon */}
            </Link>
        <Link to="/cart" className="btn btn-ghost">
            <ShoppingCart size={24} />
          </Link>
          <span>{adminData.admin.name}</span>

          <button className='btn' onClick={handleLogout}>Logout</button>
          </div> : 
          // <Link to="/profile" className="btn btn-ghost">
          //   <User size={24} />
          // </Link>
                    <Link to="/login" className="btn btn-primary">Sign In / Sign Up</Link>
          
           }
          
          
        </div>

        {/* Mobile Menu Button */}
        {/* <div className="md:hidden">
          <button className="btn btn-ghost text-lg">☰</button>
        </div> */}
      </div>
    </header>
    </div>
  )
}
