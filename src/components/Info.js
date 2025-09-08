import React from 'react'
import { logout } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Info = () => {
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
      <div className='width-25'>
        <div className='card-box color-primary'>
          <h2>Welcome</h2>
          <div className='d-flex'>
            <div>
              <img src='/img/avatar.png' className='rounded-circle me-3' alt='avatar' />
            </div>            
            <ul>
              <li className='qk-link cursor-pointer'>Role</li>
              <li className='qk-link cursor-pointer'><Link className="color-primary text-decoration-none text-center" to="/dashboard">Dashboard</Link></li>
              <li className='qk-link cursor-pointer'><Link className="color-primary text-decoration-none text-center" to="/profile">Edit Profile</Link></li>
              <li className='qk-link cursor-pointer' onClick={handleLogout}>Logout</li>
            </ul>
          </div>          
        </div>
        {/* <div className='card-box color-primary'>
          <h2>Upcoming Events</h2>
          <ul>
            <li>
              <div className='event-container'>
                <div className='event-date'>
                  <span className='event-d'>15</span>
                  <span className='event-mon'>Aug</span>
                </div>
                <div className='event-name'>
                  Independence day
                </div>
              </div>
            </li>
          </ul>
        </div> */}
        {/* <div className='card-box color-primary'>
          <h2>Quick Links</h2>
          <ul>
            <li className='qk-link'>NSSPL – HR Portal</li>
            <li className='qk-link'>Submit Your Details</li>
          </ul>
        </div> */}
      </div>      
    </>
  )
}

export default Info