const { addReview, deleteReview, viewAllReviews, getUserReviews, averageRating } = require("../../Controllers/reviewController");
const authUser = require("../../Middlewares/authUser");

const reviewRouter=require('express').Router()

reviewRouter.post('/add', authUser, addReview);

reviewRouter.delete('/delete/:reviewId', authUser, deleteReview);

reviewRouter.get('/view-all/:productId', viewAllReviews);
reviewRouter.get('/avg-rating/:productId', averageRating);


reviewRouter.get('/user-specific', authUser, getUserReviews);

module.exports = reviewRouter;