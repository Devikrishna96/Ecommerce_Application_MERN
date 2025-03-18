const { register, login, logout, checkSeller, profileEdit, profileDeactivate, forgotPassword, resetPassword, getAllSellers, deleteSeller, approveSeller } = require('../../Controllers/sellerController')
const authAdmin = require('../../Middlewares/authAdmin')
const authSeller = require('../../Middlewares/authSeller')
const upload = require('../../Middlewares/multer')

const sellerRouter=require('express').Router()


sellerRouter.post('/register',register)
sellerRouter.post('/login',login)
sellerRouter.post('/logout',authSeller,logout)
sellerRouter.get('/checkseller',authSeller,checkSeller)

sellerRouter.patch('/profileEdit',authSeller,upload.single("profilepic"),profileEdit)
sellerRouter.delete('/deactivate',authSeller,profileDeactivate)
sellerRouter.post('/forgot-password',forgotPassword)
sellerRouter.post('/reset-password',resetPassword)

sellerRouter.get("/view-sellers", authAdmin, getAllSellers);
sellerRouter.delete("/seller-delete/:sellerId", authAdmin, deleteSeller);
sellerRouter.patch("/seller-approve/:sellerId", authAdmin, approveSeller);

module.exports= sellerRouter

