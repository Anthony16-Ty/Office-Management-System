import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from 'react-bootstrap';

const Projects = ({handleUpdateProject, projects, deleteProjects, updateData}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    project_name: "",
    client_name: "",
    description: "",
    client_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://oms-api-production.up.railway.app/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Network response was not ok. Response status: ${response.status}`);
        }
      })
      .then(function (data) {
        handleUpdateProject(data);

        setFormData({
          project_name: "",
          client_name: "",
          description: "",
          client_id: "",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    return (
      <div className="container mx-auto bg-white rounded-lg shadow-lg ml-15 pt-3 pb-8">
      <div className="main">
        <div className="flex justify-between items-center my-5">
          <div className="search">
            <form className="inline-flex">
              <input className="form-control mr-2" type="search" placeholder="Search Project" aria-label="Search" />
            </form>
          </div>
          <div className="text-green-500">
            <h5 className="font-bold text-lg">Projects Details</h5>
          </div>
          <div>
            <Button variant="primary" onClick={handleShow} className='mr-5'>
              Add New Project
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Client Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects && Array.isArray(projects) && projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.project_name}</td>
                    <td>{project.client_name}</td>
                    <td>{project.description}</td>
                    <td>
                      <Button variant="danger" onClick={() => deleteProjects(project.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
                   <div class="form-group mt-3">
                        <input type="text" class="form-control" name='project_name' placeholder="Enter Project Name" value={formData.project_name} onChange={handleChange} />
                    </div>
                    <div class="form-group mt-3">
                        <input type="text" class="form-control" name='client_name' placeholder="Enter Client" value={formData.client_name} onChange={handleChange} />
                    </div>
                    <div class="form-group mt-3">
                        <input type="text" class="form-control" name='description' placeholder="Enter Description" value={formData.description} onChange={handleChange}/>
                    </div>
                    <div class="form-group mt-3">
                        <input type="text" class="form-control" name='client_id' placeholder="Enter Client_Id" value={formData.client_id} onChange={handleChange}/>
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

