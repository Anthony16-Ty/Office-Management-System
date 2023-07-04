import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import Projects from './pages/Projects';
import LeaveRequest from './pages/LeaveRequest';
import LeaveForm from './pages/LeaveForm';
import { LeaveType } from './pages/LeaveType';
import LeaveReport from './pages/LeaveReport';
import ClientForm from './pages/ClientForm';
import Client from './pages/Client';
import TimeSheets from './pages/TimeSheets';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import StDashboard from './components/StDashboard';

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  // const [user, setUser] = useState(null);

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/admindashboard/*"
          element={<AdminDashboard isloggedIn={isloggedIn} isAdmin={isadmin} isStaff={isStaff} />}
        />
        <Route
          path="/stdashboard/*"
          element={<StDashboard isloggedIn={isloggedIn} isAdmin={isadmin} isStaff={isStaff} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/timesheets" element={<TimeSheets />} />
        <Route path="/client" element={<Client />} />
        <Route path="/client-form" element={<ClientForm />} />
        <Route path="/leave-form" element={<LeaveForm />} />
        <Route path="/leave-request" element={<LeaveRequest />} />
        <Route path="/leave-type" element={<LeaveType />} />
        <Route path="/leave-report" element={<LeaveReport />} />
      </Routes>
    </Router>
  );
}

export default App;
