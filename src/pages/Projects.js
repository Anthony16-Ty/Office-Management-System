import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Modal } from 'react-bootstrap';
import axios from 'axios';

function Projects({onUpdateProject, projects, deleteData, updateData}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    client: "",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!formData.id || !formData.name || !formData.client || !formData.description){
        console.log('Please fill out all the form fields.');
        return;
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
    const data = response.data
    onUpdateProject(data);
    setFormData({id: "", name: "", client: "", description: ""});
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    return (
      <div class="container ">
        <div className="main">
          <div class="row ">
            <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Project" aria-label="Search"/>
                </form>
              </div>
            </div>
          <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h5><b>Projects Details</b></h5></div>
        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
                Add New Project
            </Button>
        </div>
        </div>
        <div class="row">
            <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Project Id</th>
                            <th>Project Name </th>
                            <th>Client Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>

        <div className="model_box">
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Project Id" onChange={handleChange} />
                    </div>
                   <div class="form-group mt-3">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Project Name" onChange={handleChange}/>
                    </div>
                    <div class="form-group mt-3">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Client" onChange={handleChange}/>
                    </div>
                    <div class="form-group mt-3">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Description" onChange={handleChange}/>
                    </div>

                    <button type="submit" class="btn btn-success mt-4">Add </button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    </div>
  );
}

export default Projects;

