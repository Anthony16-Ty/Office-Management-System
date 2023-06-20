import React, { useEffect, useState } from 'react'
import Projects from '../pages/Projects';
import axios from 'axios';

const ProjectDashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    })

    async function fetchProjects() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          const data = response.data;
          setProjects(data);
        } catch (error) {
          console.log(error);
        }
      }

    async function updateProjects(id, newData) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newData);
        const data = response.data;
        setProjects(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users${id}`);
        const data = response.data;
        setProjects(data);
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

      function handleUpdateProject(newProject) {
        // const updatedUsers = users.map((user) => {
        //   if (user.id === newBuyer.id) {
        //     return newBuyer;
        //   }
        //   return user;
        // });
        // setUsers([...users, updatedUsers]);
        setProjects([...projects, newProject])
      }
  return (
    <div>
      <Projects onAddProject={handleUpdateProject} projects={projects} deleteData={deleteData} updateData={updateProjects} />
    </div>
  )
}

export default ProjectDashboard







