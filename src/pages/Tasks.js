import React, { useEffect, useState } from 'react'
import Tabbar from '../components/Tabbar';
import Form from 'react-bootstrap/Form';
import { getTasksApi } from '../services/taskServices';
import { formatUtcToLocal } from '../services/globalService';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const Tasks = () => {
  const location = useLocation();
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState('progress');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isSubPage = location.pathname.split('/').length===4;  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isSubPage){
      const fetchTasks = ()=>{
        getTasksApi()
        .then(res=>{
          setList(res.tasks);
          setTotalCount(res.totalTasks);
          setTotalPage(res.totalPages);
        })
        .catch(err=>{
          console.log(err);
        });
      }

      fetchTasks();
    }    
  }, [isSubPage])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
  };

  const navigateTotask = (taskId, projId) => {
    navigate(`/tasks/${projId}/${taskId}`);
  }

  return (
    <>
      <div className='card-box width-75'>
        <Tabbar pathname="/tasks" />   
        {isSubPage ? (
          <Outlet />
        ) : (
          <>
            <div className='tab-container pt-2 project-sec'>
              {/* <div className='tablinks'>
                  <span>All</span> |
                  <span>Draft</span> |
                  <span>In Progress</span>
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
              {/* <div className='tab-btn-end'>
                <button className='grey-btn-md'>Suspended</button>
                <button className='primary-btn-md'>Closed</button>
                <button className='blue-btn-md'>New Task</button>
              </div> */}
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
                <div>{totalCount} Task</div>       
              </div>
              <div className='pt-4'>
                {list.length && list.map((task, i)=> (
                  <div className='list-card tab-container pt-2' key={`task-list-${i}`}>
                      <img src='/img/avatar.png' className='rounded-circle' />
                      <div>
                          <p className='task-title mb-1 text-capitalize cursor-pointer' onClick={() => navigateTotask(task.id, task.projectId)}>{task.name}</p>
                          <p className='task-detail mb-2'>{task.project.name}</p>
                          <p className='task-detail mb-1'><span className='bg-red me-2'>1</span> <span>Assigned To: {task.assignees.map((assignee, j)=> <React.Fragment key={`assignee-${j}`}>{j>0?', ':null}<span>{assignee.display_name}</span></React.Fragment>)}</span></p>
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
                ))}
              </div>
              <div className='d-flex justify-content-between align-items-center pt-4'>
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
          </>           
        )}                
      </div>      
    </>
  )
}

export default Tasks