import { axiosInstance } from "../config/axiosInstance"



export const adminSignUp=(data)=>{
    return axiosInstance.post('/admin/register',data)
}
export const adminLogin=(data)=>{
    return axiosInstance.post('/admin/login',data)
}
export const adminLogout=()=>{
    return axiosInstance.post('/admin/logout')
}
