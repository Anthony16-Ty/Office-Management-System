import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function LeaveHistory({ forms, setForms }) {
  const [show, setShow] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [requestId, setRequestId] = useState("");

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

  const fetchLeaveRequest = async () => {
    try {
      const response = await axios.get(`https://oms-api-production-acab.up.railway.app/forms?staffName=${staffName}&requestId=${requestId}`);
      const leaveRequest = response.data;
      // Handle the retrieved leave request data
    } catch (error) {
      console.error("Error fetching leave request:", error);
      // Handle error if necessary
    }
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
                  {forms &&
                    Array.isArray(forms) &&
                    forms.map((form, index) => (
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
                    type="text"
                    className="form-control"
                    placeholder="Enter Staff Name"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Leave Request ID"
                    value={requestId}
                    onChange={(e) => setRequestId(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={fetchLeaveRequest}
                >
                  Fetch Leave Request
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

export default LeaveHistory;
