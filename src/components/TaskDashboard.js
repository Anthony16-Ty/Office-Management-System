import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tasks from '../pages/Tasks'

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    })

    async function fetchTasks() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const data = response.data;
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateTasks(id, newData) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newData);
        const data = response.data;
        setTasks(data);
      } catch (error) {
        console.error('Errror updating data:', error);
      }
    }

    async function deleteData(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users${id}`);
        const data = response.data;
        setTasks(data);
      } catch (error) {
        console.error('Error Deleting data:', error);
      }
    }

    function handleUpdateTask(newTask) {
        setTasks([...tasks, newTask])
    }

  return (
    <div>
      <Tasks onUpdateTask={handleUpdateTask} tasks={tasks} onDelete={deleteData} onUpdate={updateTasks} />
    </div>
  )
}

export default TaskDashboard
