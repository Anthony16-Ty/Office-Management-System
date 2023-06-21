import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Timesheet = ({onUpdateSheet, sheets, deleteSheet, updateSheet}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    taskId: '',
    progress: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!formData.date || !formData.startTime || !formData.endTime || !formData.taskId || !formData.progress){
        console.log('Please fill out all the form fields.');
        return;
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
    const data = response.data
    onUpdateSheet(data);
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      taskId: '',
      progress: '',
    });
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
    <div className='timesheets'>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div> <h1>Timesheets</h1></div>
        <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
          style={{ marginTop: "10px" }}
        >
  Add Entry
</button>

        </div>
      </div>

      {/* Modal for adding timesheet entry */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Timesheet Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded"
              />
            
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskId">
              <Form.Label>Task ID</Form.Label>
              <Form.Control
                type="text"
                name="taskId"
                value={formData.taskId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProgress">
              <Form.Label>Progress Details</Form.Label>
              <Form.Control
                as="textarea"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: "9px"}}>
              Add Entry
            </Button>
          </Form>
        </Modal.Body>
      </Modal>



<table className="border-collapse border border-gray-300">
  {/* Table header */}
  <thead>
    <tr>
      <th className="border border-gray-300 px-4 py-2">Date</th>
      <th className="border border-gray-300 px-4 py-2">Start Time</th>
      <th className="border border-gray-300 px-4 py-2">End Time</th>
      <th className="border border-gray-300 px-4 py-2">Task ID</th>
      <th className="border border-gray-300 px-4 py-2">Progress Details</th>
      <th className="border border-gray-300 px-4 py-2">Action</th>
    </tr>
  </thead>
  {/* Table body */}
  <tbody>
    <tr>
      <td className="border border-gray-300 px-4 py-2">Data 1</td>
      <td className="border border-gray-300 px-4 py-2">Data 2</td>
      <td className="border border-gray-300 px-4 py-2">Data 3</td>
      <td className="border border-gray-300 px-4 py-2">Data 4</td>
      <td className="border border-gray-300 px-4 py-2">Data 5</td>
      <td className="border border-gray-300 px-4 py-2">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>
    
    </div>
  );
};

export default Timesheet;
