import React, { useEffect, useState } from 'react'
import { CartCard } from '../../components/user/CartCard'
import { getCartItems, makePaymentOnStripe } from '../../services/userServices'
import { useNavigate } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
const stripePromise =  loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

export const Cart = () => {
    
    const navigate=useNavigate()
    const[cartItems,setCartItems]=useState([])
    const[total,setTotal]=useState(0)
    useEffect(()=>{
        getCartItems().then((res)=>{
            console.log(res.data.products,"cartitems")
            setCartItems(res.data.products || [])
            setTotal(res.data.totalPrice || 0)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
   
    const handleQuantityChange = (itemId, newQuantity) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            );
    
            const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotal(newTotal);  
    
            return updatedItems;
        });
    };
    const updateCartFromChild=(id,totalPrice)=>{
        setCartItems((prev) => prev.filter(item=>item.productId._id!=id))
        setTotal(totalPrice)

    }

    function EmptyCart(){
        return (
        <div className="flex justify-center items-center flex-col h-screen"><p>Your cart is empty</p>
        <button className="btn btn-primary" onClick={()=>navigate("/product")}>Start Shopping</button></div>

    )
    }
    const makePayment=async ()=>{
        console.log("Initiating payment...");
        const body = {
            products: cartItems
          
        }
    
        console.log("Sending to backend:", body);
    
const response=await makePaymentOnStripe(body)
console.log(response.data.sessionId,"stripe");
const session=response.data.sessionId
const stripe=await stripePromise
if(stripe)
{
    const result=await stripe.redirectToCheckout({
        sessionId:session
    })
    if(result.error){
        console.log(result.error.message)
        }
    }
        else{
            console.log("stripe failed to load")
        }



    }
  return (
    <div>
        {
            cartItems.length  ?( <>
            {
           cartItems?.map((item)=>(<CartCard key={item._id} item={item} onQuantityChange={handleQuantityChange} onRemove={updateCartFromChild}/>))
            }
        <div className='text-right mt-5'>
            <p>TOTAL PRICE :{total.toFixed(2)}</p>
            <button className='btn bg-green-700 text-white' onClick={makePayment}>Check Out</button>

            </div> 
            </>) :<EmptyCart/>
        }
    </div>
  )
}
