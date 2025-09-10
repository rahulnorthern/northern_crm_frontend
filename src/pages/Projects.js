import React, { useEffect, useState } from 'react'
import Tabbar from '../components/Tabbar';
import Datatablecomponent from '../components/Datatablecomponent';
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/thunks/projectthunk";
import { Form } from "react-bootstrap";

const ComponentTable = Datatablecomponent(null);

const Projects = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAddPage = location.pathname.includes("/projects/add");
  const { list, totalRows } = useSelector((state) => state.project);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('progress');
  const [myProj, setMyProj] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const {role} = useSelector((state) => state.auth);

  const customTableStyles = {
    table: {
      style: {
        border: "1px solid #f2f5f7",
        borderRadius: "0rem",
        color: "#181818",          
        overflow: "hidden",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#FFFFFF",          
        fontWeight: "700",
        fontSize: "14px",
        borderBottom: "1px solid #f2f5f7",
        minHeight: "52px",
      },
    },
    headCells: {
      style: {
        borderRight: "1px solid #f2f5f7",
        fontWeight: "600",
        color: "#000000",
        "&:last-child": {
          borderRight: "none",
        },
      },
    },
    rows: {
      style: {
        cursor: "pointer",
        borderBottom: "1px solid #f2f5f7",
        fontWeight: "400",
        fontSize: "12px",
        transition: "background-color 0.2s ease",
        "&:last-child": {
          borderBottom: "none",
        },        
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        borderRight: "1px solid #f2f5f7",        
        "&:last-child": {
          borderRight: "none",
        },
      },
    },
    pagination: {
      style: {
        borderTop: "none",
        marginTop: "0px",
      },
    },
  }

  const columns = [
    { name: 'ID', width: "10%", selector: row => row.id, sortable: true },
    { name: 'Name', width: "70%", cell: row => (
        <p className='mt-3'><Link to={`/project-detail/${row.id}`} className={`text-decoration-none tablinks w-100 d-flex align-items-center fw-semibold text-16`}>{row.name}</Link></p>
      ), sortable: true },
    { name: 'Status', width: "80%", selector: row => row.status?row.status.charAt(0).toUpperCase() + row.status.slice(1):"", sortable: true }
  ];

  useEffect(() => {
    if(role){
      let filterOption = {
        filter: filter,
        currentPage,
        rowsPerPage,      
      }
      
      if(role==='admin'){
        filterOption.myProj = myProj?true:false
      }

      dispatch(fetchProjects(filterOption));
    }   
  }, [dispatch, filter, myProj, currentPage, rowsPerPage, role]);  

  useEffect(() => {
    setTotalCount(totalRows);
    const projectList = list.map(val=> {
      const projStatus = val.status==='progress'?'In Progress':val.status
      return {...val, status: projStatus}
    });
    setData(projectList);
  }, [list]);  

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleMyProjFilter = (event) => {
    setMyProj(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  return (
    <>
      <div className='card-box width-75'>
        <Tabbar pathname="/projects" />               
        {isAddPage ? (
          <Outlet />
        ) : (
          <>
            <div className='tab-container pt-12 project-sec'>
              {/* <div className='tablinks'>
                  <span>All</span> |
                  <span>Draft</span> |
                  <span>In Progress</span>                       
              </div>           */}
              <div className='d-flex align-items-center col-8'>
                <div>
                  <Form.Label className='me-2'>Filter:</Form.Label>
                </div>                
                <div className='col-4 me-2'>
                  <Form.Select aria-label="Filter" value={filter} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="draft">Draft</option>
                    <option value="progress">In Progress</option>
                    <option value="suspended">Suspended</option>
                    <option value="closed">Closed</option>
                  </Form.Select>                
                </div>  
                {role==='admin' && <div className='col-3'>
                  <Form.Select aria-label="Filter" value={myProj} onChange={handleMyProjFilter}>
                    <option value="">All</option>
                    <option value="my">My Projects</option>
                  </Form.Select>   
                </div>}          
              </div>
              <div className='tab-btn-end'>
                {/* <button className='grey-btn-md'>Suspended</button>
                <button className='primary-btn-md'>Closed</button>   */}
                <Link className="blue-btn-md text-decoration-none text-center" to="/projects/add">New</Link>              
              </div>
            </div>
            <div className='pt-12'>
              <ComponentTable columns={columns} data={data}
               customStyles={customTableStyles}
               onChangePage={handlePageChange} 
               onChangeRowsPerPage={handleRowsPerPageChange}
               paginationTotalRows={totalCount} />
            </div>        
          </>
        )}        
      </div>      
    </>
  )
}

export default Projects