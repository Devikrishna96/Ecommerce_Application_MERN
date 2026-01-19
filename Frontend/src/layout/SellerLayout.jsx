import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SellerHeader } from '../components/seller/SellerHeader';
import { Footer } from '../components/seller/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { saveSeller, sellerLogout } from '../redux/features/sellerSlice';
import { axiosInstance } from '../config/axiosInstance';

const SellerLayout = () => {
  const seller = useSelector((state) => state.seller);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const checkSeller = async () => {
    try {
      const response = await axiosInstance.get("/seller/checkseller");
      dispatch(saveSeller(response.data));
    } catch (err) {
      dispatch(sellerLogout());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!seller.isSellerAuth) checkSeller();
    else setIsLoading(false);
  }, []);

  if (isLoading) return null; // loader

  return (
    <div>
      <SellerHeader />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SellerLayout;
