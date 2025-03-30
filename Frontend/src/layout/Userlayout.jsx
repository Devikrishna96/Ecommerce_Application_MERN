import React, { useState } from 'react'
import Header from '../components/user/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/user/Footer'
import { UserHeader } from '../components/user/UserHeader'

function Userlayout() {
  const [isUserAuth,setIsUserAuth]=useState(true)
  return (
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