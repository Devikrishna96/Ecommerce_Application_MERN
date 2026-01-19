const upload = require("../Middlewares/multer")
const Product = require("../Models/productModel")
const Seller = require("../Models/sellerModel")

const uploadToCloudnary = require("../Utilities/imageUpload")

const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
console.log(req.body)
console.log(req.file,"file"); // Add this

    if (!title || !description || !price || !quantity)
      return res.status(400).json({ message: "All fields are required" });

    if (!req.file)
      return res.status(400).json({ message: "Image not found" });

    // 🔹 Only approved sellers can add products
    const seller = await Seller.findById(req.seller);
    if (!seller.verified)
      return res.status(403).json({ error: "Your account is not verified by admin" });

    const cloudinaryRes = await uploadToCloudnary(req.file.path);

    const newProduct = new Product({
      title,
      description,
      price,
      quantity,
      image: cloudinaryRes,
      seller: req.seller, // 🔹 track product owner
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", data: savedProduct });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  }
};


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
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ error: "Product not found" });

    // 🔹 Only owner can update
    if (product.seller.toString() !== req.seller)
      return res.status(403).json({ error: "Access Denied: Not your product" });

    const { title, description, price, quantity } = req.body;
    const updateData = { title, description, price, quantity };

    if (req.file) {
      const cloudinaryRes = await uploadToCloudnary(req.file.path);
      updateData.image = cloudinaryRes;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ error: "Product not found" });

    // 🔹 Only owner or admin can delete
    if (product.seller.toString() !== req.seller && req.role !== "admin")
      return res.status(403).json({ error: "Access Denied" });

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  }
};

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


// ADMIN - list all products (approved + pending)
const listAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller });
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={createProduct,listProduct,productDetails,updateProduct,deleteProduct,approveProduct,listAllProductsAdmin,listSellerProducts}