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
import axios from 'axios';

function App() {
  const [timesheets, setTimesheets] = useState([]);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [forms, setForms] = useState([]);

  //Fetch Forms
    useEffect(() => {
        fetchForms();
    }, []);

    useEffect(() => {
      const storedForms = localStorage.getItem('forms');
      if(storedForms) {
        setForms(JSON.parse(storedForms))
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('forms', JSON.stringify(forms))
    }, [forms]);

    async function fetchForms() {
    try {
      const response = await axios.get('http://localhost:3000/forms');
      const data = response.data;
      setForms(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateForm(id, newData) {
    try {
      const response = await axios.put(`http://localhost:3000/forms/${id}`, newData);
      const data = response.data;
      setForms(data);
    } catch (error) {
      console.error('Errror updating data:', error);
    }
  }

  async function deleteForms(id) {
    try {
      await axios.delete(`http://localhost:3000/forms/${id}`);
      setForms(forms.filter(form => form.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateForm(newForm) {
    setForms([...forms, newForm])
  }

  //fetch projects

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
      const storedProjects = localStorage.getItem('projects');
      if(storedProjects){
        setProjects(JSON.parse(storedProjects))
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    async function fetchProjects() {
        try {
          const response = await axios.get('http://localhost:3000/projects');
          const data = response.data;
          setProjects(data);
        } catch (error) {
          console.log(error);
        }
      }

    async function updateProjects(id, newData) {
      try {
        const response = await axios.put(`http://localhost:3000/projects/${id}`, newData);
        const data = response.data;
        setProjects(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteProjects(id) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        setProjects(projects.filter(project => project.id !== id));
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateProject(newProject) {
      setProjects([...projects, newProject]);
    }

    //fetch staffs

    useEffect(() => {
      fetchStaffs();
    }, []);

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

    async function deleteStaffs(id) {
      try {
        await axios.delete(`http://localhost:3000/staffs/${id}`);
        setStaffs(prevStaffs => prevStaffs.filter(staff => staff.id !== id));
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }


    function handleUpdateStaff(newStaff) {
      setStaffs(prevStaffs => [...prevStaffs, newStaff]);
    }


    //fetch tasks

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    async function fetchTasks() {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            const data = response.data;
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateTasks(id, newData) {
      try {
        const response = await axios.put(`http://localhost:3000/tasks/${id}`, newData);
        const data = response.data;
        setTasks(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteTasks(id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateTask(newTask) {
        setTasks([...tasks, newTask])
    }


    //fetch timesheets

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

  //handle login states

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
          <Route path="/tasks" element={<Tasks onUpdateTask={handleUpdateTask} tasks={tasks} deleteTasks={deleteTasks} onUpdate={updateTasks} />} />
          <Route path="/projects" element={<Projects projects={projects} deleteProjects={deleteProjects} handleUpdateProject={handleUpdateProject} updateProjects={updateProjects} />} />
          <Route path="/staff" element={<Staff staffs={staffs} handleUpdateStaff={handleUpdateStaff} deleteStaffs={deleteStaffs} onUpdate={updateStaffs} />} />
          <Route
            path="/timesheets"
            element={<TimeSheets timesheets={timesheets} onUpdateSheet={handleUpdateSheet} deleteData={deleteData} updateSheet={updateSheet} />}
          />
          <Route path="/client" element={<Client />} />
          <Route path="/leave-form" element={<LeaveForm onUpdateForm={handleUpdateForm} />} />
          <Route path="/leave-request" element={<LeaveRequest forms={forms} updateForm={updateForm} deleteForms={deleteForms} />} />
          <Route path="/leave-type" element={<LeaveType />} />
        </Routes>
    </Router>
  );
}

export default App;
