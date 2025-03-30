import { axiosInstance } from "../config/axiosInstance"


export const listProducts=()=>{
 return  axiosInstance.get('/product/listproduct')
}
export const userSignUp=(data)=>{
    return axiosInstance.post('/user/register',data)
}
export const userLogin=(data)=>{
    return axiosInstance.post('/user/login',data)
}
export const userLogout=()=>{
    return axiosInstance.post('/user/logout')
}
export const userCart = (productId, quantity) => {
    return axiosInstance.post("/cart/add", {productId, quantity });
  };
  export const getCartItems = () => {
    return axiosInstance.get("/cart/");
  };
  export const removeCartItems = (productId) => {
    return axiosInstance.delete(`/cart/remove/${productId}`);
  };
  export const makePaymentOnStripe = (body) => {
    return axiosInstance.post('/payment/',body) ;
  };
  export const clearCartItems = () => {
    return axiosInstance.delete('/cart/clear') ;
  };
  export const userWishlist = (productId) => {
    return axiosInstance.post("/wishlist/add", { productId});
  };
  export const getUserWishlist = () => {
    return axiosInstance.get("/wishlist/user-wishlist");
  };
 
  export const removeFromWishlist = (productId) => {
    return axiosInstance.delete(`/wishlist/remove/${productId}`);
  };
  export const  getUserOrders= () => {
    return axiosInstance.get("/order/user-specific");
  };