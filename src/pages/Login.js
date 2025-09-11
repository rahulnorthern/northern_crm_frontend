import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from "../store/slices/loaderSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from '../store/thunks/userThunks';

const initialState = {
    username: "",
    password: ""
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if(isLoggedin) {
      navigate("/projects");
    }
  }, [isLoggedin]);

  const updateFormData = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      })
  }

  const submitForm = async (e) => {
      e.preventDefault();
      setValidated(true);   
      
      if(formData.username && formData.password) {
        dispatch(showLoader());
        await dispatch(loginUser(formData))
          .unwrap()
          .then(res=>{
            
          })
          .catch(err=>{
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: err?.message || 'Something went wrong!!',
                confirmButtonColor: "#3085d6",
            });
          })
          .finally(()=>{
            dispatch(hideLoader());
          });        
      }
  }

  return (
    <>
        <div className='card-box width-75'>
            <p className='font-18 font-700'>Log In</p>
            <Form>
                <Form.Group className="mb-3" controlId="username.ControlInput">
                  <Form.Label>Username or Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Username or Email Address" name='username' value={formData.username} onChange={updateFormData} />
                  {validated && !formData.username && <p className='text-danger'>Enter username!!</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password*</Form.Label>
                  <InputGroup>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name='password' value={formData.password} onChange={updateFormData} />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", background: "white" }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </InputGroup.Text>                        
                  </InputGroup>       
                  {validated && !formData.password && <p className='text-danger'>Enter password!!</p>}
                </Form.Group>
                <div key={`remember-check`} className="mb-3">
                    <input
                      className="form-check-input crsr-pointer me-2"
                      type={'checkbox'}
                      id="remember-check"
                    />
                    <label className="form-check-label crsr-pointer" htmlFor={`remember-check`}>
                      Remember Me
                    </label>
                </div>
                <button className='primary-btn p-2' onClick={submitForm}>Log In</button>
                <p><a href='#' className='forgot-pass'>Lost your password?</a></p>                
            </Form>
        </div>
    </>
  )
}

export default Login