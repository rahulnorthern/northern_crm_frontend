import React, { useEffect, useState } from 'react'
import Tabbar from '../components/Tabbar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { getProjectApi } from '../services/projectService';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from "../store/slices/loaderSlice";

const Projectdetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(undefined);
  const [taskscount, setTaskscount] = useState(0);
  const isSubPage = location.pathname.includes("task");
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location.pathname.includes("task")){
      dispatch(showLoader());
      const getProjectDetails = ()=>{
        getProjectApi(id)
        .then((res) =>{
          setProjectDetails(res.project);
          setTaskscount(res.totalTasks);
        })
        .catch((err) =>{
          console.log(err);
        })
        .finally(()=>{
          dispatch(hideLoader());
        })
      }

      getProjectDetails();
    }    
  }, [isSubPage])

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
              <div className='tablinks'>
                  <span className='me-2'>All Tasks</span> |
                  <span className='mx-2'>Draft</span> |
                  <span className='mx-2'>In Progress</span>
              </div>          
              <div className='tab-btn-end'>
                <button className='grey-btn-md'>Suspended</button>
                <button className='primary-btn-md'>Closed</button>
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
                        <p className='task-title mb-1 cursor-pointer' onClick={() => navigateTotask(task.id)}>{task.name}</p>
                        <p className='task-detail mb-1'>{task.description}</p>
                        <p className='task-detail mb-1'><span className='bg-red'>1</span> <span>Assigned To: {task.assignees.map((assignee, j)=> <>{j>0?', ':null}<span key={`assignee-${j}`}>{assignee.display_name}</span></>)}</span></p>
                        <p className='task-update mb-1'>{task.updatedAt===task.createdAt?`Add.: ${formatUtcToLocal(task.createdAt)} by ${task.createdBy.display_name}`:`Mod.: ${formatUtcToLocal(task.updatedAt)} by ${task.updatedBy.display_name}`}</p>
                    </div>
                    <div className='comment-sec' style={{ backgroundImage: "url('/img/comment-icon.png')" }} title="3 comments">
                        {task.commentsCount}
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p>—</p>
                        <div className='project-status-sec'>
                            <button className={`status-btn ${'bg-grey'}`}></button>
                            <div className='center-status'>
                                <button className={`status-btn ${task.status==='suspended'||task.status==='closed'?'bg-grey':'bg-white'}`}></button>
                            </div>                        
                            <button className={`status-btn ${task.status==='closed'?'bg-grey':'bg-white'}`}></button>
                        </div>
                        <div>{task.status==='progress'?'In Progress':task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
                    </div>
                </div>
              </div>))}
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