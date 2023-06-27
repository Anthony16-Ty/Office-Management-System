import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LeaveType } from './LeaveType';

const LeaveTypeDashboard = () => {
    const [leaveTypes, setLeaveTypes] = useState([]);

    useEffect(() => {
        fetchLeaveTypes();
    })

    useEffect(() => {
      const storedLeaves = localStorage.getItem('leaveTypes')
      if(storedLeaves){
        setLeaveTypes(JSON.parse(storedLeaves))
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('leaveTypes', JSON.stringify(leaveTypes))
    }, [leaveTypes])

    async function fetchLeaveTypes() {
        try {
        const response = await axios.get('http://localhost:3000/leave_types');
        const data = response.data;
        setLeaveTypes(data);
    } catch (error) {
        console.log(error);
    }}

    async function updateLeave(id, newData) {
      try {
        const response = await axios.put(`http://localhost:3000/leave_types/${id}`, newData);
        const data = response.data;
        setLeaveTypes(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        await axios.delete(`http://localhost:3000/leave_types/${id}`);
        setLeaveTypes(leaveTypes.filter(leaveType => leaveType.id !== id));
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateLeaveType(newLeaveType) {
        setLeaveTypes([...leaveTypes, newLeaveType])
    }
  return (
    <div>
      <LeaveType onUpdateLeave={handleUpdateLeaveType} leaveTypes={leaveTypes} deleteLeave={deleteData} updateLeave={updateLeave} />
    </div>
  )
}

export default LeaveTypeDashboard
