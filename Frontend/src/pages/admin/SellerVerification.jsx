import { useEffect, useState } from "react";
import { getAllSellers, verifySeller } from "../../services/adminServices";

const SellerVerification = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await getAllSellers();
      setSellers(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleVerify = async (sellerId) => {
    try {
      await verifySeller(sellerId);
      alert("Seller verified successfully");
      fetchSellers(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to verify seller");
    }
  };

  if (loading) return <p>Loading sellers...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!sellers.length) return <p>No sellers found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Seller Verification</h2>
      {sellers.map((seller) => (
        <div key={seller._id} className="border p-4 mb-3 rounded shadow">
          <p><strong>Name:</strong> {seller.name}</p>
          <p><strong>Email:</strong> {seller.email}</p>
          <p><strong>Status:</strong> {seller.verified ? "Approved" : "Pending"}</p>

          {!seller.verified && (
            <button
              className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
              onClick={() => handleVerify(seller._id)}
            >
              Approve Seller
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SellerVerification;
