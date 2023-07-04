import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';

function Client({ clients, deleteClients, updateClient }) {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({ client_name: '', description: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (client) => {
    setEditData(client);
    handleShow();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    updateClient(editData);
    handleClose();
  };

  return (
    <div class="mx-auto bg-white rounded-lg shadow-lg ml-12 px-5 pb-8 pt-3">
      <div className="clients">
        <div class="row">
          <div class="col-sm-3 offset-sm-2 mt-3 mb-4 text-gred" style={{ color: "green" }}>
            <h5 className='text-center'><b>Client Details</b></h5>
          </div>
          <div class="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
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
                      <Button variant="primary" onClick={() => handleEdit(client)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Client Modal */}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmit}>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="client_name"
                  value={editData.client_name}
                  onChange={handleInputChange}
                  placeholder="Enter Client Name"
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  value={editData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                />
              </div>
              <Button type="submit" class="btn btn-success mt-4">Update Client</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* Edit Client Modal Finish */}
      </div>
    </div>
  );
}

export default Client;
