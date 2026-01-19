import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { adminLogin } from "../../services/adminServices";
import { saveAdmin } from "../../redux/features/adminSlice";
import { useDispatch } from "react-redux";

export const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ MOVED INSIDE

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(form);

      // ✅ Save admin in redux
      dispatch(saveAdmin(res.data.admin));

      alert("Admin login success");

      // ✅ Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>
         <p>
<Link to="/home" className="text-blue-500 hover:underline">
              Back to home 
            </Link>
            </p>
      </form>
    </div>
  );
};
