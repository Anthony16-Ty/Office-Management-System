import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import Projects from './pages/Projects';
import LeaveRequest from './pages/LeaveRequest';
import LeaveForm from './pages/LeaveForm';
import { LeaveType } from './pages/LeaveType';
import Client from './pages/Client';
import TimeSheets from './pages/TimeSheets';
import Login from './pages/Login';
import Signup from './pages/Signup';
import axios from 'axios';

function App() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  useEffect(() => {
    const storedTimesheets = localStorage.getItem('timesheets');
    if (storedTimesheets) {
      setTimesheets(JSON.parse(storedTimesheets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timesheets', JSON.stringify(timesheets));
  }, [timesheets]);

  async function fetchTimesheets() {
    try {
      const response = await axios.get('http://localhost:3000/timesheets');
      const data = response.data;
      setTimesheets(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateSheet(id, newData) {
    try {
      const response = await axios.put(`http://localhost:3000/timesheets/${id}`, newData);
      const data = response.data;
      setTimesheets(data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async function deleteData(id) {
    try {
      await axios.delete(`http://localhost:3000/timesheets/${id}`);
      setTimesheets(timesheets.filter(timesheet => timesheet.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  function handleUpdateSheet(newSheet) {
    setTimesheets([...timesheets, newSheet]);
  }

  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/staff' element={<Staff />} />
            <Route path='/timesheets' element={<TimeSheets timesheets={timesheets} onUpdateSheet={handleUpdateSheet} deleteData={deleteData} />} updateSheet={updateSheet} />
            <Route path='/client' element={<Client />} />
            <Route path='/leave-form' element={<LeaveForm />} />
            <Route path='/leave-request' element={<LeaveRequest />} />
            <Route path='/leave-type' element={<LeaveType />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/leave-request' element={<LeaveRequest />} />
          </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
