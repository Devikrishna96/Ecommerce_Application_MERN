const { register, login, logout, checkSeller, profileEdit, profileDeactivate, forgotPassword, resetPassword, getAllSellers, deleteSeller, approveSeller,profileView } = require('../../Controllers/sellerController')
const { createProduct, updateProduct, deleteProduct,listSellerProducts } = require('../../Controllers/productController'); 

const authAdmin = require('../../Middlewares/authAdmin')
const authSeller = require('../../Middlewares/authSeller')
const upload = require('../../Middlewares/multer')

const sellerRouter=require('express').Router()


sellerRouter.post('/register',register)
sellerRouter.post('/login',login)
sellerRouter.post('/logout',authSeller,logout)
sellerRouter.get('/checkseller',authSeller,checkSeller)
sellerRouter.get('/profile', authSeller, profileView);
sellerRouter.patch('/profileEdit',authSeller,upload.single("profilepic"),profileEdit)
sellerRouter.delete('/deactivate',authSeller,profileDeactivate)
sellerRouter.post('/forgot-password',forgotPassword)
sellerRouter.post('/reset-password',resetPassword)

sellerRouter.get("/view-sellers", authAdmin, getAllSellers);
sellerRouter.delete("/seller-delete/:sellerId", authAdmin, deleteSeller);
sellerRouter.patch("/seller-approve/:sellerId", authAdmin, approveSeller);

sellerRouter.post('/product/create', authSeller, upload.single("image"), createProduct);
sellerRouter.put('/product/update/:productId', authSeller, upload.single("image"), updateProduct);
sellerRouter.delete('/product/delete/:productId', authSeller, deleteProduct);
sellerRouter.get('/product/my-products', authSeller, listSellerProducts);



module.exports= sellerRouter

