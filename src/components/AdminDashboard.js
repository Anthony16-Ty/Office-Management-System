import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Staff from '../pages/Staff';
import Projects from '../pages/Projects';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveForm from '../pages/LeaveForm';
import { LeaveType } from '../pages/LeaveType';
import TimeSheets from '../pages/TimeSheets';
import Client from '../pages/Client';
import Managers from '../pages/Managers';
import AdminLayout from './AdminLayout';
import LeaveCalculation from '../pages/LeaveCalculation';

import axios from 'axios';

function AdminDashboard({staffs, handleUpdateStaff, updateLoggedIn, deleteStaffs, updateStaff, leave_calculations, handleUpdateCalculation, deleteCalculations, updateCalculation}) {
  const [timesheets, setTimesheets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [forms, setForms] = useState([]);
  const [clients, setClients] = useState([]);
  const [leave_types, setLeave_types] = useState([]);
  const [managers, setManagers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimesheets();
    fetchTasks();
    fetchProjects();
    fetchForms();
    fetchClients();
    fetchReports();
    fetchManagers();
  }, []);

  useEffect(() => {
    const storedManagers = localStorage.getItem('managers');
    if (storedManagers) {
      setManagers(JSON.parse(storedManagers));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('managers', JSON.stringify(managers));
  }, [managers]);

  async function fetchManagers() {
    try {
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/managers');
      const data = response.data;
      setManagers(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on staffs
  async function updateManager(id, newData) {
    try {
      await axios.put(`https://oms-api-production-acab.up.railway.app/managers/${id}`, newData);
      const updatedManagers = managers.map((manager) => {
        if (manager.id === id) {
          return { ...manager, ...newData };
        }
        return manager;
      });
      setManagers(updatedManagers);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Perform delete operation on staffs
  async function deleteManagers(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/managers/${id}`);
      setManagers(managers.filter(manager => manager.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateManager(newManager){
      setManagers([...managers, newManager])
  }


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
  const updateLeave = (updatedLeave) => {
    const updatedLeaves = leave_types.map((leave_type) => {
      if (leave_type.id === updatedLeave.id) {
        return updatedLeave;
      }
      return leave_type;
    });
    setLeave_types(updatedLeaves);
  };

  // Perform delete operation on projects
  async function deleteLeave(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/leave_types/${id}`);
      setLeave_types(leave_types.filter(leave_type => leave_type.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateLeave(newReport) {
    setLeave_types([...leave_types, newReport]);
  }

  //fetch clients

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);


  async function fetchClients() {
    try {
      const response = await axios.get('https://oms-api-production-acab.up.railway.app/clients');
      const data = response.data;
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  }

  const updateClient = (updatedClient) => {
    const updatedClients = clients.map((client) => {
      if (client.id === updatedClient.id) {
        return updatedClient;
      }
      return client;
    });
    setClients(updatedClients);
  };

  async function deleteClients(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/clients/${id}`);
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  function handleUpdateClient(newClient) {
    setClients([...clients, newClient]);
  }

  //fetch timesheets

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
  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === updatedProject.id) {
        return updatedProject;
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Perform delete operation on projects
  async function deleteProjects(id) {
    try {
      await axios.delete(`https://oms-api-production-acab.up.railway.app/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateProjects(newProject) {
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

  function handleUpdateForm(newForm) {
    setForms([...forms, newForm])
  }


  // Fetch the stored route from localStorage on page load
  useEffect(() => {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute) {
      navigate(storedRoute); // Navigate to the stored route
    }
  }, []);

  // Store the current route in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentRoute', location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <h2 className='text-center'>Welcome to Admin Dashboard</h2>
      <AdminLayout updateLoggedIn={updateLoggedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="/admindashboard/projects" />} />
          <Route
            path="/tasks"
            element={<Tasks tasks={tasks} staffs={staffs} managers={managers} onUpdate={updateTask} deleteTasks={deleteTasks} onUpdateTask={handleUpdateTask} />}
          />
           <Route
            path="/client"
            element={<Client clients={clients} onUpdate={updateClient} deleteClients={deleteClients} onUpdateClient={handleUpdateClient} />}
          />
          <Route
            path="/staff"
            element={<Staff staffs={staffs} managers={managers} updateStaff={updateStaff} deleteStaffs={deleteStaffs} handleUpdateStaff={handleUpdateStaff} />}
          />
          <Route
            path="/calculation"
            element={<LeaveCalculation leave_types={leave_types} leave_calculations={leave_calculations} staffs={staffs} updateCalculation={updateCalculation} deleteCalculations={deleteCalculations} handleUpdateCalculation={handleUpdateCalculation} />}
          />
           <Route
            path="/manager"
            element={<Managers managers={managers} updateManager={updateManager} deleteManagers={deleteManagers} handleUpdateManager={handleUpdateManager} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={projects} clients={clients} handleUpdateProject={handleUpdateProject} deleteProjects={deleteProjects} handleUpdateProjects={handleUpdateProjects} />}
          />
          <Route
            path="/leave-form"
            element={<LeaveForm staffs={staffs} onUpdateForm={handleUpdateForm} />}
          />
          <Route
            path="/leave-request"
            element={<LeaveRequest forms={forms} setForms={setForms} updateForm={updateForm} />}
          />
          <Route
            path="/leave-type"
            element={<LeaveType staffs={staffs} leave_types={leave_types} updateLeave={updateLeave} onUpdateLeave={handleUpdateLeave} deleteLeave={deleteLeave} />}
          />
          <Route
            path="/timesheets"
            element={<TimeSheets timesheets={timesheets} tasks={tasks} updateSheet={updateSheet} deleteData={deleteData} onUpdateSheet={handleUpdateSheet} />}
          />

        </Routes>
      </AdminLayout>
    </div>
  );
}

export default AdminDashboard;
