import React from 'react'
import NavbarContainer from './../components/navbar/NavbarContainer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavbarContainer/>
      <Outlet/>
    </div>
  )
}

export default Layout