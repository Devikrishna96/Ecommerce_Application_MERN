const Review  = require("../Models/reviewModel")
const Product = require("../Models/productModel");



//add review

const addReview = async (req, res) => {
    try {
      const { productId, rating, comment } = req.body;
      const userId = req.user;
  
      if (!productId || !rating || !comment) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const product=await Product.findById(productId);
      if(!product) 
        return res.status(404).json({ error: 'Product not found'  });
      

      if(rating>5 || rating <1){
        return res.status(400).json({ error: 'Rating must be between 1 and 5'});  
      }
  //creating or updating review
  const review = await Review.findOneAndUpdate({userId,productId},{rating,comment},{new:true,upsert:true})
     
  
      res.status(201).json({ message: 'Review added successfully', data : review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


//delete review
const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const userId = req.user;
  
      const review = await Review.findOneAndDelete({ _id: reviewId, userId });
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//view all review

const viewAllReviews = async (req, res) => {
    try {
      const {productId}=req.params;
      const reviews = await Review.find({productId}).populate('userId', 'name').sort({createdAt : -1});
      if(!reviews.length)
        return res.status(404).json({ error: 'No reviews found' });
      res.status(200).json({ data: reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
//get product reviews by specific user
const getUserReviews = async (req, res) => {
    try {
      const userId = req.user; 
  
      const reviews = await Review.find({ userId }).populate('productId', 'name');
      if(!reviews.length)
        return res.status(404).json({ error: 'No reviews found' });
      res.status(200).json({data : reviews});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  // Average rating of a product
  const averageRating = async (req, res) => {
   try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('userId', 'name');
    if (!reviews.length) {
      return res.status(404).json({ error: 'No reviews found' });
      }
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const average = sum / reviews.length;
      res.status(200).json({ data: { average } });
      
     }
      catch (err) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  module.exports = {
    addReview,
    averageRating,
    deleteReview,
    viewAllReviews,
    getUserReviews,
  };