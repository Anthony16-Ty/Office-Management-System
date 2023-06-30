import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Tasks = ({onUpdateTask, tasks, deleteTasks, onUpdate}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    task_name: '',
    assigned_to: '',
    managed_by: '',
    project_id: '',
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://oms-api-production.up.railway.app/tasks', formData)
      .then(function (response) {
        if (response.status === 201) {
          // Assuming the respons
        const data = response.data;
          // Update the tasks state by adding the new task
          onUpdateTask(data);

          // Reset the form data
          setFormData({
            task_name: '',
            assigned_to: '',
            managed_by: '',
            project_id: '',
          });

          // Close the modal
          setShowModal(false);
        } else {
          throw new Error(`Network response was not ok. Response status: ${response.status}`);
        }
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
    <div className='mx-auto bg-white rounded-lg shadow-lg ml-15 px-5 pt-3 pb-8'>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className='text-center text-green'><h3>Tasks</h3></div>
        <div>
          <Button variant="primary" onClick={() => setShowModal(true)} style={{marginTop: "10px"}}>
            Add New Task
          </Button>
        </div>
      </div>

      {/* Modal for adding timesheet entry */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskname">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="task_name"
                value={formData.task_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAssigned">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formManaged">
              <Form.Label>Managed By</Form.Label>
              <Form.Control
                type="text"
                name="managed_by"
                value={formData.managed_by}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formproject">
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                as="textarea"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: "9px"}}>
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>



      {/* Table to display timesheet entries */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Managed By</th>
            <th>Project Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {tasks && Array.isArray(tasks) && tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.task_name}</td>
              <td>{task.assigned_to}</td>
              <td>{task.managed_by}</td>
              <td>{task.project_id}</td>
              <td><Button variant="danger" onClick={() => deleteTasks(task.id)}>
              Delete
            </Button></td>
            </tr>
          ))}

        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
