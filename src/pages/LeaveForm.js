import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveForm = ({ onUpdateForm }) => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [formData, setFormData] = useState({
    staff_id: '',
    date_from: '',
    date_to: '',
    reason_for_leave: '',
    leave_type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/forms', {
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
          staff_id: '',
          date_from: '',
          date_to: '',
          reason_for_leave: '',
          leave_type: '',
        });
        navigate('/leave-request')
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
    <div className='container'>
      <div>
        <form className='leave-form' onSubmit={handleSubmit}>
          <h5 className='text-center text-2xl font-bold mt-4'>
            Request Leave
          </h5>
          <div className='ml-28'>
             <div className='m-2 w-80'>
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

            <div className='m-1 w-80'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Date From
              </label>
              <input
                type='date'
                id='fromDate'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

            <div className='m-1 w-80'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Date To
              </label>
              <input
                type='date'
                id='toDate'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

            <div className='m-1 w-80'>
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

            <div className='m-1 w-80'>
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
          </div>

          <div className='flex flex-wrap m-1'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='bg-blue-500 text-white font-bold py-2 px-4 mt-4 ml-36 rounded-md'
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
