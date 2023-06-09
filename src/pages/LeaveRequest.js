import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function LeaveRequest({ forms, setForms }) {
  const [show, setShow] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleClose = () => setShow(false);

  const updateForm = async (id, newData) => {
    try {
      await axios.put(`https://oms-api-production-acab.up.railway.app/forms/${id}`, newData);
      // Handle success if necessary
    } catch (error) {
      // Handle error if necessary
      console.error('Error updating form:', error);
    }
  };

  const approveForm = async (index) => {
    const form = forms[index];
    const updatedForm = { ...form, status: "Approved" };

    try {
      await updateForm(form.id, updatedForm);
      setForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[index] = updatedForm;
        return updatedForms;
      });
    } catch (error) {
      // Handle error if the update request fails
      console.error("Failed to update form:", error);
    }
  };

  const declineForm = async (id) => {
    const form = forms.find((f) => f.id === id);
    const updatedForm = { ...form, status: "Declined" };

    try {
      await updateForm(id, updatedForm);
      setForms((prevForms) => {
        const updatedForms = prevForms.map((f) => {
          if (f.id === id) {
            return updatedForm;
          }
          return f;
        });
        return updatedForms;
      });
    } catch (error) {
      console.error("Failed to decline form:", error);
    }
  };

  const filterForms = () => {
    const filteredForms = forms.filter((form) => {
      const formDateFrom = new Date(form.date_from);
      const formDateTo = new Date(form.date_to);
      const selectedDateFrom = new Date(dateFrom);
      const selectedDateTo = new Date(dateTo);

      return (
        (!dateFrom || formDateFrom >= selectedDateFrom) &&
        (!dateTo || formDateTo <= selectedDateTo)
      );
    });

    return filteredForms;
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg ml-12 px-5 pb-8 pt-3">
      <style>
        {`
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .status-badge.approved {
          background-color: #4caf50;
          color: #ffffff;
        }

        .status-badge.declined {
          background-color: #f44336;
          color: #ffffff;
        }
        `}
      </style>

      <div className="requests">
        <div className="row">
          <div className="col-md-8 offset-md-2 mt-3 mb-4 text-gred" style={{ color: "green" }}>
            <h5 className='text-center'><b>Leave Request Details</b></h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <div className="d-flex mb-3">
                <input
                  type="date"
                  className="form-control mr-2"
                  placeholder="Date From"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control mr-2"
                  placeholder="Date To"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={filterForms}
                >
                  Filter
                </button>
              </div>
              <table className="table table-striped table-hover table-bordered table-sm">
                <thead>
                  <tr>
                    <th className="text-center align-middle">Staff Name</th>
                    <th className="text-center align-middle">Date From</th>
                    <th className="text-center align-middle">Date To</th>
                    <th className="text-center align-middle">Reason For Leave</th>
                    <th className="text-center align-middle">Leave Type</th>
                    <th className="text-center align-middle">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterForms().map((form, index) => (
                    <tr key={form.id}>
                      <td className="text-center align-middle">{form.your_name}</td>
                      <td className="text-center align-middle">{form.date_from}</td>
                      <td className="text-center align-middle">{form.date_to}</td>
                      <td className="text-center align-middle">{form.reason_for_leave}</td>
                      <td className="text-center align-middle">{form.leaving_type}</td>
                      <td className="text-center align-middle">
                        <span
                          className={`status-badge ${
                            form.status === "Approved"
                              ? "approved"
                              : form.status === "Declined"
                              ? "declined"
                              : ""
                          }`}
                        >
                          {form.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center m-1">
                          <Button
                            variant="success"
                            className="mr-2"
                            onClick={() => approveForm(index)}
                            disabled={form.status === "Approved"}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => declineForm(form.id)}
                            disabled={form.status === "Declined"}
                          >
                            Decline
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Country"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter City"
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Country"
                  />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Add Record
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Model Box Finish */}
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
