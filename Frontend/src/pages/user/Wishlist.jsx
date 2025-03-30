import React, { useEffect, useState } from 'react';
import { getUserWishlist, removeFromWishlist } from '../../services/userServices';
import { toast } from 'react-toastify';

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getUserWishlist();
      setWishlist(response.data.data || []);
      console.log(response.data.data,"response");
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false); // Stop loading regardless of success/failure
    }
  };

  const removeProductFromWishlist = async (productId) => {
    // Optimistically update UI before API call
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    setWishlist(updatedWishlist)|| [];

    try {
      await removeFromWishlist(productId);
      toast.success('Product removed from wishlist');
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove product');
      // Revert state if API call fails
      setWishlist([...wishlist]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>

      {loading ? (
        <p className="text-gray-500">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-600">No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                onClick={() => removeProductFromWishlist(product._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
