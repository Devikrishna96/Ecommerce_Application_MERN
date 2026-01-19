import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../shared/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/features/adminSlice";
import { persistor } from "../../redux/store";
import { adminLogoutService } from "../../services/adminServices";


export const AdminHeader = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await adminLogoutService();   
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    persistor.purge();            
    dispatch(adminLogout());      
    navigate("/home");    
  }
};


  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/admin/dashboard" className="text-2xl font-bold text-blue-400">
          Admin Panel
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-6 text-lg">
          <Link to="/admin/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/admin/users" className="hover:text-blue-300">Users</Link>
          <Link to="/admin/products" className="hover:text-blue-300">Products</Link>
          <Link to="/admin/orders" className="hover:text-blue-300">Orders</Link>
          <Link to="/admin/settings" className="hover:text-blue-300">Settings</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <DarkMode />

          {admin.isAdminAuth ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold">
                {admin.adminInfo?.name || "Admin"}
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/home"
              className="btn btn-primary btn-sm"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
