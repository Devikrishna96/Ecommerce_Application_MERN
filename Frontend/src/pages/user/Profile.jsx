import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";

export const Profile = () => {
    const [userDetails, isLoading, error] = useFetch("/user/profile");
    const [showOrders, setShowOrders] = useState(false);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        profilePic: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        if (formData.name) data.append("name", formData.name);
        if (formData.phone) data.append("phone", formData.phone);
        if (formData.profilePic) data.append("file", formData.profilePic);

        try {
            const res = await axios.put("/user/profile", data);
            alert(res.data.message);
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.error || "Update failed");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="flex gap-5">
                <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
                    {editing ? "Cancel" : "Edit Profile"}
                </button>
                <button className="btn btn-accent" onClick={() => setShowOrders(!showOrders)}>
                    Orders
                </button>
                <button className="btn btn-info">Change Password</button>
                <button className="btn btn-neutral">Logout</button>
            </div>

            {!editing ? (
                <div className="mt-4">
                    <h1>Welcome {userDetails?.name}</h1>
                    <p>Email ID: {userDetails?.email}</p>
                    <p>Mobile: {userDetails?.phone}</p>
                    <img src={userDetails?.profilepic} alt="Profile Pic" className="w-12 h-12 rounded-full" />
                </div>
            ) : (
                <form className="mt-4 space-y-2" onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <input
                        type="file"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleChange}
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <button type="submit" className="btn btn-success">Update Profile</button>
                </form>
            )}

            {showOrders && <p>This is user orders section.</p>}
        </div>
    );
};
