const upload = require("../Middlewares/multer")
const Product = require("../Models/productModel")
const uploadToCloudnary = require("../Utilities/imageUpload")

const createProduct=async (req,res)=>{
    try{
        const{title,description,price,quantity}=req.body
        if(! title || !description || !price ||!quantity)
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
const newProduct= new Product({
    title,description,price,quantity,image:cloudnaryRes
})
 
let savedProduct= await newProduct.save()
if(savedProduct){
    return res.status(201).json({message:"Product created successfully",data :savedProduct})
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
        const productList=await Product.find({ isApprove: true });
        res.status(200).json({data :productList})
    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const productDetails= async (req,res)=>{
    try {
        const {productId}=req.params
        const productDetails=await Product.findById({_id:productId,isApprove :true});
        if(!productDetails){
            return res.status(400).json({error:"Product not found or not approved "})
        }
        res.status(200).json({data :productDetails})
        
    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {productId}=req.params
        const {title,description,price,quantity}=req.body
        if(! title && !description && !price && !quantity)
            {
                return res.status(400).json({message:"Atleast One field required"})
            }
        let imageUrl;
        let isProductExist=await Product.findById(productId)
        if(!isProductExist){
            return res.status(400).json({error:"Product not found"})
        }
        if (!isProductExist.isApprove) {
            return res.status(403).json({ error: "Product is not approved for updates" });
        }
        if(req.file){
            const cloudnaryRes=await uploadToCloudnary(req.file.path)
            imageUrl=cloudnaryRes
        }
const updatedProduct= await Product.findByIdAndUpdate(productId,{title,description,price,quantity,image:imageUrl},{new:true})
res.status(200).json({message :"Product Updated",data : updatedProduct})

    } catch (err) {
        console.log(err)
        res.status(err.status || 400).json({error:err.message || "Internal Server Error"})
    }
}

const deleteProduct=async (req,res)=>{
    try {
        const {productId}=req.params
        const deleteProduct= await Product.findByIdAndDelete(productId)
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

//approve product
const approveProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndUpdate(productId, { isApprove: true }, { new: true });

        if (!product) return res.status(404).json({ error: "Product not found" });

        return res.status(200).json({data: product , message: "Product approved successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports={createProduct,listProduct,productDetails,updateProduct,deleteProduct,approveProduct}