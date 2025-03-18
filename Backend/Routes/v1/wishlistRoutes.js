const { addToWishlist, removeFromWishlist, getUserWishlist } = require('../../Controllers/wishlistController');
const authUser = require('../../Middlewares/authUser');

const wishlistRouter = require('express').Router();

wishlistRouter.post('/add', authUser, addToWishlist);
wishlistRouter.delete('/remove/:productId', authUser, removeFromWishlist);
wishlistRouter.get('/user-wishlist', authUser, getUserWishlist);

module.exports = wishlistRouter;
