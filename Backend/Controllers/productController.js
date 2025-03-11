const upload = require("../Middlewares/multer")
const productModel = require("../Models/productModel")
const uploadToCloudnary = require("../Utilities/imageUpload")

const createProduct=async (req,res)=>{
    try{
        const{title,description,price}=req.body
        if(! title || !description || !price)
        {
            return res.status(400).json({message:"All fields are required"})
        }
        if(! req.file)
            {
                return res.status(400).json({message:"Image not found"})
            }
 const cloudnaryRes=await uploadToCloudnary(req.file.path)
console.log(cloudnaryRes,"Image path uploaded by clodnary")
//mentor id to be add
const newProduct= new productModel({
    title,description,price,image:cloudnaryRes
})
 
let savedProduct= await newProduct.save()
if(savedProduct){
    return res.status(201).json({message:"Product created successfully",savedProduct})
}
    }
    catch(err)
    {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const listProduct= async (req,res)=>{
    try {
        const productList=await productModel.find();
        res.status(200).json(productList)
    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const productDetails= async (req,res)=>{
    try {
        const {productId}=req.params
        const productDetails=await productModel.findById({_id:productId});
        if(!productDetails){
            return res.status(400).json({error:"Product not found"})
        }
        res.status(200).json(productDetails)
        
    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {productId}=req.params
        const {title,description,price}=req.body
        let imageUrl;
        let isProductExist=await productModel.findById(productId)
        if(!isProductExist){
            return res.status(400).json({error:"Product not found"})
        }
        if(req.file){
            const cloudnaryRes=await uploadToCloudnary(req.file.path)
            imageUrl=cloudnaryRes
        }
const updatedProduct= await productModel.findByIdAndUpdate(productId,{title,description,price,image:imageUrl},{new:true})
res.status(200).json({message :"Product Updated",updatedProduct})

    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const deleteProduct=async (req,res)=>{
    try {
        const {productId}=req.params
        const deleteProduct= await productModel.findByIdAndDelete(productId)
        if(!deleteProduct)
        {
            return res.status(400).json({error:"Product not found"})

        }
        res.status(200).json({message:"Product Deleted"})
    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
  
    }
}
module.exports={createProduct,listProduct,productDetails,updateProduct,deleteProduct}