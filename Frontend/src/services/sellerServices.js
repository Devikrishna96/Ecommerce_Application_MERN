import { axiosInstance } from "../config/axiosInstance";

// Auth
export const sellerSignUp = (data) => {
  return axiosInstance.post("/seller/register", data);
};

export const sellerLogin = (data) => {
  return axiosInstance.post("/seller/login", data);
};

export const sellerLogout = () => {
  return axiosInstance.post("/seller/logout");
};

// Profile
export const getSellerProfile = () => {
  return axiosInstance.get("/seller/profile");
};

export const editSellerProfile = (formData) => {
  return axiosInstance.patch("/seller/profileEdit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Products
export const createProduct = (formData) => {
  return axiosInstance.post("/seller/product/create", formData);
};

export const updateProduct = (productId, formData) => {
  return axiosInstance.put(`/seller/product/update/${productId}`, formData);
};

export const deleteProduct = (productId) => {
  return axiosInstance.delete(`/seller/product/delete/${productId}`);
};
export const listSellerProducts = () => {
  return axiosInstance.get("/seller/product/my-products");
};
