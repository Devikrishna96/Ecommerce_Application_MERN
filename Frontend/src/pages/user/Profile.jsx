import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { getUserOrders } from "../../services/userServices";

export const Profile = () => {
  const [userDetails, isLoading, error] = useFetch("/user/profile");
  const [showOrders, setShowOrders] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const user = userDetails;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.name) data.append("name", formData.name);
    if (formData.phone) data.append("phone", formData.phone);
    if (formData.profilePic) data.append("profilePic", formData.profilePic);

    try {
      const res = await axiosInstance.put("/user/profileEdit", data);
      toast.success(res.data.message || "Profile updated successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  // ✅ Fetch Orders when "Orders" is clicked
  useEffect(() => {
    const fetchOrders = async () => {
      if (showOrders) {
        setLoadingOrders(true);
        try {
          const response = await getUserOrders();
            console.log("Orders API response:", response.data.data); 
          setOrders(response.data.data || []);
        } catch (err) {
          toast.error("Failed to load orders");
        } finally {
          setLoadingOrders(false);
        }
      }
    };
    fetchOrders();
  }, [showOrders]);

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      {/* ---------- Top Buttons ---------- */}
      <div className="flex gap-4 flex-wrap justify-center mb-6">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(!editing);
            setShowOrders(false);
            setShowPassword(false);
          }}
        >
          {editing ? "Cancel Edit" : "Edit Profile"}
        </button>

        <button
          className="btn btn-accent"
          onClick={() => {
            setShowOrders(!showOrders);
            setEditing(false);
            setShowPassword(false);
          }}
        >
          My Orders
        </button>

        <button
          className="btn btn-info"
          onClick={() => {
            setShowPassword(!showPassword);
            setEditing(false);
            setShowOrders(false);
          }}
        >
          Change Password
        </button>

        {/* <button className="btn btn-neutral">Logout</button> */}
      </div>

      {/* ---------- Profile View ---------- */}
      {!editing && !showOrders && !showPassword && (
        <div className="bg-base-200 p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <img
            src={user?.profilepic || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border mx-auto mb-4 object-cover"
          />
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
          <p className="text-sm text-gray-400 mt-1">Email ID: {user?.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Mobile: {user?.phone || "Not provided"}
          </p>
        </div>
      )}

      {/* ---------- Edit Profile ---------- */}
      {editing && (
        <form
          className="bg-base-200 p-6 rounded-lg shadow-md w-full max-w-md mt-4 space-y-4"
          onSubmit={handleEditSubmit}
        >
          <h2 className="text-lg font-semibold text-center">Edit Profile</h2>

          <input
            type="text"
            name="name"
            placeholder={user?.name || "Name"}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="phone"
            placeholder={user?.phone || "Phone"}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />

          {formData.profilePic && (
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Preview"
              className="w-20 h-20 rounded-full mt-2 mx-auto object-cover"
            />
          )}

          <button type="submit" className="btn btn-success w-full">
            Update Profile
          </button>
        </form>
      )}

     {/* ---------- Orders Section ---------- */}
{showOrders && (
  <div className="bg-base-200 p-6 rounded-lg shadow-md w-full max-w-3xl mt-4">
    <h2 className="text-lg font-semibold mb-3 text-center">Your Orders</h2>
    {loadingOrders ? (
      <p className="text-center text-gray-400">Loading orders...</p>
    ) : orders.length === 0 ? (
      <p className="text-center text-gray-400">No orders found.</p>
    ) : (
      <table className="table w-full">
        <thead>
          <tr className="text-gray-600">
            <th>Order #</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
  {orders.map((order, index) =>
    order.items.map((item, i) => (
      <tr key={`${order._id}-${i}`} className="hover">
        {i === 0 && (
          <>
            <td rowSpan={order.items.length}>{index + 1}</td>
            <td>{item.productId}</td> {/* Will show ID until populated */}
            <td>₹{item.price}</td>
            <td>{item.quantity}</td>
            <td rowSpan={order.items.length}>{order.status}</td>
            <td rowSpan={order.items.length}>
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
          </>
        )}
        {i !== 0 && (
          <>
            <td>{item.productId}</td>
            <td>₹{item.price}</td>
            <td>{item.quantity}</td>
          </>
        )}
      </tr>
    ))
  )}
</tbody>

      </table>
    )}
  </div>
)}



      {/* ---------- Change Password ---------- */}
      {showPassword && (
        <form
          className="bg-base-200 p-6 rounded-lg shadow-md w-full max-w-md mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("Password change feature coming soon!");
          }}
        >
          <h2 className="text-lg font-semibold text-center">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="input input-bordered w-full"
          />
          <button className="btn btn-info w-full">Update Password</button>
        </form>
      )}
    </div>
  );
};
