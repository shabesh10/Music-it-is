import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex min-h-[calc(100vh-70px)] bg-gray-800'>
        <AdminSidebar/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout