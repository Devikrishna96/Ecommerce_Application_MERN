import React, { useEffect, useState } from 'react';
import { getSellerProfile, editSellerProfile } from '../../services/sellerServices';

export const SellerProfile = () => {
  const [seller, setSeller] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getSellerProfile();
      setSeller(res.data.seller);
      setName(res.data.seller.name);
      setPhone(res.data.seller.phone);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if(file) formData.append("profilepic", file);

    const res = await editSellerProfile(formData);
    setSeller(res.data.seller);
    alert(res.data.message);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" className="input input-bordered w-full" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="text" className="input input-bordered w-full" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <input type="file" name="image" className="file-input file-input-bordered w-full" onChange={(e)=>setFile(e.target.files[0])} />
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};
