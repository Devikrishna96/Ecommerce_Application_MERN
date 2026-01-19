import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import OrdersList from "./OrdersList";
import SellerVerification from "./SellerVerification";
import { getDashboardStats } from "../../services/adminServices";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState("");

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await getDashboardStats();
      setStats(res.data); // {totalUsers, totalSellers, totalProducts, totalOrders, totalRevenue}
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      setErrorStats("Failed to load dashboard stats");
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-5">
        {["dashboard", "users", "orders", "sellers"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "dashboard" && (
        <>
          {loadingStats ? (
            <p>Loading stats...</p>
          ) : errorStats ? (
            <p className="text-red-600">{errorStats}</p>
          ) : stats ? (
            <div className="grid grid-cols-3 gap-5">
              <div className="p-5 border rounded shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-2xl">{stats.data}</p>
              </div>
              <div className="p-5 border rounded shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-2xl">{stats.totalOrders}</p>
              </div>
              <div className="p-5 border rounded shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">Pending Sellers</h2>
                <p className="text-2xl">{stats.totalSellers}</p>
              </div>
              <div className="p-5 border rounded shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-2xl">{stats.totalProducts}</p>
              </div>
              <div className="p-5 border rounded shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">Total Revenue</h2>
                <p className="text-2xl">₹{stats.totalRevenue}</p>
              </div>
            </div>
          ) : null}
        </>
      )}

      {activeTab === "users" && <UsersList />}
      {activeTab === "orders" && <OrdersList />}
      {activeTab === "sellers" && <SellerVerification />}
    </div>
  );
};

export default AdminDashboard;
