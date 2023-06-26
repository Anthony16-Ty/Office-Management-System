import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminDashboard from './components/AdminDashboard';
import StDashboard from './components/StDashboard';
import ProjectDashboard from './components/ProjectDashboard';
import axios from 'axios';

function App() {
  const [timesheets, setTimesheets] = useState([]);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

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

  function handleLogin(user) {
    setIsLoggedIn(true);
    setIsAdmin(user.isadmin);
    setIsStaff(user.isStaff);
  }


  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/stdashboard" element={<StDashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/staff" element={<Staff />} />
          <Route
            path="/timesheets"
            element={<TimeSheets timesheets={timesheets} onUpdateSheet={handleUpdateSheet} deleteData={deleteData} updateSheet={updateSheet} />}
          />
          <Route path="/client" element={<Client />} />
          <Route path="/leave-form" element={<LeaveForm />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
          <Route path="/leave-type" element={<LeaveType />} />
          <Route path="/projectdash" element={<ProjectDashboard /> } />
        </Routes>
    </Router>
  );
}

export default App;
