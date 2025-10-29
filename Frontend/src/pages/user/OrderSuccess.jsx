import React, { useEffect, useState } from 'react';
import { getOrderById } from '../../services/userServices'; // create this API call
import { useSearchParams, useNavigate } from 'react-router-dom';

export const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = searchParams.get('orderId'); // get orderId from URL
      if (!orderId) {
        setError("No orderId found in URL");
        setLoading(false);
        return;
      }

      try {
        const res = await getOrderById(orderId);
        setOrder(res.data); // assume API returns { data: order }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
      {order && (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>Total Price: ₹{order.totalPrice}</p>

          <h3 className="font-semibold mt-4">Products:</h3>
          <ul>
            {order.products.map((item) => (
              <li key={item.productId}>
                {item.title} - Qty: {item.quantity} - Price: ₹{item.price}
              </li>
            ))}
          </ul>

          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/product")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};
