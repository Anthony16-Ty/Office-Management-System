import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import { Button,Modal } from 'react-bootstrap';
import axios from 'axios';



function Tasks({onUpdateTask, tasks, deleteData, onUpdate}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    assigned_to: "",
    managed_by: "",
    project_id: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!formData.id || !formData.name || !formData.assigned_to || !formData.managed_by || !formData.project_id){
        console.log('Please fill out all the form fields.');
        return;
    }
    const response = await axios.post('http://localhost:3000/tasks', formData);
    const data = response.data
    onUpdateTask(data);
    setFormData({id: "", name: "", assigned_to: "", managed_by: "", project_id: ""});
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
          <div className="taskss">
          <div class="row ">

           <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Task" aria-label="Search"/>

                </form>
              </div>
              </div>
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h5><b>Tasks Details</b></h5></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add New Task
              </Button>
             </div>
           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Task Name </th>
                            <th>Assigned to Staff</th>
                            <th>Managed by</th>
                            <th>Project Id</th>
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
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.name} placeholder="Enter Task Name" onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.assigned} placeholder="Enter Assigned to Staff" onChange={handleChange} />
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" value={formData.managed} placeholder="Enter Managed by Staff Id" onChange={handleChange} />
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.id} placeholder="Enter Project Id" onChange={handleChange} />
                </div>

                  <button type="submit" class="btn btn-success mt-4">Add </button>
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

export default Tasks;

