import React, { useState } from 'react'
import { Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Swal from "sweetalert2";

const initialState = {
    title: "",
    description: "",
    deadline: ""
}

const AddProject = () => {
    const [formData, setFormData] = useState(initialState);
    const [validated, setValidated] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setValidated(true);   
        console.log(formData)
        if(formData.title && formData.description && formData.deadline) {
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
          try {
            
          } catch (err) {
            console.error("Login failed:", err);
          } finally {
            
          }
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
                    <button className='primary-btn p-2' onClick={submitForm}>Submit</button>  
                </Form>
              </Card.Body>
            </Card>
        </div>                
    </div>
  )
}

export default AddProject