import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Timesheet = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    taskId: '',
    progress: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimesheets([...timesheets, formData]);
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      taskId: '',
      progress: '',
    });
    setShowModal(false);
  };

  // Handle timesheet deletion
  const handleDelete = (index) => {
    const updatedTimesheets = timesheets.filter((_, i) => i !== index);
    setTimesheets(updatedTimesheets);
  };

  return (
    <div className='timesheets'>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div> <h1>Timesheets</h1></div>
        <div>
          <Button variant="primary" onClick={() => setShowModal(true)} style={{marginTop: "10px"}}>
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
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
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
      

      
      {/* Table to display timesheet entries */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Task ID</th>
            <th>Progress Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>{entry.taskId}</td>
              <td>{entry.progress}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >
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