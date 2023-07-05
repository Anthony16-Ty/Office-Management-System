import React, { useState } from 'react';
import { Table, Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Timesheet = ({ onUpdateSheet, timesheets, deleteData, tasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    progress_details: '',
    task_id: '',
  });

  const [currentDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1))); // State for current date

  // Function to fetch tasks from the server
  // ...

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !formData.date ||
        !formData.start_time ||
        !formData.end_time ||
        !formData.progress_details ||
        !formData.task_id
      ) {
        setError('Please fill out all the form fields.');
        return;
      }

      const selectedDate = new Date(formData.date);

      if (selectedDate < currentDate) {
        setError('You cannot add a date that is in the past.');
        return;
      }

      const startTime = new Date(`1970-01-01T${formData.start_time}`);
      const endTime = new Date(`1970-01-01T${formData.end_time}`);

      if (endTime < startTime) {
        setError('End time cannot be less than start time.');
        return;
      }

      const response = await axios.post(
        'https://oms-api-production-acab.up.railway.app/timesheets',
        formData
      );
      const data = response.data;
      onUpdateSheet(data);
      setFormData({
        date: '',
        start_time: '',
        end_time: '',
        progress_details: '',
        task_id: '',
      });
      setError('');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate < currentDate) {
      setError('You cannot select a date that is in the past.');
    } else {
      setError('');
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='mx-auto bg-white rounded-lg shadow-lg ml-15 px-3 py-8 pt-3'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 className='text-green text-center'>Timesheets</h3>
        </div>
        <div>
          <Button variant='primary' onClick={() => setShowModal(true)} style={{ marginTop: '10px' }}>
            Add Entry
          </Button>
        </div>
      </div>

      {/* Modal for adding timesheet entry */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Timesheet Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formStartTime'>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type='time'
                name='start_time'
                value={formData.start_time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formEndTime'>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type='time'
                name='end_time'
                value={formData.end_time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formProgress'>
              <Form.Label>Progress Details</Form.Label>
              <Form.Control
                as='textarea'
                name='progress_details'
                value={formData.progress_details}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formTask'>
              <Form.Label>Task</Form.Label>
              <Form.Control
                as='select'
                name='task_id'
                value={formData.task_id}
                onChange={handleChange}
              >
                <option value="">Select Task</option>
                {tasks && Array.isArray(tasks) && tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    ID: {task.id} {task.task_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' style={{ marginTop: '9px' }}>
              Add Entry
            </Button>
          </Form>
          {error && (
            <Alert variant='danger' className='mt-4'>
              {error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>

      {/* Table to display timesheet entries */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Progress Details</th>
            <th>Task ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id}>
              <td>{timesheet.date}</td>
              <td>{new Date(timesheet.start_time).toLocaleTimeString('en-US', { timeStyle: 'short' })}</td>
              <td>{new Date(timesheet.end_time).toLocaleTimeString('en-US', { timeStyle: 'short' })}</td>
              <td>{timesheet.progress_details}</td>
              <td>{timesheet.task_id}</td>
              <td>
                <Button variant='danger' onClick={() => deleteData(timesheet.id)}>
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

export default Timesheet;
