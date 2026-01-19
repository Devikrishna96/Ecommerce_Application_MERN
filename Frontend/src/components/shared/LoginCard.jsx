import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// services
import { userLogin } from "../../services/userServices";

// redux
import { saveUser } from "../../redux/features/userSlice";

const LoginCard = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const res = await userLogin(values);

      toast.success("Login Successful");

      dispatch(saveUser(res.data.userExist));
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Login failed",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="w-96 p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="mb-3 p-3 border rounded"
        onChange={(e) =>
          setValues({ ...values, [e.target.name]: e.target.value })
        }
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="mb-3 p-3 border rounded"
        onChange={(e) =>
          setValues({ ...values, [e.target.name]: e.target.value })
        }
      />

      <button
        className="bg-blue-500 text-white p-3 rounded mb-3"
        onClick={onSubmit}
      >
        Log In
      </button>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-semibold">
          Sign Up
        </Link>
      </p>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Other logins:</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to="/seller/login" className="text-blue-500 hover:underline">
            Seller Login
          </Link>
          <Link to="/admin/login" className="text-blue-500 hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
