import React from 'react'
import { userCart, userWishlist } from '../../services/userServices';
import { toast } from 'react-toastify';

export const Cards = ({product}) => {
  const addProducttoCart=()=>{
userCart(product._id, 1).then((res)=>{
      console.log(res);
      toast.success("Product Added to Cart")
    })
    .catch(err =>{
      console.log(err);
      toast.error(err.response.data.err,{position :'top-center'})
    })
  }

  const addProducttoWishlist=()=>{
    userWishlist(product._id).then((res)=>{
          console.log(res);
          toast.success("Product Added to Wishlist")
        })
        .catch(err =>{
          console.log(err);
          toast.error(err.response.data.err,{position :'top-center'})
        })
      }

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img
      src={product.image}
      alt="product"  className='object-cover w-full h-full'/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{product.title}</h2>
    <p>{product.description}</p>
    <div className="card-actions flex justify-between mt-4">
    <button className="btn btn-outline btn-primary flex-1" onClick={addProducttoWishlist}>Wishlist</button>

      <button className="btn btn-primary  flex-1 " onClick={addProducttoCart}>Buy Now</button>

    </div>
  </div>
</div>
    </div>
  )
}
