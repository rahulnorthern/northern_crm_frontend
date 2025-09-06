import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Info from '../components/Info';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const Main = () => {
  const loading = useSelector((state) => state.loader.loading);

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