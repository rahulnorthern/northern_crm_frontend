import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from '../layouts/Main';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';
import Updates from '../pages/Updates';
import Login from '../pages/Login';
import Projectdetails from '../pages/Projectdetails';
import Register from '../pages/Register';
import ProtectedRoute from "./ProtectedRoute";
import AddProject from '../pages/AddProject';
import AddTask from '../pages/AddTask';
import Taskdetails from '../pages/Taskdetails';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const Routersetup = () => {
    
  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Main />}>
                    <Route path='' element={<Login />}></Route>
                    <Route path='login' element={<Login />}></Route>
                    <Route path='register' element={<Register />}></Route>
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>                  
                        <Route path="profile" element={<Profile />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="projects" element={<Projects />} >
                            <Route path="add" element={<AddProject />} />
                        </Route>                        
                        <Route path="project-detail/:id" element={<Projectdetails />} >
                            <Route path="add-task" element={<AddTask />} />
                            <Route path="task/:taskId" element={<Taskdetails />} />
                        </Route>
                        <Route path="tasks" element={<Tasks />} >
                            <Route path=":id/:taskId" element={<Taskdetails />} />
                        </Route>
                        <Route path="updates" element={<Updates />} />                  
                    </Route>
                </Route>                
            </Routes>
        </Router>
    </>
  )
}

export default Routersetup