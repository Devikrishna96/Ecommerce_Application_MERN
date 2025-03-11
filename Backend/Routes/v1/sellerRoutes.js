const { register, login, logout, checkSeller } = require('../../Controllers/sellerController')
const authSeller = require('../../Middlewares/authSeller')

const sellerRouter=require('express').Router()


sellerRouter.post('/register',register)
sellerRouter.post('/login',login)
sellerRouter.get('/logout',authSeller,logout)
sellerRouter.get('/checkseller',authSeller,checkSeller)


module.exports= sellerRouter

