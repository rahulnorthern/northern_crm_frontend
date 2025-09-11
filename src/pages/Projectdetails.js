import React, { useEffect, useState } from 'react'
import Tabbar from '../components/Tabbar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { getProjectApi } from '../services/projectService';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from "../store/slices/loaderSlice";
import Swal from "sweetalert2";
import { updateTaskApi } from '../services/taskServices';

const Projectdetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [filter, setFilter] = useState('progress');
  const [projectDetails, setProjectDetails] = useState(undefined);
  const [taskscount, setTaskscount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pagesArr, setPagesArr] = useState([]);
  const [updateTaskCalled, setUpdateTaskCalled] = useState(false);
  const isSubPage = location.pathname.includes("task");
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location.pathname.includes("task")){
      dispatch(showLoader());

      const getProjectDetails = async ()=>{
        await fetchProjectDetails();
      }

      getProjectDetails();
    }    
  }, [isSubPage, filter, currentPage, rowsPerPage])

  useEffect(()=>{
    if(updateTaskCalled){
      const callProjDetails = async ()=>{
        await fetchProjectDetails();
        setUpdateTaskCalled(false);
      }
      callProjDetails();
    }
  }, [updateTaskCalled])

  const fetchProjectDetails = async ()=>{
    let filterOption = {
      filter,
      currentPage,
      rowsPerPage,      
    }
    await getProjectApi(id, filterOption)
    .then((res) =>{
      setProjectDetails(res.project);
      setTaskscount(res.totalTasks);
      const totalPages = Math.ceil(res.totalTasks/rowsPerPage);
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      setPagesArr(pages);
    })
    .catch((err) =>{
      console.log(err);          
    })
    .finally(()=>{
      dispatch(hideLoader());
    })
  }

  const formatUtcToLocal = (utcDateString)=> {
    const date = new Date(utcDateString);
    
    const localDate = date.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
      hour12: true
    });

    return localDate;
  }

  const navigateTotask = (taskId) => {
    navigate(`/project-detail/${id}/task/${taskId}`);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
  };

  const getPageNoStyle = (pageNo)=>{
    return currentPage===pageNo?'bg-clr-primary text-white':'color-primary'    
  }

  const updateTaskStatus = async (id, status, crrStatus) => {
    if(status.toLowerCase()!==crrStatus.toLowerCase()){
      dispatch(showLoader());
      await updateTaskApi(id, {status})
      .then(res=>{
        setUpdateTaskCalled(true);
        Swal.fire({
          icon: "success",
          title: "Task Status",
          text: res?.message,
          confirmButtonColor: "#3085d6",
        });
      })
      .catch(err=>{
        Swal.fire({
          icon: "error",
          title: "Task Status",
          text: err?.message || 'Something went wrong!!',
          confirmButtonColor: "#3085d6",
        });
      })
      .finally(()=>{
        dispatch(hideLoader());
      })
    }
  }

  return (
    <>
      <div className='card-box width-75'>
        <Tabbar pathname="/projects" />
        {isSubPage ? (
          <Outlet />
        ) : (
          <>
            <div className='pt-12'>
                <Breadcrumb style={{ "--bs-breadcrumb-divider": "'>'" }}>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projects" }}><span className='breadcrumb-link'>All Projects</span> </Breadcrumb.Item>
                    <Breadcrumb.Item active>{projectDetails?.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>        
            {projectDetails?.description?(<div className='mb-4 card p-3 shadow bg-body-tertiary rounded'>
              {projectDetails.description}
            </div>):null}
            <div className='tab-container pt-1 project-sec'>
              {/* <div className='tablinks'>
                  <span className='me-2'>All Tasks</span> |
                  <span className='mx-2'>Draft</span> |
                  <span className='mx-2'>In Progress</span>
              </div>           */}
              <div className='d-flex align-items-center col-4'>
                <Form.Label className='me-2'>Filter:</Form.Label>
                <Form.Select aria-label="Filter" value={filter} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="draft">Draft</option>
                  <option value="progress">In Progress</option>
                  <option value="suspended">Suspended</option>
                  <option value="closed">Closed</option>
                </Form.Select>
              </div>
              <div className='tab-btn-end'>
                {/* <button className='grey-btn-md'>Suspended</button>
                <button className='primary-btn-md'>Closed</button> */}
                <Link className="blue-btn-md text-decoration-none text-center" to={`/project-detail/${projectDetails?.id}/add-task`}>New Task</Link>
              </div>
            </div>
            {projectDetails && projectDetails.tasks.length?(<div className='pt-12'>
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
                <div>{taskscount} Tasks</div>       
              </div>
              {projectDetails.tasks.map((task, i)=>(<div key={`task-${i}`} className='tab-container pt-4'>
                <div className='list-card'>
                    <img src='/img/avatar.png' className='rounded-circle' />
                    <div>
                        <p className='task-title mb-1 cursor-pointer text-capitalize' onClick={() => navigateTotask(task.id)}>{task.name}</p>
                        <p className='task-detail mb-1'>{task.description}</p>
                        <p className='task-detail mb-1'><span className={`${task.priority===1?'bg-red':(task.priority===2?'bg-yellow':'bg-green')}`}>{task.priority}</span> <span>Assigned To: {task.assignees.map((assignee, j)=> <React.Fragment key={`assignee-${j}`}>{j>0?', ':null}<span>{assignee.display_name}</span></React.Fragment>)}</span></p>
                        <p className='task-update mb-1'>{task.updatedAt===task.createdAt?`Add.: ${formatUtcToLocal(task.createdAt)} by ${task.createdBy.display_name}`:`Mod.: ${formatUtcToLocal(task.updatedAt)} by ${task.updatedBy.display_name}`}</p>
                    </div>
                    <div className='comment-sec' style={{ backgroundImage: "url('/img/comment-icon.png')" }} title="3 comments">
                        {task.commentsCount}
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p>—</p>
                        <div className='project-status-sec'>
                            <button className={`status-btn ${'bg-grey'}`} title="Click to mark as In Progress" onClick={()=> updateTaskStatus(task.id, 'progress', task.status)}></button>
                            <div className='center-status'>
                                <button className={`status-btn ${task.status==='suspended'||task.status==='closed'?'bg-grey':'bg-white'}`}  title="Click to mark as Suspended" onClick={()=> updateTaskStatus(task.id, 'suspended', task.status)}></button>
                            </div>                        
                            <button className={`status-btn ${task.status==='closed'?'bg-grey':'bg-white'}`} title="Click to mark as Closed" onClick={()=> updateTaskStatus(task.id, 'closed', task.status)}></button>
                        </div>
                        <div>{task.status==='progress'?'In Progress':task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
                    </div>
                </div>
              </div>))}
              <div className='d-flex justify-content-between align-items-center pt-4'>
                <div>
                    <span>Page: </span>
                    {pagesArr.length && pagesArr.map((pageNo, i)=> <span key={`page-${i}`} className={`px-1 me-2 cursor-pointer ${getPageNoStyle(pageNo)}`} onClick={()=>handlePageChange(pageNo)}>{pageNo}</span>)}
                </div>
                <div className='d-flex justify-content-end align-items-center width-40'>
                    <span className='px-4'>Results per page: </span>
                    <div className='width-80px'>
                        <Form.Select aria-label="Default select example" value={rowsPerPage} onChange={handleRowsPerPageChange}>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </Form.Select>
                    </div>                
                </div>
              </div>
            </div>):(
              <div className='pt-12 text-center'>
                No tasks available
              </div>
            )} 
          </>
        )}           
      </div>      
    </>
  )
}

export default Projectdetails