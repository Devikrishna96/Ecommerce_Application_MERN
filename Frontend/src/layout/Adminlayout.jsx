import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/admin/Footer'
import { AdminHeader } from '../components/admin/AdminHeader'

function Adminlayout() {
  const [isAdminAuth,setIsAdminAuth]=useState(true)
  return (
    <div>
   {isAdminAuth ? <AdminHeader/> :<Header/>}
   <div className='min-h-96'>
    <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Adminlayout