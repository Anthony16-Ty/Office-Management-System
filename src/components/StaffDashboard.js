import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Staff from '../pages/Staff'

const StaffDashboard = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        fetchStaffs();
    })
    async function fetchStaffs() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const data = response.data;
            setStaff(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStaffs(id, newData) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newData);
        const data = response.data;
        setStaff(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users${id}`);
        const data = response.data;
        setStaff(data);
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateStaff(newStaff){
        setStaff([...staff, newStaff])
    }
  return (
    <div>
      <Staff staffs={staff} onUpdateStaff={handleUpdateStaff} deleteStaff={deleteData} onUpdate={updateStaffs} />
    </div>
  )
}

export default StaffDashboard
