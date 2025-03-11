const { register, login, logout, profileView, profileEdit, profileDeactivate, forgotPassword, resetPassword, updateAddress, checkUser } = require('../../Controllers/userController')
const authUser = require('../../Middlewares/authUser')
const upload = require('../../Middlewares/multer')

const userRouter=require('express').Router()


userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/logout',authUser,logout)
userRouter.get('/profile',authUser,profileView)
userRouter.post('/profileEdit',authUser,upload.single("profilepic"),profileEdit)
userRouter.post('/deactivate',authUser,profileDeactivate)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/reset-password',resetPassword)
userRouter.post('/address-update',authUser,updateAddress)
userRouter.get('/checkuser',authUser,checkUser)


module.exports= userRouter

