const { register, login, logout, profileView, profileEdit, profileDeactivate, forgotPassword, resetPassword, updateAddress, checkUser, getAllUsers, deleteUser } = require('../../Controllers/userController')
const authAdmin = require('../../Middlewares/authAdmin')
const authUser = require('../../Middlewares/authUser')
const upload = require('../../Middlewares/multer')

const userRouter=require('express').Router()


userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',authUser,logout)
userRouter.get('/profile',authUser,profileView)
userRouter.put('/profileEdit',authUser,upload.single("profilePic"),profileEdit)
userRouter.delete('/deactivate',authUser,profileDeactivate)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/reset-password',resetPassword)
userRouter.patch('/address-update',authUser,updateAddress)
userRouter.get('/checkuser',authUser,checkUser)
userRouter.get("/view-users", authAdmin, getAllUsers);
userRouter.delete("/user-delete/:userId", authAdmin, deleteUser);




module.exports= userRouter

