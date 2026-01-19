import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../components/admin/Footer';
import Header from '../components/user/Header';
import { AdminHeader } from '../components/admin/AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { saveAdmin, adminLogout } from '../redux/features/adminSlice';
import { axiosInstance } from '../config/axiosInstance';

function AdminLayout() {
  const admin = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance({ method: "GET", url: "/admin/checkadmin" });
      dispatch(saveAdmin(response.data));
    } catch (error) {
      dispatch(adminLogout());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only check if admin is not authenticated yet
    if (!admin.isAdminAuth) {
      checkAdmin();
    } else {
      setIsLoading(false); // Already authenticated, no need to wait
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  if (isLoading) return null; // Or a loader/spinner

  return (
    <div>
      {admin.isAdminAuth ? <AdminHeader /> : <Header />}
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;
