import React, { useEffect } from 'react'
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedRoutes = () => {
      const [isUserAuth,setIsUserAuth]=useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/login");
    },[]);
      return <Outlet/>
}
