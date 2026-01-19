const { 
    register, login, logout, resetPassword, forgotPassword, profileView, 
    checkAdmin, getDashboardStats, 
    getAllUsers, getAllOrders, updateOrderStatus, verifySeller ,getAllSellers
} = require('../../Controllers/adminController');

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



adminRouter.get("/all-users", authAdmin, getAllUsers);
adminRouter.get("/all-orders", authAdmin, getAllOrders);
adminRouter.put("/update-order-status/:id", authAdmin, updateOrderStatus);
adminRouter.put("/verify-seller/:sellerId", authAdmin, verifySeller);
adminRouter.get("/all-sellers", authAdmin, getAllSellers);
module.exports= adminRouter
