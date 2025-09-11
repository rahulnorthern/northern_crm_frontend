import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import { addCommentApi, getTaskApi, updateTaskApi } from '../services/taskServices';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from "../store/slices/loaderSlice";
import { formatUtcToLocal } from '../services/globalService';
import { History } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Swal from "sweetalert2";

const Taskdetails = () => {
    const location = useLocation();
    const { id, taskId } = useParams();
    const dispatch = useDispatch();
    const [taskdetail, setTaskdetail] = useState(undefined);
    const [files, setFiles] = useState([{ id: 1, file: null }]);
    const taskPage = location.pathname.includes('tasks');
    const [headingLevel, setHeadingLevel] = useState('');
    const [content, setContent] = useState("Type here!!!");
    
    const editor = useEditor({
      extensions: [StarterKit, Underline, Strike, Code],
      content: content,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        setContent(html);
      },
    });

    const handleHeadingChange = (level) => {
      setHeadingLevel(level);
      editor.chain().focus().toggleHeading({ level }).run();
    };

    useEffect(()=>{
        const getTaskDetails = ()=>{
            fetchTaskDetails()
        }

        getTaskDetails();
    }, [])

    const fetchTaskDetails = async ()=>{
      dispatch(showLoader());
      const data = {
          projId: id,
          taskId
      }
      await getTaskApi(data)
      .then((res) =>{
          setTaskdetail(res.task);
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(()=>{
        dispatch(hideLoader());
      })
    }

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

    const updateTaskStatus = async (id, status, crrStatus) => {
      if(status.toLowerCase()!==crrStatus.toLowerCase()){
        dispatch(showLoader());
        await updateTaskApi(id, {status})
        .then(res=>{
          Swal.fire({
            icon: "success",
            title: "Task Status",
            text: res?.message,
            confirmButtonColor: "#3085d6",
          });
          setTaskdetail((prev)=>({
            ...prev,
            status: status.toLowerCase()
          }))
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

    const addComment = async () => {
      if(content){
        dispatch(showLoader());
        await addCommentApi(taskdetail.id, {comment: content})
        .then(res=>{
          editor.commands.setContent("Type here!!!");
          Swal.fire({
            icon: "success",
            title: "Comment",
            text: res?.message,
            confirmButtonColor: "#3085d6",
          });  
          fetchTaskDetails();
        })
        .catch(err=>{
          Swal.fire({
            icon: "error",
            title: "Comment",
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
    <div className='pt-4'>
        {taskdetail!==undefined && (<>
            <div className='d-flex justify-content-between align-items-center'>
                <h5 className='color-primary text-capitalize'>{taskdetail.name}</h5>
                <Link className="blue-btn-md text-decoration-none text-center" to={`${taskPage?'/tasks':`/project-detail/${id}`}`}>Back To List</Link> 
            </div>
            <p className='fw-normal'>
                In {taskdetail.project.name}
            </p>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-between align-items-center'>
                    <img src='/img/avatar.png' className='rounded-circle me-3' alt='avatar' />
                    <div className='fw-normal'>
                        <p className='mb-0 mt-2'>By {taskdetail.createdBy.display_name}</p>
                        <p>{formatUtcToLocal(taskdetail.createdAt)}</p>
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
                        <p className='fw-normal'>{taskdetail.deadline?formatUtcToLocal(taskdetail.deadline).split(",")[0]:'—'}</p>
                    </div>
                    <div className='col-6'>
                        <p className='mb-1'>Assigned To:</p>
                        <p className='fw-normal'>{taskdetail.assignees.map((val, i)=> <span key={`taskassignee-${i}`}>{i>0?',':''} {val.display_name}</span>)}</p>
                    </div>
                    <div className='col-2'>
                        <div className='d-flex justify-content-center'>
                            <div className='project-status-sec mb-1'>
                                <button className={`status-btn ${'bg-grey'}`} title="Click to mark as In Progress" onClick={()=> updateTaskStatus(taskdetail.id, 'progress', taskdetail.status)}></button>
                                <div className='center-status'>
                                    <button className={`status-btn ${taskdetail.status==='suspended'||taskdetail.status==='closed'?'bg-grey':'bg-white'}`} title="Click to mark as Suspended" onClick={()=> updateTaskStatus(taskdetail.id, 'suspended', taskdetail.status)}></button>
                                </div>                        
                                <button className={`status-btn ${taskdetail.status==='closed'?'bg-grey':'bg-white'}`} title="Click to mark as Closed" onClick={()=> updateTaskStatus(taskdetail.id, 'closed', taskdetail.status)}></button>
                            </div>
                        </div>                        
                        <div className='text-center'>{taskdetail.status==='progress'?'In Progress':taskdetail.status.charAt(0).toUpperCase() + taskdetail.status.slice(1)}</div>
                    </div>
                    <div className='col-1 d-flex justify-content-center mt-2'>
                        <div className='color-primary cursor-pointer'><History /></div>
                    </div>
                </div>                
            </div>
            <div className='card border-0 shadow mb-4'>
                <div className='p-3 bg-grey-x rounded fw-normal'>
                    {taskdetail.description}
                </div>                
            </div>
            <div>
               <p className='fs-5 border-bottom mb-0 pb-2'>{taskdetail.comments.length} Comments</p>
               {
                taskdetail.comments.length?(taskdetail.comments.map((comment, i)=>(
                    <>
                        <div key={`comment-${i}`} className='d-flex border-bottom px-2 py-3'>
                          <div>
                            <img src='/img/avatar.png' className='rounded-circle me-3' alt='avatar' />
                          </div>
                          <div>
                            <p className='fw-normal mb-1'>{comment.createdBy.display_name}</p>
                            <p className='text-secondary fw-normal text-12 mb-1'>{formatUtcToLocal(comment.createdAt)}</p>
                            <div className='fw-normal' dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
                          </div>
                        </div>
                    </>
                ))):null
               }
            </div>
            <p className='border-top border-bottom py-2 mt-4'>
                Add a Comment:
            </p>
            <div>
                <div className="flex flex-wrap gap-2 items-center ms-2">
                  <select value={headingLevel} onChange={(e) => handleHeadingChange(Number(e.target.value))} className="px-3 py-1 border rounded height-35">
                    <option value="">Normal</option>
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                  </select>
                  <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-3 py-1 border rounded">B</button>
                  <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-3 py-1 border rounded">I</button>
                  <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-3 py-1 border rounded">U</button>
                  <button onClick={() => editor.chain().focus().toggleStrike().run()} className="px-3 py-1 border rounded">S</button>
                  <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-3 py-1 border rounded">• List</button>
                  <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-3 py-1 border rounded">1. List</button>
                  <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-3 py-1 border rounded">―</button>
                </div>
                <EditorContent editor={editor} style={{ border: '1px solid #ccc', borderRadius: '12px', minHeight: '100px', padding: '10px' }} />
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
                <button className='primary-btn mt-4' onClick={addComment}>Save Comment</button>
            </div>
        </>)}
    </div>
  )
}

export default Taskdetails