import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/admin/Footer'
import Header from '../components/user/Header'
import { AdminHeader } from '../components/admin/AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, saveUser } from '../redux/features/userSlice'
import { axiosInstance } from '../config/axiosInstance'
         
function Adminlayout() {
  const admin = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(true);
  console.log("admin===", admin);

  const dispatch = useDispatch();
  const location = useLocation();

  const checkAdmin = async () => {
      try {
          const response = await axiosInstance({ method: "GET", url: "/admin/checkadmin" });
          console.log(response, "========checkAdmin response");
          dispatch(saveUser());
          setIsLoading(false);
      } catch (error) {
          console.log(error);
          dispatch(clearUser());
          setIsLoading(false)
      }
  };

  useEffect(() => {
      checkAdmin();
  }, [location.pathname]);

  return isLoading ? null : (
      <div>
          {admin.isAdminAuth ? <AdminHeader /> : <Header />}
          <div className="min-h-96">
              <Outlet />
          </div>
          <Footer />
      </div>
  )
}

export default Adminlayout