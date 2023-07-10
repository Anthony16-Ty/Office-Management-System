import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from 'react-bootstrap';

const Projects = ({ projects, deleteProjects, handleUpdateProject, handleUpdateProjects, clients }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    client_details: "",
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingProject
      ? `https://oms-api-production-acab.up.railway.app/projects/${editingProject.id}`
      : 'https://oms-api-production-acab.up.railway.app/projects';

    const method = editingProject ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Network response was not ok. Response status: ${response.status}`);
        }
      })
      .then(function (data) {
        if (editingProject) {
          // Update the existing project
          handleUpdateProject(data);
          setEditingProject(null);
        } else {
          // Create a new project
          handleUpdateProjects(data);
        }

        setFormData({
          project_name: "",
          description: "",
          client_details: "",
        });
        handleClose();
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

  const updateData = (project) => {
    setEditingProject(project);
    setFormData({
      project_name: project.project_name,
      description: project.description,
      client_details: project.client_details,
    });
    handleShow();
  };

  return (
    <div className="container mx-auto bg-white rounded-lg shadow-lg ml-15 pt-3 pb-8">
      <div className="main">
        <div className="flex justify-between items-center my-5">
          <div className="search">
            <form className="inline-flex">
              <input
                className="form-control mr-2"
                type="search"
                placeholder="Search Project"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>
          </div>
          <div className="text-green-500">
            <h5 className="font-bold text-lg">Projects Details</h5>
          </div>
          <div>
            <Button variant="primary" onClick={handleShow} className="mr-2">
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
                  <th>Description</th>
                  <th>Client Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.project_name}</td>
                    <td>{project.description}</td>
                    <td>{project.client_details}</td>
                    <td>
                      <Button variant="info" onClick={() => updateData(project)}>
                        Edit
                      </Button>
                      <Button variant="danger" className="ml-2" onClick={() => deleteProjects(project.id)}>
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
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="project_name"
                    placeholder="Enter Project Name"
                    value={formData.project_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="client_details">Client Name</label>
                  <select
                    className="form-control"
                    name="client_details"
                    id="client_details"
                    value={formData.client_details}
                    onChange={handleChange}
                  >
                    <option value="">Select Client</option>
                    {clients &&
                      Array.isArray(clients) &&
                      clients.map((client) => (
                        <option key={client.id} value={client.client_name}>
                          ID: {client.id} Name: {client.client_name}
                        </option>
                      ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  {editingProject ? 'Save Changes' : 'Add Project'}
                </button>
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
