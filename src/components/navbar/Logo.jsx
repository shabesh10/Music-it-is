import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/")} className='hover:cursor-pointer'><h1 className='font-serif text-[32px]'>Music it is.</h1></div>
  )
}

export default Logo