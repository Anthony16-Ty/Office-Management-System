// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import Tasks from '../pages/Tasks'

// const TaskDashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     useEffect(() => {
//         fetchTasks();
//     })

//     useEffect(() => {
//       const storedTasks = localStorage.getItem('tasks');
//       if (storedTasks) {
//         setTasks(JSON.parse(storedTasks));
//       }
//     }, []);

//     useEffect(() => {
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }, [tasks]);

//     async function fetchTasks() {
//         try {
//             const response = await axios.get('http://localhost:3000/tasks');
//             const data = response.data;
//             setTasks(data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async function updateTasks(id, newData) {
//       try {
//         const response = await axios.put(`http://localhost:3000/tasks/${id}`, newData);
//         const data = response.data;
//         setTasks(data);
//       } catch (error) {
//         console.error('Errror updating data:', error);
//       }
//     }

//     async function deleteData(id) {
//       try {
//         await axios.delete(`http://localhost:3000/tasks/${id}`);
//         setTasks(tasks.filter(task => task.id !== id));
//       } catch (error) {
//         console.error('Error Deleting data:', error);
//       }
//     }

//     function handleUpdateTask(newTask) {
//         setTasks([...tasks, newTask])
//     }

//   return (
//     <div>
//       <Tasks onUpdateTask={handleUpdateTask} tasks={tasks} deleteData={deleteData} onUpdate={updateTasks} />
//     </div>
//   )
// }

// export default TaskDashboard
