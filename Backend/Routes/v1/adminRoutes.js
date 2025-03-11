const { register,login, logout, changeUserRole, approveSeller, deleteSeller, deleteUser, getAllSellers, getAllUsers, resetPassword, forgotPassword, profileView, checkAdmin } = require('../../Controllers/adminController')
const authAdmin = require('../../Middlewares/authAdmin')

const adminRouter=require('express').Router()


adminRouter.post('/register',register)
adminRouter.post('/login',login)
adminRouter.get('/logout',authAdmin,logout)

adminRouter.get("/profile", authAdmin, profileView);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/reset-password", resetPassword);

adminRouter.get("/view-users", authAdmin, getAllUsers);
adminRouter.get("/view-sellers", authAdmin, getAllSellers);
adminRouter.delete("/user-delete/:userId", authAdmin, deleteUser);
adminRouter.delete("/seller-delete/:sellerId", authAdmin, deleteSeller);
adminRouter.patch("/seller-approve/:sellerId", authAdmin, approveSeller);
adminRouter.patch("/user-role", authAdmin, changeUserRole);
adminRouter.get("/checkadmin", authAdmin, checkAdmin);


module.exports= adminRouter
