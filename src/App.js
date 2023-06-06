import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import Leave from './pages/Leave';
import Projects from './pages/Projects';
import LeaveRequest from './pages/LeaveRequest';
import LeaveForm from './pages/LeaveForm';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/reports' element={<Reports/>} />
          <Route path='/tasks' element={<Tasks/>} />
          <Route path='/staff' element={<Staff/>} />
          <Route path='/leave' element={<Leave/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/leave-request' element={<LeaveRequest/>} />
          <Route path='/leave-form' element={<LeaveForm/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;