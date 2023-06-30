import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientForm = ({ onUpdateClient, dashboardType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client_name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://oms-api-production.up.railway.app/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Network response was not ok. Response status: ${response.status}`);
        }
      })
      .then(function (data) {
        onUpdateClient(data);

        setFormData({
          client_name: '',
          description: '',
        });

        if (dashboardType === 'admin') {
            navigate('/admindashboard/client'); // Navigate to /admindashboard/leave-report for admin dashboard
          } else if (dashboardType === 'staff') {
            navigate('/stdashboard/client'); // Navigate to /stdashboard/leave-report for staff dashboard
          }
      })


      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='mx-auto bg-white rounded-lg shadow-lg ml-15 px-1 py-8 w-96'>
      <div>
        <form onSubmit={handleSubmit} className='justify-center'>
          <h5 className='text-center text-xl font-bold mt-4 text-green-500'>
            Client Form
          </h5>
          <div className='ml-1'>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Enter Client Name
              </label>
              <input
                name='client_name'
                value={formData.client_name}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-48'
              />
            </div>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Enter description
              </label>
              <input
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-48'
              />
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='bg-blue-500 text-white font-bold py-2 px-4 mt-4 mr-5 rounded-md'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;