import React, { useEffect, useState } from 'react';
import { listSellerProducts } from '../../services/sellerServices';

export const SellerPendingProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchPending = async () => {
    const res = await listSellerProducts();
      console.log("API response:", res.data.data); //
    setProducts(res.data.data.filter(p => !p.isApprove));
  };

  useEffect(()=>{ fetchPending() }, []);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Pending Product Approvals</h2>
      {products.length === 0 ? <p>No pending products</p> :
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded-lg">
            <img src={p.image} alt={p.title} className="mb-2 h-40 w-full object-cover"/>
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <p>Price: ${p.price}</p>
            <p>Quantity: {p.quantity}</p>
            <p>Status: Pending</p>
          </div>
        ))}
      </div>}
    </div>
  );
};
