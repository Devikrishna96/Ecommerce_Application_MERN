const Product = require("../Models/productModel");
const Cart = require("../Models/cartModel");


//add to cart
const addToCart = async(req,res)=>{
    const userId=req.user
    const {id,quantity} = req.body;
    const product = await Product.findById(id);
    if(!product) return res.status(404).send("Product not found");

//checking stock
    if(product.quantity < quantity) return res.status(400).send("Insufficient quantity");


    const cart = await Cart.findOne({userId});
    //if not cart exist creating new one
    if(!cart) {
        const newCart = new Cart({userId,products:[]});
            await newCart.save();
            return res.send("Product added to cart");
            }



            const existingProduct = cart.products.find(p=>p.productId.toString() === id);
            if(existingProduct) {
                existingProduct.quantity += quantity;
                cart.totalPrice =await cart.calculateTotalPrice();
                await cart.save();
                return res.send("Product added to cart");
                }


                cart.products.push({ productId: productId, price: product.price, quantity });
                cart.totalPrice =await cart.calculateTotalPrice();
                await cart.save();
                return res.status(200).json({ message: "Product added to cart", data: cart  });
                
}
//remove from cart

const removeFromCart = async (req, res) => {
    const { id } = req.params;
    const userId = req.user;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("Cart not found");

    const productIndex = cart.products.findIndex(p => p.productId.toString() === id);
    if (productIndex === -1) return res.status(404).send("Product not found in cart");

    cart.products.splice(productIndex, 1);
    cart.totalPrice =await cart.calculateTotalPrice();

    await cart.save();
    return res.status(200).json({ message: "Product removed from cart", data: cart})
};


// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        // Clear the cart products
        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.status(200).json({ message: "Cart cleared" });
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//get cart details

const getCartDetails = async (req, res) => {
    try {
        const userId = req.user;

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//quantity update

const updateQuantity = async (req, res) => {
    try {
        const {  quantity } = req.body;  
        const id = req.params.id;
        const userId = req.user;

        if (quantity <= 0) {
            return res.status(400).send("Quantity must be greater than 0");
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        // Find the product in the cart
        const existingProduct = cart.products.find(p => p.productId.toString() === id);

        if (!existingProduct) {
            return res.status(404).send("Product not found in cart");
        }

        // Update the product quantity
        existingProduct.quantity = quantity;
        cart.totalPrice = await cart.calculateTotalPrice();
        await cart.save();
        return res.status(200).json({ message: "Quantity updated successfully" , data :cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const viewAllCarts = async (req, res) => {
    try {
        // Fetch all carts and populate product details
        const carts = await Cart.find().populate("products.productId", "name price");

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "No carts found" });
        }

        return res.status(200).json({ message: "All carts retrieved successfully", data: carts });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    addToCart,
    removeFromCart,
    clearCart,
    getCartDetails,
    updateQuantity,
    viewAllCarts
};