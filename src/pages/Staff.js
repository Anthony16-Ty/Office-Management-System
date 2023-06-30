import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'

function Staff({handleUpdateStaff, staffs, deleteStaffs, updateStaff}) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    staff_name: "",
    joining_date: "",
    reporting_to: "",
    email: "",
    password: "",
    password_confirmation: "",
    tech_stack: "",
    isStaff: "",
    admin_id: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://oms-api-production.up.railway.app/staffs', formData)
      .then(function (response) {
        if (response.status === 200) {
          // Assuming the respons
        const data = response.data;
          // Update the tasks state by adding the new task
          handleUpdateStaff(data);

          // Reset the form data
          setFormData({
            staff_name: "",
            joining_date: "",
            reporting_to: "",
            email: "",
            password: "",
            password_confirmation: "",
            tech_stack: "",
            isStaff: "",
            admin_id: "",
          });

          // Close the modal
          // setShowModal(false);
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
    <div className="mx-auto bg-white rounded-lg shadow-lg ml-15 px-5 pb-8 pt-3">
      <div className="staff-details">
        <div className="row">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Staff" aria-label="Search" />
              </form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}>
            <h3><b>Staff Details</b></h3>
          </div>
          <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Staff
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Joining Date</th>
                  <th>Report To</th>
                  <th>Tech Stack</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffs && Array.isArray(staffs) && staffs.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.staff_name}</td>
                    <td>{staff.joining_date}</td>
                    <td>{staff.reporting_to}</td>
                    <td>{staff.tech_stack}</td>
                    <td>
                      <Button variant="danger" onClick={() => deleteStaffs(staff.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="model_box">
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" name='staff_name' placeholder="Enter Project Name" value={formData.staff_name} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="date" className="datePicker" name='joining_date' placeholder="Enter Joining Date" value={formData.joining_date} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name='reporting_to' placeholder="Reporting To" value={formData.reporting_to} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name='email' placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="password" className="form-control" name='password' placeholder="Create Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="password" className="form-control" name='password_confirmation' placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name='tech_stack' placeholder="Enter Your Stack Details" value={formData.tech_stack} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name='isStaff' placeholder="isStaff" value={formData.isStaff} onChange={handleChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name='admin_id' placeholder="Admin ID" value={formData.admin_id} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success mt-4">Add Staff</button>
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

export default Staff;
