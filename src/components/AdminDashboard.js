import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Staff from '../pages/Staff';
import Projects from '../pages/Projects';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveForm from '../pages/LeaveForm';
import { LeaveType } from '../pages/LeaveType';
import TimeSheets from '../pages/TimeSheets';
import AdminLayout from './AdminLayout';
import axios from 'axios';

function AdminDashboard() {
  const [timesheets, setTimesheets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchTimesheets();
    fetchTasks();
    fetchStaffs();
    fetchProjects();
    fetchForms();
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
      const response = await axios.get('https://oms-api-production.up.railway.app/timesheets');
      const data = response.data;
      setTimesheets(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateSheet(id, newData) {
    try {
      const response = await axios.put(`https://oms-api-production.up.railway.app/timesheets/${id}`, newData);
      const data = response.data;
      setTimesheets(data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  async function deleteData(id) {
    try {
      await axios.delete(`https://oms-api-production.up.railway.app/timesheets/${id}`);
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
      const response = await axios.get('https://oms-api-production.up.railway.app/tasks');
      const data = response.data;
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on tasks
  async function updateTask(id, newData) {
    try {
      await axios.put(`https://oms-api-production.up.railway.app/tasks/${id}`, newData);
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...newData };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Perform delete operation on tasks
  async function deleteTasks(id) {
    try {
      await axios.delete(`https://oms-api-production.up.railway.app/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }
  function handleUpdateTask(newTask) {
      setTasks([...tasks, newTask])
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
      const response = await axios.get('https://oms-api-production.up.railway.app/staffs');
      const data = response.data;
      setStaffs(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on staffs
  async function updateStaff(id, newData) {
    try {
      await axios.put(`https://oms-api-production.up.railway.app/staffs/${id}`, newData);
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
      await axios.delete(`https://oms-api-production.up.railway.app/staffs/${id}`);
      setStaffs(staffs.filter(staff => staff.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateStaff(newStaff){
      setStaffs([...staffs, newStaff])
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
      const response = await axios.get('https://oms-api-production.up.railway.app/projects');
      const data = response.data;
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on projects
  async function updateProject(id, newData) {
    try {
      await axios.put(`https://oms-api-production.up.railway.app/projects/${id}`, newData);
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
      await axios.delete(`https://oms-api-production.up.railway.app/projects/${id}`);
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
      const response = await axios.get('https://oms-api-production.up.railway.app/forms');
      const data = response.data;
      setForms(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on forms
  async function updateForm(id, newData) {
    try {
      await axios.put(`https://oms-api-production.up.railway.app/forms/${id}`, newData);
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
      await axios.delete(`https://oms-api-production.up.railway.app/forms/${id}`);
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
          <Route
            path="/tasks"
            element={<Tasks tasks={tasks} onUpdate={updateTask} deleteTasks={deleteTasks} onUpdateTask={handleUpdateTask} />}
          />
          <Route
            path="/staff"
            element={<Staff staffs={staffs} updateStaff={updateStaff} deleteStaffs={deleteStaffs} handleUpdateStaff={handleUpdateStaff} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={projects} updateData={updateProject} deleteProjects={deleteProjects} handleUpdateProject={handleUpdateProject} />}
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
