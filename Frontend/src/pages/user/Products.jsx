import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/user/Cards';
import { listProducts } from '../../services/userServices';

export const Products = () => {
  const [products, setProducts] = useState([]); // existing
  const [searchTerm, setSearchTerm] = useState(""); // 🆕 added for search

  useEffect(() => {
    listProducts()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 🆕 Filter products based on searchTerm
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* 🆕 Add Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // updates state
          className="input input-bordered w-80"
        />
      </div>

      {/* 🆕 Use filteredProducts instead of products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <Cards key={i} product={product} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};
