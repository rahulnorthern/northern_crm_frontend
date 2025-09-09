import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Info from '../components/Info';
import Loader from '../components/Loader';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { login, setAuthChecked } from '../store/slices/authSlice';
import { useNavigate } from "react-router-dom";

const Main = () => {
  const loading = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = Cookies.get("accessToken");
    
    if(token){
      const userDetails = Cookies.get("userDetails");
      const payload = {
        display_name: JSON.parse(userDetails).display_name,
        role: JSON.parse(userDetails).user_role
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