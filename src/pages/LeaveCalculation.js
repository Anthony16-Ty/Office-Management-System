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
    used_days: "",
    available_days: 0,
  });
  const [editCalculation, setEditCalculation] = useState(null);
  const [leaveTypeData, setLeaveTypeData] = useState([]);

  const handleClose = () => {
    setEditCalculation(null);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("https://oms-api-production-acab.up.railway.app/leave_types")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setLeaveTypeData(data);
        } else {
          throw new Error(
            `Network response was not ok. Response status: ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editCalculation) {
      // Perform update request
      axios
        .put(`https://oms-api-production-acab.up.railway.app/leave_calculations/${editCalculation.id}`, formData)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data;
            handleUpdateCalculation(data);
            setEditCalculation(null);
            handleClose();
          } else {
            throw new Error(`Network response was not ok. Response status: ${response.status}`);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // Perform create request
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
              used_days: "",
              available_days: formData.available_days,
            });
            handleClose();
          } else {
            throw new Error(`Network response was not ok. Response status: ${response.status}`);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type_of_leave") {
      const selectedLeaveType = leaveTypeData.find((type) => type.leave_reason === value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        total_days: selectedLeaveType ? selectedLeaveType.days_allowed : "",
        available_days: selectedLeaveType ? selectedLeaveType.days_allowed - prevState.used_days : 0,
      }));
    } else if (name === "total_days") {
      const totalDays = parseFloat(value);
      const usedDays = parseFloat(formData.used_days);
      const availableDays = totalDays - usedDays;

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        available_days: isNaN(availableDays) ? "" : availableDays.toString(),
      }));
    } else if (name === "used_days") {
      const totalDays = parseFloat(formData.total_days);
      const usedDays = parseFloat(value);
      const availableDays = totalDays - usedDays;

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        available_days: isNaN(availableDays) ? "" : availableDays.toString(),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEdit = (staff) => {
    setEditCalculation(staff);
    setFormData({
      staff_details: staff.staff_name,
      type_of_leave: "",
      total_days: "",
      used_days: "",
      available_days: 0,
    });
    handleShow();
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
                {staffs &&
                  Array.isArray(staffs) &&
                  staffs.map((staff) => (
                    <tr key={staff.id}>
                      <td>{staff.staff_name}</td>
                      <td colSpan={4}>
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Leave Type</th>
                              <th>Total Days</th>
                              <th>Used Days</th>
                              <th>Available Days</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leave_types &&
                              Array.isArray(leave_types) &&
                              leave_types.map((leave_type) => {
                                const leave_calculation = leave_calculations.find(
                                  (calculation) =>
                                    calculation.staff_details === staff.staff_name && calculation.type_of_leave === leave_type.leave_reason
                                );
                                const total_days = leave_type.days_allowed;
                                const used_days = leave_calculation ? leave_calculation.used_days : 0;
                                const available_days = total_days - used_days;
                                return (
                                  <tr key={leave_type.id}>
                                    <td>{leave_type.leave_reason}</td>
                                    <td>{total_days}</td>
                                    <td>{used_days}</td>
                                    <td>{available_days}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Button variant="info" onClick={() => handleEdit(staff)}>
                            Edit
                          </Button>
                          <Button variant="danger" onClick={() => deleteCalculations(staff)}>
                            Delete
                          </Button>
                        </div>
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
              <Modal.Title>{editCalculation ? "Edit Calculation" : "Add Calculation"}</Modal.Title>
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
                          {staff.staff_name}
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
                    {leaveTypeData.map((leaveType) => (
                      <option key={leaveType.id} value={leaveType.leave_reason}>
                        {leaveType.leave_reason}
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
                    {leaveTypeData.map((leaveType) => (
                      <option key={leaveType.id} value={leaveType.days_allowed}>
                        {leaveType.days_allowed}
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
                    onChange={handleChange}

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
                  {editCalculation ? "Update Calculation" : "Generate Calculation"}
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
