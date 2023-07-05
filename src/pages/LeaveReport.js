import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';

function LeaveReport({ leave_types, deleteLeave, updateLeave }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg ml-12 px-5 pb-8 pt-3">
      <div className="leave-types">
        <div className="row">
          <div className="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{ color: "green" }}>
            <h5 className='text-center'><b>Leave Report</b></h5>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered table-sm">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Days Allowed</th>
                  <th>Staff ID</th>
                  <th>Actions</th> {/* Added column for buttons */}
                </tr>
              </thead>
              <tbody>
                {leave_types && Array.isArray(leave_types) && leave_types.map((leave_type) => (
                  <tr key={leave_type.id}>
                    <td>{leave_type.your_name}</td>
                    <td>{leave_type.days_allowed}</td>
                    <td>{leave_type.staff_id}</td>
                    <td>
                      <Button variant="danger" onClick={() => deleteLeave(leave_type.id)}>
                        Delete
                      </Button>
                      <Button variant="success" onClick={() => updateLeave(leave_type.id, 'approved')}>
                        Approved
                      </Button>
                      <Button variant="warning" onClick={() => updateLeave(leave_type.id, 'declined')}>
                        Declined
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Box */}
        <div className="model_box">
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Leave Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Staff Name" />
                </div>
                <div className="form-group mt-3">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Days Allowed" />
                </div>
                <div className="form-group mt-3">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Staff ID" />
                </div>

                <button type="submit" className="btn btn-success mt-4">Add Leave Type</button>
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

export default LeaveReport;
