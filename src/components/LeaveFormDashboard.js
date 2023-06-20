import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LeaveForm from '../pages/LeaveForm';

const LeaveFormDashboard = () => {
    const [leaveForm, setLeaveForm] = useState([]);

    useEffect(() => {
        fetchForms();
    });

    async function fetchForms() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const data = response.data;
      setLeaveForm(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateForm(id, newData) {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newData);
      const data = response.data;
      setLeaveForm(data);
    } catch (error) {
      console.error('Errror updating data:', error);
    }
  }

  async function deleteData(id) {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/users${id}`);
      const data = response.data;
      setLeaveForm(data);
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateForm(newForm) {
    setLeaveForm([...leaveForm, newForm])
  }
  return (
    <div>
      <LeaveForm leave={leaveForm} onUpdateForm={handleUpdateForm} deleteForm={deleteData} updateForm={updateForm} />
    </div>
  )
}

export default LeaveFormDashboard
