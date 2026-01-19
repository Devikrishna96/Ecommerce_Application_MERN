import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/adminServices";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <p><strong>User:</strong> {order.userId?.name}</p>
          <p><strong>Total Amount:</strong> ₹{order.totalPrice}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment:</strong> {order.paymentStatus}</p>

          <h3 className="font-semibold mt-2">Items:</h3>
          <ul className="ml-4">
            {order.products.map((item) => (
              <li key={item._id}>
                {item.title} — {item.quantity} × ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
