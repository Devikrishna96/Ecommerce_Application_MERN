import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/seller/Footer'
import { SellerHeader } from '../components/seller/SellerHeader'

function Sellerlayout() {
  const [isSellerAuth,setIsSellerAuth]=useState(true)
  return (
    <div>
   {isSellerAuth ? <SellerHeader/> :<Header/>}
   <div className='min-h-96'>
    <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Sellerlayout