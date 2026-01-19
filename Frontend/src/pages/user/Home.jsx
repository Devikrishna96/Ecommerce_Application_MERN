// src/pages/user/Home.jsx
import React from "react";
import LoginCard from "../../components/shared/LoginCard";

export const Home = () => {
  return (
    <div className="flex justify-around mt-10">
      {/* User Login */}
      <LoginCard role="user" />

    </div>
  );
};
