import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Tasks = ({ onUpdateTask, tasks, deleteTasks, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [formData, setFormData] = useState({
    task_name: '',
    assigned_to: '',
    managed_by: '',
    project_id: '',
  });

  const handleAddTask = () => {
    setShowModal(true);
    setEditMode(false);
    setFormData({
      task_name: '',
      assigned_to: '',
      managed_by: '',
      project_id: '',
    });
  };

  const handleEditTask = (task) => {
    setShowModal(true);
    setEditMode(true);
    setEditTaskId(task.id);
    setFormData({
      task_name: task.task_name,
      assigned_to: task.assigned_to,
      managed_by: task.managed_by,
      project_id: task.project_id,
    });
  };

  const handleSaveTask = () => {
    if (editMode) {
      // Send a request to update the task
      axios
        .put(`https://oms-api-production-acab.up.railway.app/tasks/${editTaskId}`, formData)
        .then(function (response) {
          if (response.status === 200) {
            // Assuming the response contains the updated data
            const data = response.data;
            // Update the tasks state with the updated task
            onUpdateTask(data);
            // Close the modal
            setShowModal(false);
          } else {
            throw new Error(
              `Network response was not ok. Response status: ${response.status}`
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // Send a request to add a new task
      axios
        .post('https://oms-api-production-acab.up.railway.app/tasks', formData)
        .then(function (response) {
          if (response.status === 201) {
            // Assuming the response contains the new data
            const data = response.data;
            // Update the tasks state by adding the new task
            onUpdateTask(data);
            // Close the modal
            setShowModal(false);
          } else {
            throw new Error(
              `Network response was not ok. Response status: ${response.status}`
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='mx-auto bg-white rounded-lg shadow-lg ml-15 px-5 pt-3 pb-8'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='text-center text-green'>
          <h3>Tasks</h3>
        </div>
        <div>
          <Button
            variant='primary'
            onClick={handleAddTask}
            style={{ marginTop: '10px', marginBottom: '3px' }}
          >
            Add New Task
          </Button>
        </div>
      </div>

      {/* Modal for adding/editing task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveTask}>
            <Form.Group controlId='formTaskname'>
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type='text'
                name='task_name'
                value={formData.task_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formAssigned'>
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type='text'
                name='assigned_to'
                value={formData.assigned_to}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formManaged'>
              <Form.Label>Managed By</Form.Label>
              <Form.Control
                type='text'
                name='managed_by'
                value={formData.managed_by}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formproject'>
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                as='textarea'
                name='project_id'
                value={formData.project_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit' style={{ marginTop: '9px' }}>
              {editMode ? 'Save Changes' : 'Add Task'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Table to display tasks */}
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
          {tasks &&
            Array.isArray(tasks) &&
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task_name}</td>
                <td>{task.assigned_to}</td>
                <td>{task.managed_by}</td>
                <td>{task.project_id}</td>
                <td>
                  <Button
                    variant='warning'
                    onClick={() => handleEditTask(task)}
                    style={{ marginRight: '5px' }}
                  >
                    Edit
                  </Button>
                  <Button variant='danger' onClick={() => deleteTasks(task.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
