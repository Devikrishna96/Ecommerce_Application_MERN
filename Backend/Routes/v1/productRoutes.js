const { createProduct, listProduct, productDetails, updateProduct, deleteProduct, approveProduct } = require('../../Controllers/productController')
const authAdmin = require('../../Middlewares/authAdmin')
const authSeller = require('../../Middlewares/authSeller')
const upload = require('../../Middlewares/multer')

const productRouter=require('express').Router()



productRouter.post("/create",authSeller,upload.single("image"),createProduct)
productRouter.get("/listproduct",listProduct)
productRouter.get("/productDetails/:productId",productDetails)
productRouter.put("/update/:productId",authSeller,upload.single("image"),updateProduct)
productRouter.delete("/delete/:productId",authAdmin,deleteProduct)
productRouter.put('/approve/:productId/', authAdmin, approveProduct);

module.exports= productRouter