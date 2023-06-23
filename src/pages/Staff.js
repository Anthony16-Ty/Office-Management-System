import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import { Button,Modal } from 'react-bootstrap';
import axios from 'axios';



function Staff({onUpdateStaff, staffs, deleteData, onUpdate}) {
  const [show, setShow] = useState(false);
  // const [selectedDate, setSelectedDate] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    joining_date: "",
    reporting_to: "",
    email: "",
    password: "",
    password_confirmation: "",
    tech_stack: "",
    isStaff: "",
    admin_id: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!formData.id || !formData.name || !formData.joining_date || !formData.reporting_to || !formData.email || !formData.password || !formData.password_confirmation || !formData.tech_stack || !formData.isStaff || !formData.admin_id){
        console.log('Please fill out all the form fields.');
        return;
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
    const data = response.data
    onUpdateStaff(data);
    setFormData({id: "", name: "", joining_date: "", reporting_to: "", email: "", password: "", password_confirmation: "", tech_stack: "", isStaff: "", admin_id: ""});
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
       <div class="container ">
          <div className="staff-details">
          <div class="row ">

           <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Staff" aria-label="Search"/>

                </form>
              </div>
              </div>
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Staff Details</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add New Staff
              </Button>
             </div>
           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Staff Id</th>
                            <th>Name </th>
                            <th>Joining Date</th>
                            <th>Report To </th>
                            <th>Tech Stack</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

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
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                    <input type="name" class="form-control" name='text' placeholder="Enter Staff Name" value={formData.name} onChange={handleChange} />
              </div>
                <div class="form-group mt-3">
                    <input type="date" class="datePicker" placeholder="Enter Joining Date" value={formData.joining_date} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" name='text'  placeholder="Reporting To" value={formData.reporting_to} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" name='text'  placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="password" placeholder="Create Password" value={formData.password} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" name='text' placeholder="Enter Your Stack Details" value={formData.tech_stack} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" name='text' placeholder="isStaff" value={formData.isStaff} onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" name='text' placeholder="Admin ID" value={formData.admin_id} onChange={handleChange} />
                </div>

                  <button type="submit" class="btn btn-success mt-4">Add Staff</button>
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

export default Staff;


