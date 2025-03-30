const Product = require("../Models/productModel");
const Cart = require("../Models/cartModel");

// Add to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        console.log("product",product)
        if (!product) return res.status(404).json({ error: "Product not found" });

        // Checking stock availability
        if (product.quantity < quantity) return res.status(400).json({ error: "Insufficient stock" });

        let cart = await Cart.findOne({ userId });
        console.log(cart,"cart")

        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, price: product.price,title: product.title, quantity }] });
        } else {
            const existingProduct = cart.products.find(p => p.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, price: product.price,title: product.title, quantity });
            }
        }

        cart.totalPrice = await cart.calculateTotalPrice();
        await cart.save();
console.log(cart);
        return res.status(200).json({ message: "Product added to cart", data: cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === id);
        if (productIndex === -1) return res.status(404).json({ error: "Product not found in cart" });

        cart.products.splice(productIndex, 1);
        cart.totalPrice = await cart.calculateTotalPrice();
        await cart.save();

        if (cart.products.length === 0) {
            await Cart.findOneAndDelete({ userId });
            return res.status(200).json({ message: "Cart is now empty" });
        }

        return res.status(200).json({ message: "Product removed from cart", data: cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        await Cart.findOneAndDelete({ userId });
        return res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get cart details
const getCartDetails = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId }).populate("products.productId", "name price image quantity");

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update quantity
const updateQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const id = req.params.id;
        const userId = req.user;

        if (quantity <= 0) return res.status(400).json({ error: "Quantity must be greater than 0" });

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const existingProduct = cart.products.find(p => p.productId.toString() === id);
        if (!existingProduct) return res.status(404).json({ error: "Product not found in cart" });

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        if (product.quantity < quantity) return res.status(400).json({ error: "Insufficient stock" });

        existingProduct.quantity = quantity;
        cart.totalPrice = await cart.calculateTotalPrice();
        await cart.save();

        return res.status(200).json({ message: "Quantity updated successfully", data: cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// View all carts (Admin)
const viewAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate("products.productId", "name price image quantity");

        if (!carts.length) return res.status(404).json({ error: "No carts found" });

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
