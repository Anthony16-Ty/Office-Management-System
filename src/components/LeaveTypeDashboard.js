import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LeaveType } from '../pages/LeaveType';

const LeaveTypeDashboard = () => {
    const [leaveType, setLeaveType] = useState([]);

    useEffect(() => {
        fetchLeaveTypes();
    })

    async function fetchLeaveTypes() {
        try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = response.data;
        setLeaveType(data);
    } catch (error) {
        console.log(error);
    }}

    async function updateLeave(id, newData) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newData);
        const data = response.data;
        setLeaveType(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users${id}`);
        const data = response.data;
        setLeaveType(data);
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateLeaveType(newLeaveType) {
        setLeaveType([...leaveType, newLeaveType])
    }
  return (
    <div>
      <LeaveType onUpdateLeave={handleUpdateLeaveType} leaves={leaveType} deleteLeave={deleteData} updateLeave={updateLeave} />
    </div>
  )
}

export default LeaveTypeDashboard
