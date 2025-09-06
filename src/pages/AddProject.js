import React, { useEffect, useState } from 'react'
import { Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Swal from "sweetalert2";
import { getUsersApi } from '../services/userService';
import Select from "react-select";
import { createProjectApi } from '../services/projectService';

const initialState = {
    title: "",
    description: "",
    deadline: "",
    startDate: "",
    members: []
}

const AddProject = () => {
    const [formData, setFormData] = useState(initialState);
    const [validated, setValidated] = useState(false);
    const today = new Date().toISOString().split("T")[0];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
      const getUserList = async () => {
        await getUsersApi()
          .then((res) => {
            console.log(res);
            const userOptions = res.map((user) => ({
              value: user.id,
              label: `${user.id} - ${user.display_name} (${user.username})`,
            }));
            setOptions(userOptions);
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message || "Failed to fetch users! Please try again.");
          });
      };
      getUserList();
    }, []);

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setValidated(true);   
        
        if(formData.title && formData.description && formData.deadline && selectedOptions.length) {
            console.log(new Date(formData.deadline).toISOString().split("T")[0], new Date().toISOString().split("T")[0])
          if(new Date(formData.deadline).toISOString().split("T")[0] < new Date().toISOString().split("T")[0]){
            Swal.fire({
                icon: "warning",
                title: "Invalid Date",
                text: "Deadline cannot be in the past!",
                confirmButtonColor: "#3085d6",
            });
            return;
          }
          const postData = {
              name: formData.title,
              description: formData.description,
              deadline: formData.deadline,
              members: selectedOptions.map(op=> op.value)
          }
          console.log(postData);
          createProjectApi(postData)
          .then((res) => {
              console.log(res);                
              setFormData(initialState);
              setValidated(false);
          })
          .catch((err) => {
              console.log(err);
              alert(err.response?.data?.message || "Registration failed! Please try again.");
          });
        }
    }

  return (
    <div className='row pt-12 project-sec'>
        <div className='col-12 d-flex justify-content-between align-items-center'>
            <h3 className='primary-heading'>New Project</h3>
            <Link className="blue-btn-md text-decoration-none text-center" to="/projects">Back To List</Link>            
        </div>
        <div className='col-12 pt-12'>
            <Card>
              <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title.ControlInput">
                      <Form.Label>Title*</Form.Label>
                      <Form.Control type="text" placeholder="Title" name='title' value={formData.title} onChange={updateFormData} />
                      {validated && !formData.title && <p className='text-danger'>Enter Title!!</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Description*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={updateFormData}
                      />
                      {validated && !formData.description && <p className='text-danger'>Enter Description!!</p>}
                    </Form.Group>            
                    <Form.Group className="mb-3" controlId="deadline.ControlInput">
                      <Form.Label>Start Date*</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={updateFormData}
                      />
                      {validated && !formData.startDate && (
                        <p className="text-danger">Select Start Date!!</p>
                      )}
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="deadline.ControlInput">
                      <Form.Label>Deadline*</Form.Label>
                      <Form.Control
                        type="date"
                        min={today}
                        name="deadline"
                        value={formData.deadline}
                        onChange={updateFormData}
                      />
                      {validated && !formData.deadline && (
                        <p className="text-danger">Select Deadline!!</p>
                      )}
                    </Form.Group> 
                    <div className="mb-3">
                      <Form.Label>Members*</Form.Label>
                      <Select
                        isMulti
                        options={options}
                        value={selectedOptions}
                        onChange={setSelectedOptions}
                        placeholder="Select users..."
                      />
                    </div>       
                    <button className='primary-btn p-2' onClick={submitForm}>Submit</button>  
                </Form>
              </Card.Body>
            </Card>
        </div>                
    </div>
  )
}

export default AddProject