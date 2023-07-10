import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Signup from './pages/Signup';
import Managers from './pages/Managers';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import StDashboard from './components/StDashboard';
import LeaveCalculation from './pages/LeaveCalculation';
import axios from 'axios';

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [leave_calculations, setLeave_calculations] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const countdownTimerRef = useRef(null);

  useEffect(() => {
    fetchStaffs();
    fetchCalculations();
  }, []);

  // Fetch Calculations
  useEffect(() => {
    const storedCalculations = localStorage.getItem('leave_calculations');
    if (storedCalculations) {
      setLeave_calculations(JSON.parse(storedCalculations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('leave_calculations', JSON.stringify(leave_calculations));
  }, [leave_calculations]);

  useEffect(() => {
    if (remainingTime <= 0) {
      // Take necessary actions when the countdown ends
    }
  }, [remainingTime]);

  async function fetchCalculations() {
    try {
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/leave_calculations');
      const data = response.data;
      setLeave_calculations(data);

      // Calculate remaining time
      const targetEndTime = new Date('2023-07-11T00:00:00Z'); // Replace with your actual end time
      const currentTime = new Date();
      const remainingTime = Math.max(targetEndTime - currentTime, 0);
      setRemainingTime(remainingTime);

      // Start countdown timer
      countdownTimerRef.current = setInterval(() => {
        setRemainingTime(prevRemainingTime => {
          if (prevRemainingTime <= 0) {
            clearInterval(countdownTimerRef.current);
            // Take necessary actions when the countdown ends
          }
          return prevRemainingTime - 1000; // Update remaining time every second
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  // ... Rest of your code

  // Function to display the countdown on the frontend
  function displayCountdown(remainingTime) {
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    console.log(`Countdown: ${hours}h ${minutes}m ${seconds}s`);
  }

  useEffect(() => {
    displayCountdown(remainingTime);
  }, [remainingTime]);

  // ..

  // Perform update operation on staffs
  async function updateCalculation(id, newData) {
    try {
      await axios.put(`https://oms-api-production-acab.up.railway.app/leave_calculations/${id}`, newData);
      const updatedCalculations = leave_calculations.map((leave_calculation) => {
        if (leave_calculation.id === id) {
          return { ...leave_calculation, ...newData };
        }
        return leave_calculation;
      });
      setLeave_calculations(updatedCalculations);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Perform delete operation on staffs
  async function deleteCalculations(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/leave_calculations/${id}`);
      setLeave_calculations(leave_calculations.filter(leave_calculation => leave_calculation.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateCalculation(newCalculation){
      setLeave_calculations([...leave_calculations, newCalculation])
  }


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


  return (
    <Router>
    <Routes>
      <Route
        path="/"
        element={
          isloggedIn ? (
            isadmin ? (
              <Navigate to="/admindashboard/projects" replace />
            ) : (
              <Navigate to="/stdashboard/profile" replace />
            )
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isloggedIn ? (
            isadmin ? (
            <Navigate to="/admindashboard/*" replace />
          ) : (
            <Navigate to="/stdashboard/*" replace />
          )
        ) : (
            <Signup />
          )
        }
      />
      <Route
        path="/admindashboard/*"
        element={
          isadmin ? (
            <AdminDashboard
              isLoggedIn={isloggedIn}
              isAdmin={isadmin}
              isStaff={isStaff}
              staffs={staffs}
              handleUpdateStaff={handleUpdateStaff}
              deleteStaff={deleteStaffs}
              updateStaff={updateStaff}
              leave_calculations={leave_calculations}
              handleUpdateCalculation={handleUpdateCalculation}
              deleteCalculations={deleteCalculations}
              updateCalculation={updateCalculation}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/stdashboard/*"
        element={
          isStaff ? (
            <StDashboard
              isLoggedIn={isloggedIn}
              isAdmin={isadmin}
              isStaff={isStaff}
              staffs={staffs}
              handleUpdateStaff={handleUpdateStaff}
              deleteStaff={deleteStaffs}
              updateStaff={updateStaff}
              leave_calculations={leave_calculations}
              setLeave_calculations={setLeave_calculations}
              handleUpdateCalculation={handleUpdateCalculation}
              deleteCalculations={deleteCalculations}
              updateCalculation={updateCalculation}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/manager" element={<Managers />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/calculation" element={<LeaveCalculation />} />
      <Route path="/timesheets" element={<TimeSheets />} />
      <Route path="/client" element={<Client />} />
      <Route path="/leave-form" element={<LeaveForm />} />
      <Route path="/leave-request" element={<LeaveRequest />} />
      <Route path="/leave-type" element={<LeaveType />} />
      <Route path="/leave-report" element={<LeaveReport />} />
    </Routes>
  </Router>
  );
}

export default App;
