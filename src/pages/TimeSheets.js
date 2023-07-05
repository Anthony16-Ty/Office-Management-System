import React, { useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Timesheet = ({ onUpdateSheet, timesheets, deleteData, updateSheet }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    progress_details: '',
    task_id: '',
  });
  const [currentDate, setCurrentDate] = useState(new Date()); // State for current date

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !formData.date ||
        !formData.start_time ||
        !formData.end_time ||
        !formData.progress_details ||
        !formData.task_id
      ) {
        setError('Please fill out all the form fields.');
        return;
      }

      const selectedDate = new Date(formData.date);

      if (selectedDate <= currentDate) {
        setError('You can only add dates in the future.');
        return;
      }

      const startTime = new Date(`1970-01-01T${formData.start_time}`);
      const endTime = new Date(`1970-01-01T${formData.end_time}`);

      if (endTime < startTime) {
        setError('End time cannot be less than start time.');
        return;
      }

      const response = await axios.post(
        'https://oms-api-production-acab.up.railway.app/timesheets',
        formData
      );
      const data = response.data;
      onUpdateSheet(data);
      setFormData({
        date: '',
        start_time: '',
        end_time: '',
        progress_details: '',
        task_id: '',
      });
      setError('');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    if (e.target.name === 'date') {
      setCurrentDate(new Date(e.target.value));
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // ... The rest of the code remains unchanged
  );
};

export default Timesheet;
