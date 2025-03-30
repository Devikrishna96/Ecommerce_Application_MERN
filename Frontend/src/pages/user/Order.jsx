import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../services/userServices"; // Import addOrder API

const Order = ({ cartItems }) => {
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleOrder = async () => {
        if (!shippingAddress) {
            toast.error("Please enter a shipping address.");
            return;
        }

        try {
            const { data } = await addOrder({
                items: cartItems.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                })),
                totalAmount: totalPrice,
                shippingAddress,
                paymentMethod,
            });

            toast.success("Order Created Successfully!");
            navigate('/makePayment'); // Redirect to checkout

        } catch (err) {
            console.error("Order Creation Error:", err);
            toast.error(err.response?.data?.error || "Failed to create order.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>

            <div className="mb-3">
                <label className="block font-semibold">Shipping Address:</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your address"
                />
            </div>

            <div className="mb-3">
                <label className="block font-semibold">Payment Method:</label>
                <select
                    className="select select-bordered w-full"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>Cash on Delivery</option>
                </select>
            </div>

            <div className="text-lg font-bold mb-3">Total: ₹{totalPrice}</div>

            <button onClick={handleOrder} className="btn btn-primary w-full">
                Place Order
            </button>
        </div>
    );
};

export default Order;
