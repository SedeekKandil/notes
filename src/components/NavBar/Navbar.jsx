import React from 'react'
import nav from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import img from '../../assets/images/TN-logo-fullcolor-rgb.png'

export default function Navbar() {
    let navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('token');
    
  }


  return (
    <>
      <nav className={nav.div}>
        <img src={img} className='w-100' alt="" />
        <ul className='list-unstyled ms-2'>
        <div>
  <li className="nav-item my-1">
    <NavLink className="nav-link py-2" to="/home">
    <i className="fa-solid fa-house me-2" />

        <span>Home</span>
        </NavLink>
  </li>
  <li className="nav-item my-1">
    <NavLink onClick={()=>{logOut()}} className="nav-link py-2" to="/signin">
    <i className="fa-solid fa-right-from-bracket me-2" />

        <span>Sign Out</span>
    </NavLink>
  </li>
</div>

        </ul>
      </nav>
    </>
  )
}
