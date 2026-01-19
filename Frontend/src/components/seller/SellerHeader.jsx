import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import DarkMode from '../shared/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../redux/store';
import { sellerLogout, saveSeller } from '../../redux/features/sellerSlice';
import { sellerLogout as sellerLogoutAPI } from '../../services/sellerServices';

export const SellerHeader = () => {
  const sellerData = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await sellerLogoutAPI();
      persistor.purge();
      dispatch(sellerLogout());
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/seller/home" className="text-2xl font-bold text-blue-400">
          Seller Panel
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-6 text-lg">
          <Link to="/seller/home" className="hover:text-blue-300">Home</Link>
          <Link to="/seller/products" className="hover:text-blue-300">Products</Link>
          <Link to="/seller/profile" className="hover:text-blue-300">Profile</Link>
        </nav>

        <div className="flex items-center gap-4">
          <DarkMode />
          {sellerData.isSellerAuth ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold">{sellerData.seller?.name || "Seller"}</span>
              <button onClick={handleLogout} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/seller/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
