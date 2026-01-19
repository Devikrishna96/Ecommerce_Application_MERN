import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sellerLogin } from '../../services/sellerServices';
import { useDispatch } from 'react-redux';
import { saveSeller } from '../../redux/features/sellerSlice';

export const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sellerLogin({ email, password });
      dispatch(saveSeller(res.data.sellerExist));
      navigate("/seller/home");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 shadow-lg w-96 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-full mb-4">Login</button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/seller/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
           </p>
            <p>
<Link to="/home" className="text-blue-500 hover:underline">
              Back to home 
            </Link>
            </p>
        </div>
      </form>
    </div>
  );
};
