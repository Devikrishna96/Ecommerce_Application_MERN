import React, { useEffect, useState } from 'react';
import { getOrderById, updatePaymentStatus } from '../../services/userServices';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = searchParams.get("orderId");

      const res = await getOrderById(orderId);
      setOrder(res.data.data);

      // Update payment success
      await updatePaymentStatus({ orderId });

      setLoading(false);
    };

    fetchOrder();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-green-600">Payment Successful!</h2>
      <p>Order ID: {order._id}</p>
      <p>Amount Paid: ₹{order.totalPrice}</p>
      <p>Status: {order.paymentStatus}</p>

      <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
        Continue Shopping
      </button>
    </div>
  );
};
