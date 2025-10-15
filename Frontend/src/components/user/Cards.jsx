import React from 'react'
import { useNavigate } from 'react-router-dom';
import { userCart, userWishlist } from '../../services/userServices';
import { toast } from 'react-toastify';

export const Cards = ({ product }) => {
  const navigate = useNavigate();

  const addProducttoCart = () => {
    userCart(product._id, 1)
      .then((res) => {
        console.log(res);
        toast.success("Product Added to Cart");
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response?.data?.err || "Failed to add to cart", { position: 'top-center' });
      });
  };

  const addProducttoWishlist = async () => {
    try {
      const res = await userWishlist(product._id);
      if (res.data.error) {
        toast.error(res.data.error, { position: 'top-center' });
      } else {
        toast.success(res.data.message || "Product Added to Wishlist", { position: 'top-center' });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Failed to add to wishlist", { position: 'top-center' });
    }
  };

  // 🆕 Navigate to product details
  const handleCardClick = () => {
    navigate(`/product/productDetails/${product._id}`);
  };

  return (
    <div
      className="card card-side bg-base-100 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={handleCardClick} // 🆕 Makes the whole card clickable
    >
      <figure className="w-1/3">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body w-2/3">
        <h2
          className="card-title hover:text-primary"
          onClick={(e) => {
            e.stopPropagation(); // 🛑 Prevents parent click (if you want)
            handleCardClick();
          }}
        >
          {product.title}
        </h2>
        <p className="truncate">{product.description}</p>
        <div className="card-actions flex justify-between mt-4">
          <button
            className="btn btn-outline btn-primary flex-1"
            onClick={(e) => {
              e.stopPropagation(); // 🛑 Prevent navigating when button is clicked
              addProducttoWishlist();
            }}
          >
            Wishlist
          </button>

          <button
            className="btn btn-primary flex-1"
            onClick={(e) => {
              e.stopPropagation(); // 🛑 Prevent navigating when button is clicked
              addProducttoCart();
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
