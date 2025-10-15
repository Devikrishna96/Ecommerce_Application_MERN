import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { userCart } from "../../services/userServices";
import { toast } from "react-toastify";

export const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, loading, error] = useFetch(`/product/productDetails/${id}`);

  const addProductToCart = () => {
    if (!productDetails?._id) return;
    userCart(productDetails._id, 1)
      .then((res) => {
        toast.success("Product Added to Cart");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.err || "Failed to add to cart", {
          position: "top-center",
        });
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1>Product Details</h1>
      <div>
        <h2>{productDetails?.title}</h2>
        <p>{productDetails?.description}</p>
      </div>
      <div>
        <img
          src={productDetails?.image}
          alt="Product image"
          className="w-full max-w-md object-cover"
        />
        <h2>Price: ₹{productDetails?.price}</h2>
      </div>
      <button className="btn btn-success mt-2" onClick={addProductToCart}>
        Add to Cart
      </button>
    </div>
  );
};
