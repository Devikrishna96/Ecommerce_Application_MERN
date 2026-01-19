import React, { useState } from 'react'
import { removeCartItems } from '../../services/userServices';

export const CartCard = ({item,onQuantityChange ,onRemove}) => {

    const [quantity, setQuantity] = useState(item.quantity || 1);
const itemss={item}
console.log(itemss,"item")
    // Increase Quantity
    const increaseQuantity = () => {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(item._id, newQuantity); // Notify parent (Cart)
    };
  
    // Decrease Quantity (Min: 1)
    const decreaseQuantity = () => {
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(item._id, newQuantity); // Notify parent (Cart)
      }
    };
    const removeItem=()=>{

        try {
          const productId=item.productId._id
            removeCartItems(productId).then((res)=>{
                console.log(res)
                onRemove(productId,res.data.data.totalPrice)
            })
            .catch((err)=>{
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    }
  return (
        <div className=" bg-grey-100 shadow-xl  flex items-center w-full justify-between py-5 text-black">
  <figure>
    <img 
      src={item.productId.image}
      alt="Cart Item" className='h-[100px]'/>
  </figure>
  <div className="">
    <p>PRICE : {item.price}</p>
    </div>
    
  {/* Quantity Counter */}
  <div className="flex items-center space-x-2 mt-2">
          <button className="btn bg-red-500 text-white" onClick={decreaseQuantity}>
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button className="btn bg-green-500 text-white" onClick={increaseQuantity}>
            +
          </button>
        </div>
      



    <div className="card-actions justify-end">
      <button className="btn btn-primary"onClick={()=>removeItem()}>Remove</button>
    
  </div>
</div>
  )
}
