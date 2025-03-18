const { addToCart, removeFromCart, clearCart, updateQuantity, getCartDetails, viewAllCarts } = require('../../Controllers/cartController');
const authUser = require('../../Middlewares/authUser');
const authAdmin = require('../../Middlewares/authAdmin');

const cartRouter=require('express').Router()

//add to cart
cartRouter.post('/add', authUser, addToCart);

// Remove a product from the cart
cartRouter.delete('/remove/:id', authUser, removeFromCart);

// Get all cart details
cartRouter.get('/', authUser, getCartDetails);

// Update the quantity of a product in the cart
cartRouter.put('/update/:id', authUser, updateQuantity);

// Clear the cart
cartRouter.delete('/clear', authUser, clearCart);
 //get all carts by admin
 cartRouter.get('/view-all', authAdmin, viewAllCarts);



module.exports= cartRouter