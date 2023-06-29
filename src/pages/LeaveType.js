import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const LeaveType = ({ leaveTypes, onUpdateLeave, deleteLeave, updateLeave }) => {
  const [formData, setFormData] = useState({
    name: '',
    days_allowed: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!formData.name || !formData.days_allowed) {
        console.log('Please fill out all the form fields.');
        return;
      }
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        formData
      );
      const data = response.data;
      onUpdateLeave(data);
      setFormData({ name: '', days_allowed: '' });
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
    <form onSubmit={handleSubmit} className='mx-auto bg-white rounded-lg shadow-lg ml-12 px-5 pb-8 pt-3'>
      <div className='ml-8'>
        <div className='mt-4 flex mb-4'>
          <label className='font-bold text-xl mr-2'>Name:</label>
          <input
            type='text'
            name='name'
            placeholder='Enter Name'
            className='border border-gray-400 rounded-md p-2 w-2/3'
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex'>
          <label className='font-bold text-xl mr-2'>Days:</label>
          <input
            type='text'
            name='days_allowed'
            placeholder='Enter Days Allowed'
            className='border border-gray-400 rounded-md p-2 w-2/3'
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white font-bold py-2 px-4 mt-4 ml-40 rounded-md'
        style={{ marginLeft: '5.5rem' }}
      >
        Submit
      </button>
      <Link to='/' className='btn btn-danger ml-2'>
        Cancel
      </Link>
    </form>
  );
};

export default LeaveType;
