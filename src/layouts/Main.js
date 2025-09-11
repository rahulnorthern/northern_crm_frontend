import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Info from '../components/Info';
import Loader from '../components/Loader';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import Cookies from "js-cookie";

const Main = () => {
  const loading = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = Cookies.get("accessToken");
    
    if(token){
      const decoded = jwtDecode(token);
      
      const payload = {
        display_name: decoded.name,
        role: decoded.role
      }
      
      dispatch(login(payload));
    }
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className="app-container">
        <Navbar />
        <div className='main-container'>
           <div className='main-body'>
             <Outlet />
             <Info />
           </div>
        </div>        
        <Footer />
      </div>      
    </>    
  )
}

export default Main