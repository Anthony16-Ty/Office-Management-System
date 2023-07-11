import React, { useState, useEffect } from 'react';
import { Routes, Route,  Navigate } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Projects from '../pages/Projects';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveForm from '../pages/LeaveForm';
import { LeaveType } from '../pages/LeaveType';
import LeaveReport from '../pages/LeaveReport';
import TimeSheets from '../pages/TimeSheets';
import ProfilePage from '../pages/ProfilePage';
import LeaveCalculation from '../pages/LeaveCalculation';
import Layout from './Layout';
import axios from 'axios';


function StDashboard({staffs, leave_calculations, updateLoggedIn ,handleUpdateCalculation, deleteCalculations, updateCalculation}) {
  const [timesheets, setTimesheets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [forms, setForms] = useState([]);
  const [leave_types, setLeave_types] = useState([]);

  useEffect(() => {
    fetchTimesheets();
    fetchTasks();
    fetchProjects();
    fetchForms();
    fetchReports();
  }, []);

  //fetch reports
  useEffect(() => {
    const storedReports = localStorage.getItem('leave_types');
    if (storedReports) {
      setLeave_types(JSON.parse(storedReports));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('leave_types', JSON.stringify(leave_types));
  }, [leave_types]);


  async function fetchReports() {
    try {
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/leave_types');
      const data = response.data;
      setLeave_types(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateLeave(id, newData) {
    try {
      const response = await axios.put(`https://oms-api-production-acab.up.railway.app/leave_types/${id}`, newData);
      const data = response.data;
      setLeave_types(data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  async function deleteLeave(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/leave_types/${id}`);
      setLeave_types(leave_types.filter(leave_type => leave_type.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  function handleUpdateLeave(newReport) {
    setLeave_types([...leave_types, newReport]);
  }

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
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/timesheets');
      const data = response.data;
      setTimesheets(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateSheet(id, newData) {
    try {
      const response = await axios.put(`https://oms-api-production-acab.up.railway.app/timesheets/${id}`, newData);
      const data = response.data;
      setTimesheets(data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  async function deleteData(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/timesheets/${id}`);
      setTimesheets(timesheets.filter(timesheet => timesheet.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  function handleUpdateSheet(newSheet) {
    setTimesheets([...timesheets, newSheet]);
  }

  // Fetch tasks
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
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/tasks');
      const data = response.data;
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on tasks
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Perform delete operation on tasks
  async function deleteTasks(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }
  function handleUpdateTask(newTask) {
      setTasks([...tasks, newTask])
  }

  // Fetch projects
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  async function fetchProjects() {
    try {
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/projects');
      const data = response.data;
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on projects
  async function updateProject(id, newData) {
    try {
      await axios.put(`https://oms-api-production-acab.up.railway.app/projects/${id}`, newData);
      const updatedProjects = projects.map((project) => {
        if (project.id === id) {
          return { ...project, ...newData };
        }
        return project;
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Perform delete operation on projects
  async function deleteProjects(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateProject(newProject) {
    setProjects([...projects, newProject]);
  }

  // Fetch forms
  useEffect(() => {
    const storedForms = localStorage.getItem('forms');
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('forms', JSON.stringify(forms));
  }, [forms]);

  async function fetchForms() {
    try {
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/forms');
      const data = response.data;
      setForms(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on forms
  async function updateForm(id, newData) {
    try {
      await axios.put(`https://oms-api-production-acab.up.railway.app/forms/${id}`, newData);
      const updatedForms = forms.map((form) => {
        if (form.id === id) {
          return { ...form, ...newData };
        }
        return form;
      });
      setForms(updatedForms);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Perform delete operation on forms
  async function deleteForms(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/forms/${id}`);
      setForms(forms.filter(form => form.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateForm(newForm) {
    setForms([...forms, newForm])
  }

  return (
    <div>
      <h2 className='text-center'>Welcome to Staff Dashboard</h2>
      <Layout updateLoggedIn={updateLoggedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="/stdashboard/profile" />} />
          <Route
            path="/profile"
            element={<ProfilePage />}
           />
          <Route
            path="/tasks"
            element={<Tasks tasks={tasks} staffs={staffs} onUpdate={updateTask} deleteTasks={deleteTasks} onUpdateTask={handleUpdateTask} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={projects} updateData={updateProject} deleteProjects={deleteProjects} handleUpdateProject={handleUpdateProject} />}
          />
          <Route
            path="/calculation"
            element={<LeaveCalculation leave_calculations={leave_calculations} staffs={staffs} updateCalculation={updateCalculation} deleteCalculations={deleteCalculations} handleUpdateCalculation={handleUpdateCalculation} />}
          />
          <Route
            path="/leave-form"
            element={<LeaveForm staffs={staffs} onUpdateForm={handleUpdateForm} />}
          />
          <Route
            path="/leave-request"
            element={<LeaveRequest forms={forms} updateForm={updateForm} deleteForms={deleteForms} />}
          />
          <Route
            path="/leave-type"
            element={<LeaveType onUpdateLeave={handleUpdateLeave} />}
          />
          <Route
            path="/leave-report"
            element={<LeaveReport leave_types={leave_types} updateLeave={updateLeave} deleteLeave={deleteLeave} />}
          />
          <Route
            path="/timesheets"
            element={<TimeSheets tasks={tasks} timesheets={timesheets} updateSheet={updateSheet} deleteData={deleteData} onUpdateSheet={handleUpdateSheet} />}
          />
          <Route path="/leave-type" element={<LeaveType />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default StDashboard;

