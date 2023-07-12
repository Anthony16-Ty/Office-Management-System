import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function LeaveCalculation({ handleUpdateCalculation, leave_types, leave_calculations, deleteCalculations, staffs, dashboardType }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    staff_details: "",
    type_of_leave: "",
    total_days: "",
    used_days: 0,
    available_days: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://oms-api-production-acab.up.railway.app/leave_calculations', formData)
      .then(function (response) {
        if (response.status === 201) {
          const data = response.data;
          handleUpdateCalculation(data);
          setFormData({
            staff_details: "",
            type_of_leave: "",
            total_days: "",
            used_days: formData.used_days,
            available_days: formData.available_days,
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
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                />
              </form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}>
            <h3>
              <b>Leave Calculations</b>
            </h3>
          </div>
            <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add Calculation Countdown
              </Button>
            </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered table-sm">
              <thead>
                <tr>
                  <th>Staff Details</th>
                  <th>Leave Type</th>
                  <th>Total Days</th>
                  <th>Used Days</th>
                  <th>Available Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leave_calculations &&
                  Array.isArray(leave_calculations) &&
                  leave_calculations.map((leave_calculation) => (
                    <tr key={leave_calculation.id}>
                      <td>{leave_calculation.staff_details}</td>
                      <td>{leave_calculation.type_of_leave}</td>
                      <td>{leave_calculation.total_days}</td>
                      <td>{leave_calculation.used_days}</td>
                      <td>{leave_calculation.available_days}</td>

                        <td>
                          <Button variant="danger" onClick={() => deleteCalculations(leave_calculation.id)}>
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
              <Modal.Title>Add Calculation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="staff_details">Staff Details</label>
                  <select
                    className="form-control"
                    name="staff_details"
                    id="staff_details"
                    value={formData.staff_details}
                    onChange={handleChange}
                  >
                    <option value="">Select Staff</option>
                    {staffs &&
                      Array.isArray(staffs) &&
                      staffs.map((staff) => (
                        <option key={staff.id} value={staff.staff_name}>
                          ID: {staff.id} Name: {staff.staff_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="type_of_leave">Leave Type</label>
                  <select
                    className="form-control"
                    name="type_of_leave"
                    id="type_of_leave"
                    value={formData.type_of_leave}
                    onChange={handleChange}
                  >
                    <option value="">Select Leave Type</option>
                    {leave_types &&
                      Array.isArray(leave_types) &&
                      leave_types.map((leave_type) => (
                        <option key={leave_type.id} value={leave_type.leave_reason}>
                          {leave_type.leave_reason}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="total_days">Total Days</label>
                  <select
                    className="form-control"
                    name="total_days"
                    id="total_days"
                    value={formData.total_days}
                    onChange={handleChange}
                  >
                    <option value="">Select Total Days Allowed</option>
                    {leave_types &&
                      Array.isArray(leave_types) &&
                      leave_types.map((leave_type) => (
                        <option key={leave_type.id} value={leave_type.days_allowed}>
                          {leave_type.days_allowed}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="used_days">Used Days</label>
                  <input
                    type="used_days"
                    className="form-control"
                    name="used_days"
                    id="used_days"
                    placeholder="Enter Used Days"
                    value={formData.used_days}
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="available_days">Available Days</label>
                  <input
                    type="text"
                    className="form-control"
                    name="available_days"
                    id="available_days"
                    placeholder="Available Days"
                    value={formData.available_days}
                    disabled
                  />
                </div>

                  <button type="submit" className="btn btn-success mt-4">
                    Generate Calculation
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

export default LeaveCalculation;
