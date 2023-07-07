import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import { Button,Modal } from 'react-bootstrap';



function LeaveReport({leave_types, deleteLeave, updateLeave}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
    return (
       <div class="mx-auto bg-white rounded-lg shadow-lg ml-12 px-5 pb-8 pt-3">
          <div className="leave-types">
          <div class="row ">

              <div class="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{color:"green"}}><h5 className='text-center'><b>Leave Type</b></h5></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
             </div>
           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Days Allowed</th>
                        </tr>
                    </thead>
                    <tbody>
                     {leave_types && Array.isArray(leave_types) && leave_types.map((leave_type) => (
                     <tr key={leave_type.id}>
                      <td>{leave_type.your_name}</td>
                      <td>{leave_type.days_allowed}</td>
                      <td>
                         <Button variant="danger" onClick={() => deleteLeave(leave_type.id)}>
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
          <Modal.Title>Add Leave Type</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Staff Name"/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Days Allowed"/>
                </div>
                  <button type="submit" class="btn btn-success mt-4">Add Leave Type</button>
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

export default LeaveReport;



