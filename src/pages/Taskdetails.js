import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import { getTaskApi } from '../services/taskServices';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from "../store/slices/loaderSlice";
import { formatUtcToLocal } from '../services/globalService';
import { History } from "lucide-react";

const Taskdetails = () => {
    const location = useLocation();
    const { id, taskId } = useParams();
    const dispatch = useDispatch();
    const [taskdetails, settaskdetails] = useState(undefined);
    const [files, setFiles] = useState([{ id: 1, file: null }]);
    const taskPage = location.pathname.includes('tasks');

    useEffect(()=>{
        dispatch(showLoader());
        const data = {
            projId: id,
            taskId
        }

        const getTaskDetails = ()=>{
            getTaskApi(data)
            .then((res) =>{
                settaskdetails(res.task);
            })
            .catch((err) =>{
              console.log(err);
            })
            .finally(()=>{
              dispatch(hideLoader());
            })
        }

        getTaskDetails();
    }, [])

    const handleFileChange = (id, event) => {
      const updatedFiles = files.map((f) =>
        f.id === id ? { ...f, file: event.target.files[0] } : f
      );
      setFiles(updatedFiles);
    };

    const handleAddMore = () => {
      if (files.length < 3) {
        setFiles([...files, { id: Date.now(), file: null }]);
      }
    };

  return (
    <div className='pt-4'>
        {taskdetails!==undefined && (<>
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className='color-primary text-capitalize'>{taskdetails.name}</h5>
                <Link className="blue-btn-md text-decoration-none text-center" to={`${taskPage?'/tasks':`/project-detail/${id}`}`}>Back To List</Link> 
            </div>
            <p className='fw-normal'>
                In {taskdetails.project.name}
            </p>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-between align-items-center'>
                    <img src='/img/avatar.png' className='rounded-circle me-3' alt='avatar' />
                    <div className='fw-normal'>
                        <p className='mb-0 mt-2'>By {taskdetails.createdBy.display_name}</p>
                        <p>{formatUtcToLocal(taskdetails.createdAt)}</p>
                    </div>
                </div>                
                <div className='d-flex align-items-center'>
                    <button className='grey-btn-md me-2'>Edit</button>
                    <button className='primary-btn-md'>Comment</button>
                </div>
            </div>
            <div className='card p-3 shadow border-0 mb-4'>
                <div className='d-flex'>
                    <div className='col-1'>
                        <p className='mb-1'>Priority:</p>
                        <p><span className='bg-red'>1</span></p>
                    </div>
                    <div className='col-2'>
                        <p className='mb-1'>Deadline:</p>
                        <p className='fw-normal'>{taskdetails.deadline?formatUtcToLocal(taskdetails.deadline).split(",")[0]:'—'}</p>
                    </div>
                    <div className='col-6'>
                        <p className='mb-1'>Assigned To:</p>
                        <p className='fw-normal'>{taskdetails.assignees.map((val, i)=> <span key={`taskassignee-${i}`}>{i>0?',':''} {val.display_name}</span>)}</p>
                    </div>
                    <div className='col-2'>
                        <div className='d-flex justify-content-center'>
                            <div className='project-status-sec mb-1'>
                                <button className={`status-btn ${'bg-grey'}`}></button>
                                <div className='center-status'>
                                    <button className={`status-btn ${taskdetails.status==='suspended'||taskdetails.status==='closed'?'bg-grey':'bg-white'}`}></button>
                                </div>                        
                                <button className={`status-btn ${taskdetails.status==='closed'?'bg-grey':'bg-white'}`}></button>
                            </div>
                        </div>                        
                        <div className='text-center'>{taskdetails.status==='progress'?'In Progress':taskdetails.status.charAt(0).toUpperCase() + taskdetails.status.slice(1)}</div>
                    </div>
                    <div className='col-1 d-flex justify-content-center mt-2'>
                        <div className='color-primary cursor-pointer'><History /></div>
                    </div>
                </div>                
            </div>
            <div className='card border-0 shadow mb-4'>
                <div className='p-3 bg-grey-x rounded fw-normal'>
                    {taskdetails.description}
                </div>                
            </div>
            <div>
               <p className='fs-5 border-bottom pb-3'>{taskdetails.comments.length} Comments</p>
               {
                taskdetails.comments.length?(taskdetails.comments.map((comment, i)=>(
                    <>
                        <div key={`comment-${i}`}>

                        </div>
                    </>
                ))):null
               }
            </div>
            <p className='border-top border-bottom py-2 mt-4'>
                Add a Comment:
            </p>
            <div>
                <textarea className='col-12' />
            </div>
            <div className='mt-3 d-flex'>
                <label className='me-2'>Add a File:</label>
                <div>
                    {files.map((fileItem, index) => (
                      <div key={fileItem.id} className="mb-2 d-flex align-items-center">
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(fileItem.id, e)}
                        />
                        {fileItem.file && (
                          <span className="ms-2">{fileItem.file.name}</span>
                        )}
                      </div>
                    ))}
                </div>
                {files.length < 3 && (
                  <span
                    className="cursor-pointer color-primary"
                    style={{ userSelect: "none" }}
                    onClick={handleAddMore}
                  >
                    + Add More
                  </span>
                )}
            </div>
            <div>
                <button className='primary-btn mt-4'>Save Comment</button>
            </div>
        </>)}
    </div>
  )
}

export default Taskdetails