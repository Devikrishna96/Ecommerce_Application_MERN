import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellerSignUp } from '../../services/sellerServices';

const SellerSignup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sellerSignUp(values);
      alert(res.data.message || "Seller registered successfully!");
      navigate("/seller/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          value={values.confirmpassword}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />

        <button type="submit" className="btn btn-primary w-full">Sign Up</button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/seller/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SellerSignup;
