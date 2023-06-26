import React, { useEffect, useState } from 'react'
import Projects from '../pages/Projects';
import axios from 'axios';

const ProjectDashboard = () => {
    const [projects, setProjects] = useState([]);

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
        console.error('Error updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        setProjects(projects.filter(project => project.id !== id));
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








