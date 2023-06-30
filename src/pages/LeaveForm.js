import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveForm = ({ onUpdateForm, dashboardType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date_from: '',
    date_to: '',
    reason_for_leave: '',
    leave_type: '',
    staff_id: '',
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://oms-api-production.up.railway.app/forms', {
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
        onUpdateForm(data);

        setFormData({
          date_from: '',
          date_to: '',
          reason_for_leave: '',
          leave_type: '',
          staff_id: '',
        });

        if (dashboardType === 'admin') {
          navigate('/admindashboard/leave-request'); // Navigate to /admindashboard/leave-report for admin dashboard
        } else if (dashboardType === 'staff') {
          navigate('/stdashboard/leave-request'); // Navigate to /stdashboard/leave-report for staff dashboard
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
            Request Leave
          </h5>
          <div className='ml-1'>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Date From
              </label>
              <input
                type='date'
                name='date_from'
                value={formData.date_from}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Date To
              </label>
              <input
                type='date'
                name='date_to'
                value={formData.date_to}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Reason For Leave
              </label>
              <input
                name='reason_for_leave'
                value={formData.reason_for_leave}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Type of Leave
              </label>
              <input
                name='leave_type'
                value={formData.leave_type}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

            <div className='m-2'>
               <label className='block text-sm font-bold mb-1'>
                Please Enter Staff Id
              </label>
              <input
                name='staff_id'
                value={formData.staff_id}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
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

export default LeaveForm;
