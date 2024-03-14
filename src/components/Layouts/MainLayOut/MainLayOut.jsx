import React from 'react'
import Navbar from '../../NavBar/Navbar'
import { Outlet } from 'react-router-dom'



export default function Mainlayout() {

  return (
    <>
    <div className='d-flex'>
    <Navbar/>
      <Outlet/>
    </div>
      
      
    </>
  )
}