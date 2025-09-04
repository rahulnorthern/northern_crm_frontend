import React, { useEffect, useState } from 'react'
import Tabbar from '../components/Tabbar';
import Datatablecomponent from '../components/Datatablecomponent';
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/thunks/projectthunk";

const ComponentTable = Datatablecomponent(null);

const Projects = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAddPage = location.pathname.includes("/projects/add");
  const { list, loading, error } = useSelector((state) => state.project);
  const [data, setData] = useState([]);

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', cell: row => (
        <p><Link to={`/project-detail/${row.id}`} className={`text-decoration-none tablinks w-100`}>{row.name}</Link></p>
      ), sortable: true },
    { name: 'Status', selector: row => row.status?row.status.charAt(0).toUpperCase() + row.status.slice(1):"", sortable: true }
  ];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);  

  useEffect(() => {
    setData(list.projects);
  }, [list]);  

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