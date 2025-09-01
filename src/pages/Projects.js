import React from 'react'
import Tabbar from '../components/Tabbar';
import Datatablecomponent from '../components/Datatablecomponent';
import { Link, Outlet, useLocation } from "react-router-dom";

const ComponentTable = Datatablecomponent(null);

const Projects = () => {
  const location = useLocation();
  const isAddPage = location.pathname.includes("/projects/add");

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true }
  ];

  const data = [
    { id: 1, name: 'Project Name', status: 'In progress' },
    { id: 2, name: 'Project Name1', status: 'In progress' },
    { id: 3, name: 'Project Name', status: 'In progress' }
  ];

  return (
    <>
      <div className='card-box width-75'>
        <Tabbar />
        {isAddPage ? (
          <Outlet />
        ) : (
          <>
            <div className='tab-container pt-12 project-sec'>
              <div className='tablinks'>
                  <span>All</span> |
                  <span>Draft</span> |
                  <span>In Progress</span>
              </div>          
              <div className='tab-btn-end'>
                <button className='grey-btn-md'>Suspended</button>
                <button className='primary-btn-md'>Closed</button>
                <Link className="blue-btn-md text-decoration-none text-center" to="/projects/add">New</Link>
              </div>
            </div>
            <div className='pt-12'>
              <ComponentTable columns={columns} data={data} />
            </div>        
          </>
        )}        
      </div>      
    </>
  )
}

export default Projects