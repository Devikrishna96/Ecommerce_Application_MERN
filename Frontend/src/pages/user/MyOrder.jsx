import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOrders()
      .then((res) => {
        console.log("Orders:", res.data);
        setOrders(res.data.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function EmptyOrders() {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-lg font-semibold">No orders found.</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate("/product")}>
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md">
              <p className="text-lg font-medium">Order ID: {order._id}</p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <p className="text-sm text-gray-600">Payment Status: {order.paymentStatus}</p>
              <p className="text-sm text-gray-600">Total Price: ₹{order.totalPrice}</p>
              <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod || 'N/A'}</p>
              <p className="text-sm text-gray-600">Shipping Address: {order.shippingAddress || 'N/A'}</p>
              <p className="text-sm text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              
              <h3 className="font-medium mt-3">Products:</h3>
              <ul className="mt-2 space-y-2">
                {order.products.map((item) => (
                  <li key={item.productId} className="border p-2 rounded">
                    <p>
                      <span className="font-semibold">{item.title}</span> - ₹
                      {item.price} x {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
};
