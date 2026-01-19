import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminServices";

const AdminDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data); // res.data contains { totalUsers, totalSellers, totalProducts, totalOrders, totalRevenue }
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="p-5 border rounded shadow">
        <h2 className="text-xl font-semibold">Total Users</h2>
        <p className="text-2xl">{stats.totalUsers}</p>
      </div>
      <div className="p-5 border rounded shadow">
        <h2 className="text-xl font-semibold">Total Orders</h2>
        <p className="text-2xl">{stats.totalOrders}</p>
      </div>
      <div className="p-5 border rounded shadow">
        <h2 className="text-xl font-semibold">Pending Sellers</h2>
        <p className="text-2xl">{stats.totalSellers}</p>
      </div>
      <div className="p-5 border rounded shadow">
        <h2 className="text-xl font-semibold">Total Products</h2>
        <p className="text-2xl">{stats.totalProducts}</p>
      </div>
      <div className="p-5 border rounded shadow">
        <h2 className="text-xl font-semibold">Total Revenue</h2>
        <p className="text-2xl">₹{stats.totalRevenue}</p>
      </div>
    </div>
  );
};

export default AdminDashboardStats;
