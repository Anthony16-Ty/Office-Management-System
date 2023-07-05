import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function Staff({ handleUpdateStaff, staffs, deleteStaffs, managers }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    staff_name: "",
    joining_date: "",
    reporting_to: "",
    email: "",
    tech_stack: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://oms-api-production-acab.up.railway.app/staffs', formData)
      .then(function (response) {
        if (response.status === 200) {
          const data = response.data;
          handleUpdateStaff(data);
          setFormData({
            staff_name: "",
            joining_date: "",
            reporting_to: "",
            email: "",
            tech_stack: "",
          });
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Perform search logic here
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg ml-15 px-5 pb-8 pt-3">
      <div className="staff-details">
        <div className="row">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Staff"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}>
            <h3>
              <b>Staff Details</b>
            </h3>
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
                {staffs &&
                  Array.isArray(staffs) &&
                  staffs.map((staff) => (
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
              <Modal.Title>Add New Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="staff_name">Staff Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="staff_name"
                    id="staff_name"
                    placeholder="Enter Staff Name"
                    value={formData.staff_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="joining_date">Joining Date</label>
                  <input
                    type="date"
                    className="datePicker"
                    name="joining_date"
                    id="joining_date"
                    placeholder="Enter Joining Date"
                    value={formData.joining_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="reporting_to">Reporting To</label>
                  <select
                    className="form-control"
                    name="reporting_to"
                    id="reporting_to"
                    value={formData.reporting_to}
                    onChange={handleChange}
                  >
                    <option value="">Select Reporting To</option>
                    {managers &&
                      Array.isArray(managers) &&
                      managers.map((manager) => (
                        <option key={manager.id} value={manager.first_name}>
                          {manager.first_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="tech_stack">Enter Your Stack Details</label>
                  <select
                    className="form-control"
                    name="tech_stack"
                    id="tech_stack"
                    value={formData.tech_stack}
                    onChange={handleChange}
                  >
                    <option value="">Select Tech Stack</option>
                    <option value="Stack 1">Full Stack Developer</option>
                    <option value="Stack 2">Frontend Developer</option>
                    <option value="Stack 3">Backend Developer</option>
                    <option value="Stack 4">Mobile Developer</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success mt-4">
                  Add Staff
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

export default Staff;
