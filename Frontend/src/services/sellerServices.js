import { axiosInstance } from "../config/axiosInstance"



export const sellerSignUp=(data)=>{
    return axiosInstance.post('/seller/register',data)
}
export const sellerLogin=(data)=>{
    return axiosInstance.post('/seler/login',data)
}
export const sellerLogout=()=>{
    return axiosInstance.post('/seller/logout')
}
