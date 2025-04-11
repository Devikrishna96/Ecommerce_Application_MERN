import React, { useState } from 'react'
import Header from '../components/user/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/user/Footer'
import { UserHeader } from '../components/user/UserHeader'
import { useDispatch } from 'react-redux'
import { clearUser } from '../redux/features/userSlice'
import { axiosInstance } from '../config/axiosInstance'

function Userlayout() {
  const user=useSelector((state)=>state.user)
  const [isUserAuth,setIsUserAuth]=useState(true)

  const dispatch=useDispatch();
  const location=useLocation();
  const checkUser=async()=>{
    try {
      const response=await axiosInstance({method:"GET",url:"/user/check-user"})
      dispatch(saveUser())
    } catch (err) {
      console.log(err);
      dispatch(clearUser());
      
    }
  }
  useEffect(()=>{
    checkUser()
    },[location.pathname])
  
  return isLoading ? null :(
    <div>
   {isUserAuth ? <UserHeader/> :<Header/>}
   <div className='min-h-96'>
    <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Userlayout