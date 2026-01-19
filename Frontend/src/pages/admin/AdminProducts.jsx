import React, { useEffect, useState } from "react";
import {
  getAllProductsAdmin,
  approveProductAdmin,
  deleteProductAdmin,
} from "../../services/adminServices";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | approved | pending
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getAllProductsAdmin();
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 Search + Filter
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "approved") return matchSearch && p.isApprove;
    if (filter === "pending") return matchSearch && !p.isApprove;

    return matchSearch;
  });

  // ✅ Approve Product
  const handleApprove = async (id) => {
    try {
      await approveProductAdmin(id);
      toast.success("Product approved");

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isApprove: true } : p
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve product");
    }
  };

  // 🗑 Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProductAdmin(id);
      toast.success("Product deleted");

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      {/* 🔍 Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-64"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* 📦 Products Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>₹{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>
                    {p.isApprove ? (
                      <span className="badge badge-success">Approved</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {!p.isApprove && (
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
