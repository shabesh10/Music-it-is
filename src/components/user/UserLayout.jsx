import React from 'react'
import UserSidebar from './UserSidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className='flex bg-gray-800 h-[calc(100vh-70px)]'>
        <UserSidebar/>
        <Outlet/>
    </div>
  )
}

export default UserLayout