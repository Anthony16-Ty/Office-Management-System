import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import { Button,Modal } from 'react-bootstrap';



function Client({clients, deleteClients, updateClient}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
       <div class="mx-auto bg-white rounded-lg shadow-lg ml-12 px-5 pb-8 pt-3">
          <div className="clients">
          <div class="row ">

              <div class="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{color:"green"}}><h5 className='text-center'><b>Client Details</b></h5></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
             </div>
           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                     {clients && Array.isArray(clients) && clients.map((client) => (
                     <tr key={client.id}>
                      <td>{client.client_name}</td>
                      <td>{client.description}</td>
                      <td>
                         <Button variant="danger" onClick={() => deleteClients(client.id)}>
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
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Client Name"/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Description"/>
                </div>

                  <button type="submit" class="btn btn-success mt-4">Add Client</button>
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

export default Client;


