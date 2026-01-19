// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const state = useSelector((state) => state[role]);

  if (!state?.isUserAuth && role === "user") return <Navigate to="/login" />;
  if (!state?.isSellerAuth && role === "seller") return <Navigate to="/seller/login" />;
  if (!state?.isAdminAuth && role === "admin") return <Navigate to="/admin/login" />;

  return children;
};

export default ProtectedRoute;
