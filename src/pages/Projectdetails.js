import React from 'react'
import Tabbar from '../components/Tabbar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Projectdetails = () => {
  return (
    <>
      <div className='card-box width-75'>
        <Tabbar />
        <div className='pt-12'>
            <Breadcrumb>
                <Breadcrumb.Item href="#"><span className='breadcrumb-link'>All Projects</span> </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
        </div>        
        <div className='tab-container pt-1 project-sec'>
          <div className='tablinks'>
              <span>All</span> |
              <span>Draft</span> |
              <span>In Progress</span>
          </div>          
          <div className='tab-btn-end'>
            <button className='grey-btn-md'>Suspended</button>
            <button className='primary-btn-md'>Closed</button>
            <Link className="blue-btn-md text-decoration-none text-center" to="/tasks/add">New Task</Link>
          </div>
        </div>
        <div className='pt-12'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <span className='width-100px'>Sort By: </span>                 
                <Form.Select aria-label="Default select example">
                  <option>Deadline proximity</option>
                  <option value="1">Deadline date</option>
                  <option value="2">Priority</option>
                  <option value="3">Title</option>
                  <option value="1">Assignee</option>
                  <option value="2">Modification date</option>
                  <option value="3">Status</option>
                </Form.Select>
            </div>     
            <div>1 Task</div>       
          </div>
          <div className='tab-container pt-4'>
            <div className='list-card'>
                <img src='/img/avatar.png' className='rounded-circle' />
                <div>
                    <p className='task-title mb-1'>Unidigi.com - Code Issue Fixes</p>
                    <p className='task-detail mb-1'>Peggy Star, Peak Studio -Php Membership website Issue fixing</p>
                    <p className='task-detail mb-1'><span className='bg-red'>1</span> <span>Assigned To: Ayush,Amit Kumar,Deepak Kumar,Shubham Patial</span></p>
                    <p className='task-update mb-1'>Mod.: 2025-06-10 17:28 by Sumit Kumar</p>
                </div>
                <div className='comment-sec' style={{ backgroundImage: "url('/img/comment-icon.png')" }} title="3 comments">
                    3
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <p>—</p>
                    <div className='project-status-sec'>
                        <button className='status-btn bg-grey'></button>
                        <div className='center-status'>
                            <button className='status-btn bg-white'></button>
                        </div>                        
                        <button className='status-btn bg-white'></button>
                    </div>
                    <div>In Progress</div>
                </div>
            </div>
          </div>
          <div className='d-flex justify-content-between pt-4'>
            <div>
                <span>Page: </span><span>1</span>
            </div>
            <div className='d-flex justify-content-end align-items-center width-40'>
                <span className='px-4'>Results per page: </span>
                <div className='width-80px'>
                    <Form.Select aria-label="Default select example">
                      <option>5</option>
                      <option value="1">10</option>
                      <option value="2">20</option>
                      <option value="3">50</option>
                      <option value="1">100</option>
                    </Form.Select>
                </div>                
            </div>
          </div>
        </div>        
      </div>      
    </>
  )
}

export default Projectdetails