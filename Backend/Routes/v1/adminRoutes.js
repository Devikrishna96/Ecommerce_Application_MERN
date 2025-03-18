const { register,login, logout, resetPassword, forgotPassword, profileView, checkAdmin, getDashboardStats} = require('../../Controllers/adminController')
const authAdmin = require('../../Middlewares/authAdmin')

const adminRouter=require('express').Router()

//admin
adminRouter.post('/register',register)
adminRouter.post('/login',login)
adminRouter.post('/logout',authAdmin,logout)
adminRouter.get("/profile", authAdmin, profileView);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/reset-password", resetPassword);
adminRouter.get("/checkadmin", authAdmin, checkAdmin);
// Dashboard Stats
adminRouter.get('/dashboard-stats', authAdmin, getDashboardStats);

module.exports= adminRouter
