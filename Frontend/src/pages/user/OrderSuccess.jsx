import React, { useEffect } from 'react'
import { clearCartItems, addOrder } from '../../services/userServices';

export const OrderSuccess = () => {
  useEffect(() => {
    const placeOrder = async () => {
      try {
        // 👇 get cart items from localStorage or redux
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        if (cartItems.length === 0) {
          console.log("No items in cart, skipping order placement");
          return;
        }

        // Call API to save order
        const orderRes = await addOrder({
          items: cartItems,
          paymentMethod: "Stripe",
          shippingAddress: {
            street: "Demo Street",
            city: "Demo City",
            zip: "12345"
          }
        });

        console.log("Order placed:", orderRes);

        // Now clear cart
        await clearCartItems();
        localStorage.removeItem("cartItems");

      } catch (err) {
        console.error("Order placement failed:", err);
      }
    };

    placeOrder();
  }, []);

  return (
    <div>
      <p>ORDER PLACED SUCCESSFULLY</p>
      <button className="btn bg-blue-600">View Details</button>
    </div>
  )
}
