import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Timesheet = ({onUpdateSheet, timesheets, deleteData, updateSheet}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    progress_details: '',
    task_id: '',
  });


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!formData.date || !formData.start_time || !formData.end_time || !formData.progress_details || !formData.task_id){
        console.log('Please fill out all the form fields.');
        return;
    }
    const response = await axios.post('https://oms-api-production.up.railway.app/timesheets', formData);
    const data = response.data
    onUpdateSheet(data);
    setFormData({
      date: '',
      start_time: '',
      end_time: '',
      progress_details: '',
      task_id: '',
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
    <div className='mx-auto bg-white rounded-lg shadow-lg ml-15 px-3 py-8 pt-3'>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div> <h3 className='text-green text-center'>Timesheets</h3></div>
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
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
              />
            </Form.Group>
              <Form.Group controlId="formProgress">
              <Form.Label>Progress Details</Form.Label>
              <Form.Control
                as="textarea"
                name="progress_details"
                value={formData.progress_details}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formtask">
              <Form.Label>Task ID</Form.Label>
              <Form.Control
                as="textarea"
                name="task_id"
                value={formData.task_id}
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
            <th>Progress Details</th>
            <th>Task Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id}>
              <td>{timesheet.date}</td>
              <td>{new Date(timesheet.start_time).toLocaleTimeString('en-us')}</td>
              <td>{new Date(timesheet.end_time).ttoLocaleTimeString('en-us')}</td>
              <td>{timesheet.progress_details}</td>
              <td>{timesheet.task_id}</td>
              <td><Button variant="danger" onClick={() => deleteData(timesheet.id)}>
              Delete
            </Button></td>
            </tr>
          ))}

        </tbody>
      </Table>
    </div>
  );
};

export default Timesheet;
