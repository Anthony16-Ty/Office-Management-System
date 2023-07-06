import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Client = ({ onUpdateClient, clients, deleteClients, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [formData, setFormData] = useState({
    client_name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingClient
      ? `https://oms-api-production-acab.up.railway.app/clients/${editingClient.id}`
      : 'https://oms-api-production-acab.up.railway.app/clients';

    const method = editingClient ? 'PUT' : 'POST';

    axios({
      method: method,
      url: url,
      data: formData,
    })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          const data = response.data;
          if (editingClient) {
            // Update the existing task
            onUpdate(data);
            setEditingClient(null);
          } else {
            // Create a new task
            onUpdateClient(data);
          }

          setFormData({
            client_name: '',
            description: '',
          });
          setShowModal(false);
        } else {
          throw new Error(`Network response was not ok. Response status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClient = ( client) => {
    setEditingClient( client);
    setFormData({
      client_name:  client.client_name,
      description:  client.description,
    });
    setShowModal(true);
  };

  const  handleAddClient = () => {
    setEditingClient(null);
    setFormData({
       client_name: '',
       description: '',
    });
    setShowModal(true);
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg ml-15 px-5 pt-3 pb-8">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="text-center text-green">
          <h3> clients</h3>
        </div>
        <div>
          <Button variant="primary" onClick={ handleAddClient} style={{ marginTop: '10px', marginBottom: '3px' }}>
            Add New Client
          </Button>
        </div>
      </div>

      {/* Modal for adding/editing task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingClient ? 'Edit Client' : 'Add Client'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formClientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formdescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '9px' }}>
              {editingClient ? 'Save Changes' : 'Add Client'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Table to display tasks */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients &&
            Array.isArray(clients) &&
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.client_name}</td>
                <td>{client.description}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditClient(client)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => deleteClients(client.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Client;
