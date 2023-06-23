import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Staff from '../pages/Staff'

const StaffDashboard = () => {
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetchStaffs();
    })

    useEffect(() => {
      const storedStaffs = localStorage.getItem('staffs');
      if (storedStaffs) {
        setStaffs(JSON.parse(storedStaffs));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('staffs', JSON.stringify(staffs));
    }, [staffs]);

    async function fetchStaffs() {
        try {
            const response = await axios.get('http://localhost:3000/staffs');
            const data = response.data;
            setStaffs(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStaffs(id, newData) {
      try {
        const response = await axios.put(`http://localhost:3000/staffs/${id}`, newData);
        const data = response.data;
        setStaffs(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        await axios.delete(`http://localhost:3000/staffs/${id}`);
        setStaffs(staffs.filter(staff => staff.id !== id));
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateStaff(newStaff){
        setStaffs([...staffs, newStaff])
    }
  return (
    <div>
      <Staff staffs={staffs} onUpdateStaff={handleUpdateStaff} deleteData={deleteData} onUpdate={updateStaffs} />
    </div>
  )
}

export default StaffDashboard
