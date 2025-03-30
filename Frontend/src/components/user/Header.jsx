import React from "react";
import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

const Header = () => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">ShopEase</Link>
        </div>

        {/* Nav Links (Hidden on Small Screens) */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link className="hover:text-primary" to="home">Home</Link>
          <Link className="hover:text-primary" to="/product">Shop</Link>
          <Link className="hover:text-primary" to="/about">About</Link>
          <Link className="hover:text-primary" to="/contact">Contact</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-60"
          />
        </div>

         {/* Sign In / Sign Up Button */}
         <div>
          <DarkMode/>
          <Link to="/login" className="btn btn-primary">Sign In / Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="btn btn-ghost text-lg">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
