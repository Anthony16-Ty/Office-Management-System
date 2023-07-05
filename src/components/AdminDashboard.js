import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Staff from '../pages/Staff';
import Projects from '../pages/Projects';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveForm from '../pages/LeaveForm';
import { LeaveType } from '../pages/LeaveType';
import LeaveReport from '../pages/LeaveReport';
import TimeSheets from '../pages/TimeSheets';
import Client from '../pages/Client';
import ClientForm from '../pages/ClientForm';
import Managers from '../pages/Managers';
import AdminLayout from './AdminLayout';
import axios from 'axios';

function AdminDashboard({staffs, handleUpdateStaff, deleteStaffs, updateStaff}) {
  const [timesheets, setTimesheets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [forms, setForms] = useState([]);
  const [clients, setClients] = useState([]);
  const [leave_types, setLeave_types] = useState([]);
  const [managers, setManagers] = useState([]);

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
  async function updateClient(id, newData) {
    try {
      const response = await axios.put(`https://oms-api-production-acab.up.railway.app/clients/${id}`, newData);
      const data = response.data;
      setClients(data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
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
      <h2 className='text-center'>Welcome to Admin Dashboard</h2>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admindashboard/projects" />} />
          <Route
            path="/tasks"
            element={<Tasks tasks={tasks} staffs={staffs} managers={managers} onUpdate={updateTask} deleteTasks={deleteTasks} onUpdateTask={handleUpdateTask} />}
          />
          <Route
            path="/staff"
            element={<Staff staffs={staffs} managers={managers} updateStaff={updateStaff} deleteStaffs={deleteStaffs} handleUpdateStaff={handleUpdateStaff} />}
          />
           <Route
            path="/manager"
            element={<Managers managers={managers} updateManager={updateManager} deleteManagers={deleteManagers} handleUpdateManager={handleUpdateManager} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={projects} handleUpdateProject={handleUpdateProject} deleteProjects={deleteProjects} handleUpdateProjects={handleUpdateProjects} />}
          />
          <Route
            path="/leave-form"
            element={<LeaveForm onUpdateForm={handleUpdateForm} />}
          />
          <Route
            path="/leave-request"
            element={<LeaveRequest forms={forms} updateForm={updateForm} deleteForms={deleteForms} />}
          />
          <Route
            path="/client-form"
            element={<ClientForm onUpdateClient={handleUpdateClient} />}
          />
          <Route
            path="/client"
            element={<Client clients={clients} updateClient={updateClient} deleteClients={deleteClients} />}
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
            element={<TimeSheets timesheets={timesheets} updateSheet={updateSheet} deleteData={deleteData} onUpdateSheet={handleUpdateSheet} />}
          />
          <Route path="/leave-type" element={<LeaveType />} />

        </Routes>
      </AdminLayout>
    </div>
  );
}

export default AdminDashboard;
