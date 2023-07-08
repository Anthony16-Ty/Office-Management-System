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
  const [isadmin, setIsadmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [staffs, setStaffs] = useState([]);
  // const [user, setUser] = useState(null);

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

  // Perform update operation on staffs
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

  // Perform delete operation on staffs
  async function deleteStaffs(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/staffs/${id}`);
      setStaffs(staffs.filter(staff => staff.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateStaff(newStaff){
      setStaffs([...staffs, newStaff])
  }

  //handle login states
  function handleLogin(user) {
    setIsLoggedIn(true);
    setIsAdmin(user.isadmin);
    setIsStaff(user.isStaff);
  }

  // useEffect(() => {
  //   fetch("/mi")
  //   .then(resp => {
  //     if (resp.ok){
  //       resp.json().then((user) => setUser(user))
  //     } else {
  //       resp.json().then(console.log)
  //     }
  //   })
  // }, [])

  // console.log(user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route element={<ProtectedRoutes isLoggedIn={isloggedIn} isAdmin={isadmin} isStaff={isStaff} />}>
  <Route path="/admindashboard/*" element={<AdminDashboard staffs={staffs} handleUpdateStaff={handleUpdateStaff} deleteStaffs={deleteStaffs} updateStaff={updateStaff} />} />
  <Route path="/stdashboard/*" element={<StDashboard staffs={staffs} handleUpdateStaff={handleUpdateStaff} deleteStaffs={deleteStaffs} updateStaff={updateStaff} />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/tasks" element={<Tasks />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/manager" element={<Managers />} />
  <Route path="/staff" element={<Staff />} />
  <Route path="/timesheets" element={<TimeSheets />} />
  <Route path="/client" element={<Client />} />
  <Route path="/leave-form" element={<LeaveForm />} />
  <Route path="/leave-request" element={<LeaveRequest />} />
  <Route path="/leave-type" element={<LeaveType />} />
  <Route path="/leave-report" element={<LeaveReport />} />
</Route>

      </Routes>
    </Router>
  );
}

export default App;
