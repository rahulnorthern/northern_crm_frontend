import React from 'react'
import { logout } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn) || Cookies.get("accessToken");

  const handleLogout = () => {
    Cookies.remove("accessToken");
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <div className='navbar-container'>
        <div><img src='/img/northern_logo.png' /></div>
        <div className='nav-links font-700 font-14'>
          <a href='#' className='nav-link'>TEAMROOM</a>
          <a href='#' className='nav-link'>MY TASKS</a>
          <a href='#' className='nav-link'>ADMIN AREA</a>
          {isLoggedin && <a href='#' className='nav-link' onClick={handleLogout}>Logout</a>}
        </div>
      </div>      
    </>    
  )
}

export default Navbar