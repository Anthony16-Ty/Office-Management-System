import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import { Button,Modal } from 'react-bootstrap';



function LeaveRequest({forms, deleteForms, updateForm}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
       <div class="container ">
          <div className="requests">
          <div class="row ">

              <div class="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{color:"green"}}><h5><b>Leave Request Details</b></h5></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
             </div>
           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Date From</th>
                            <th>Date To</th>
                            <th>Reason For Leave</th>
                            <th>Leave Type</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                     {forms && Array.isArray(forms) && forms.map((form) => (
                     <tr key={form.id}>
                      <td>{form.staff_id}</td>
                      <td>{form.date_from}</td>
                      <td>{form.date_to}</td>
                      <td>{form.reason_for_leave}</td>
                      <td>{form.leave_type}</td>
                      <td>
                         <Button variant="danger" onClick={() => deleteForms(form.id)}>
                          Delete
                         </Button>
                      </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
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
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Country"/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter City"/>
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Country"/>
                </div>

                  <button type="submit" class="btn btn-success mt-4">Add Record</button>
                </form>
            </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

       {/* Model Box Finsihs */}
       </div>
      </div>
      </div>
  );
}

export default LeaveRequest;

