import React, { useEffect, useState, useRef } from 'react';
import {
  listSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/sellerServices';

export const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await listSellerProducts();
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);

    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        setEditingId(null);
      } else {
        await createProduct(formData);
      }

      setForm({ title: '', description: '', price: '', quantity: '' });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchProducts();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Product action failed");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description,
      price: p.price,
      quantity: p.quantity
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "Edit Product" : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4 mb-6"
      >
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <input
          type="file"
          ref={fileInputRef}
          className="file-input file-input-bordered w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="btn btn-primary w-full">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Your Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded-lg">
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="mb-2 h-40 w-full object-cover"
              />
            )}

            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <p>Price: ₹{p.price}</p>
            <p>Quantity: {p.quantity}</p>
            <p>Status: {p.isApprove ? "Approved" : "Pending"}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(p)}
                className="btn btn-sm btn-warning"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
