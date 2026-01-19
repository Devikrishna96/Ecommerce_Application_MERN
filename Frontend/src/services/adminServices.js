import { axiosInstance } from "../config/axiosInstance";

// Admin login
export const adminLogin = (data) =>
  axiosInstance.post("/admin/login", data);

// Users
export const getAllUsers = () =>
  axiosInstance.get("/admin/all-users");

// Orders
export const getAllOrders = () =>
  axiosInstance.get("/admin/all-orders");

// Sellers
export const getAllSellers = () =>
  axiosInstance.get("/admin/all-sellers");

// Only pending sellers (not approved)
export const getPendingSellers = async () => {
  const res = await axiosInstance.get("/admin/sellers");
  // filter in service to return only pending sellers
  return { data: { data: res.data.data.filter(s => !s.isApproved) } };
};

// Verify seller
export const verifySeller = (sellerId) =>
  axiosInstance.put(`/admin/verify-seller/${sellerId}`);

export const getDashboardStats = () =>
  axiosInstance.get("/admin/dashboard-stats");


export const getAllProductsAdmin = () =>
  axiosInstance.get("/product/admin/all-products");

export const approveProductAdmin = (productId) =>
  axiosInstance.put(`/product/approve/${productId}`);

export const deleteProductAdmin = (productId) =>
  axiosInstance.delete(`/product/delete/${productId}`);

export const adminLogoutService = () =>
  axiosInstance.post("/admin/logout");
