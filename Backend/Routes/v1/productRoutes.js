const { createProduct, listProduct, productDetails, updateProduct, deleteProduct } = require('../../Controllers/productController')
const authAdmin = require('../../Middlewares/authAdmin')
const upload = require('../../Middlewares/multer')

const productRouter=require('express').Router()



productRouter.post("/create",authAdmin,upload.single("image"),createProduct)
productRouter.get("/listproduct",listProduct)
productRouter.get("/productDetails/:productId",productDetails)
productRouter.put("/update/:productId",authAdmin,upload.single("image"),updateProduct)
productRouter.delete("/delete/:productId",deleteProduct)

module.exports= productRouter