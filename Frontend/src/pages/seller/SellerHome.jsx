import React from 'react';
import { Link } from 'react-router-dom';

export const SellerHome = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/seller/products" className="card p-6 bg-blue-100 rounded-lg hover:bg-blue-200">Manage Products</Link>
        <Link to="/seller/profile" className="card p-6 bg-green-100 rounded-lg hover:bg-green-200">Profile</Link>
        <Link to="/seller/pending-products" className="card p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200">Pending Approvals</Link>
      </div>
    </div>
  );
};
