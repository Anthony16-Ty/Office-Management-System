import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = ({ onUpdateForm, leave, deleteForm, updateForm }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [formData, setFormData] = useState({
    request_id: '',
    staff_id: '',
    date_from: '',
    date_to: '',
    reason_for_leave: '',
    leave_type: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !formData.request_id ||
        !formData.staff_id ||
        !formData.date_from ||
        !formData.date_to ||
        !formData.reason_for_leave ||
        formData.leave_type
      ) {
        console.log('Please fill out all the form fields.');
        return;
      }
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        formData
      );
      const data = response.data;
      onUpdateForm(data);
      setFormData({
        request_id: '',
        staff_id: '',
        date_from: '',
        date_to: '',
        reason_for_leave: '',
        leave_type: '',
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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
            <div className='m-1 w-80'>
              <label className='block text-sm font-bold mb-1'>
                Please Enter Request Id
              </label>
              <input
                name='request_id'
                value={formData.request_id}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>

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