import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import Projects from './pages/Projects';
import LeaveRequest from './pages/LeaveRequest';
import LeaveForm from './pages/LeaveForm';
import { LeaveType } from './pages/LeaveType';
import LeaveReport from './pages/LeaveReport';
import Client from './pages/Client';
import TimeSheets from './pages/TimeSheets';
import Login from './pages/Login';
import Managers from './pages/Managers';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import StDashboard from './components/StDashboard';
import axios from 'axios';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

  // Fetch staffs
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
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/staffs');
      const data = response.data;
      setStaffs(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStaff(id, newData) {
    try {
      await axios.put(`https://oms-api-production-acab.up.railway.app/staffs/${id}`, newData);
      const updatedStaffs = staffs.map((staff) => {
        if (staff.id === id) {
          return { ...staff, ...newData };
        }
        return staff;
      });
      setStaffs(updatedStaffs);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async function deleteStaffs(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/staffs/${id}`);
      setStaffs(staffs.filter((staff) => staff.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateStaff(newStaff) {
    setStaffs([...staffs, newStaff]);
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
        <ProtectedRoutes
          path="/admindashboard/*"
          element={<AdminDashboard isloggedIn={isloggedIn} isAdmin={isadmin} isStaff={isStaff} staffs={staffs} handleUpdateStaff={handleUpdateStaff} deleteStaffs={deleteStaffs} updateStaff={updateStaff} />}
          isAuthenticated={isloggedIn}
        />
        <ProtectedRoutes
          path="/stdashboard/*"
          element={<StDashboard isloggedIn={isloggedIn} isAdmin={isadmin} isStaff={isStaff} staffs={staffs} handleUpdateStaff={handleUpdateStaff} deleteStaffs={deleteStaffs} updateStaff={updateStaff} />}
          isAuthenticated={isloggedIn}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <ProtectedRoutes path="/tasks" element={<Tasks />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/projects" element={<Projects />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/manager" element={<Managers />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/staff" element={<Staff />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/timesheets" element={<TimeSheets />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/client" element={<Client />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/leave-form" element={<LeaveForm />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/leave-request" element={<LeaveRequest />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/leave-type" element={<LeaveType />} isAuthenticated={isloggedIn} />
        <ProtectedRoutes path="/leave-report" element={<LeaveReport />} isAuthenticated={isloggedIn} />
      </Routes>
    </Router>
  );
}

export default App;
