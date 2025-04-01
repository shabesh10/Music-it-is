import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <header className='h-[70px] w-full bg-gray-700 border-b-3 border-amber-300'>
        <nav className='w-[93%] m-auto h-[100%] flex justify-between items-center'>
            <Logo/>
            <Menu/>
        </nav>
    </header>
  )
}

export default NavbarContainer