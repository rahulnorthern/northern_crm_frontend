import React, { useState } from 'react'
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { registerUserApi } from '../services/userService';

const initialState = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    nickname: "",
    displayName: "",
    bio: "",
    password: "",
    confirmPassword: "",    
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [validated, setValidated] = useState(false);

    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordRegex = /^.{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        setValidated(true);
        if(formData.username && formData.email && emailRegex.test(formData.email) && formData.firstName && formData.lastName && formData.nickname && formData.displayName && formData.password && passwordRegex.test(formData.password) && formData.confirmPassword && formData.confirmPassword === formData.password){
            const postData = {
                username: formData.username,
                user_email: formData.email,
                first_name: formData.firstName,
                last_name: formData.lastName,
                user_nickname: formData.nickname,
                display_name: formData.displayName,
                user_bio: formData.bio,
                user_pass: formData.password,
            }
            
            registerUserApi(postData)
            .then((res) => {
                console.log(res);                
                setFormData(initialState);
                setValidated(false);
            })
            .catch((err) => {
                console.log(err);
                alert(err.response?.data?.message || "Registration failed! Please try again.");
            });
        }
    }

  return (
    <>
        <div className='card-box width-75'>
            <p className='font-18 font-700'>Register</p>
            <Form>
                <div className='row'>
                    <Form.Group className="mb-3 col-6" controlId="username">
                      <Form.Label>Username*</Form.Label>
                      <Form.Control type="text" placeholder="Username" name='username' value={formData.username} onChange={updateFormData} />
                      {validated && !formData.username && <p className='text-danger'>Enter username!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="email">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control type="email" placeholder="Email" name='email' value={formData.email} onChange={updateFormData} />
                      {validated && (!formData.email || !emailRegex.test(formData.email)) && <p className='text-danger'>Enter email!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="fname">
                      <Form.Label>First Name*</Form.Label>
                      <Form.Control type="text" placeholder="First name" name='firstName' value={formData.firstName} onChange={updateFormData} />
                      {validated && !formData.firstName && <p className='text-danger'>Enter first name!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="lname">
                      <Form.Label>Last name*</Form.Label>
                      <Form.Control type="text" placeholder="Last Name" name='lastName' value={formData.lastName} onChange={updateFormData} />
                      {validated && !formData.lastName && <p className='text-danger'>Enter lastName!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="nickname">
                      <Form.Label>Nickname*</Form.Label>
                      <Form.Control type="text" placeholder="Nickname" name='nickname' value={formData.nickname} onChange={updateFormData} />
                      {validated && !formData.nickname && <p className='text-danger'>Enter nickname!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="dname">
                      <Form.Label>Display Name*</Form.Label>
                      <Form.Control type="text" placeholder="Display Name" name='displayName' value={formData.displayName} onChange={updateFormData} />
                      {validated && !formData.displayName && <p className='text-danger'>Enter display name!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 col-12" controlId="bio">
                      <Form.Label>Biographical Info</Form.Label>
                      <Form.Control as="textarea" rows={4} placeholder="Tell us about yourself" name='bio' value={formData.bio} onChange={updateFormData} />                      
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="password">
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
                      {validated && (!formData.password || !passwordRegex.test(formData.password)) && <p className='text-danger'>Password must be at least 8 characters and contain letters and numbers!!</p>                                     }
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="confpassword">
                      <Form.Label>Confirm Password*</Form.Label>
                      <InputGroup>
                        <Form.Control type={showConfirm  ? "text" : "password"} placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={updateFormData} />
                        <InputGroup.Text
                          onClick={() => setShowConfirm (!showConfirm )}
                          style={{ cursor: "pointer", background: "white" }}
                        >
                          {showConfirm  ? <EyeOff size={18} /> : <Eye size={18} />}
                        </InputGroup.Text>                        
                      </InputGroup>       
                      {validated && (!formData.confirmPassword || formData.confirmPassword !== formData.password) && <p className='text-danger'>Confirm Password must match with password!!</p>                 }
                    </Form.Group>
                </div>                
                <button className='primary-btn' onClick={submitForm}>Register</button>
                <p><Link to="/login">Login</Link></p>                
            </Form>
        </div>
    </>
  )
}

export default Register