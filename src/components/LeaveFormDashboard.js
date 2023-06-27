import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LeaveForm from './LeaveForm';

const LeaveFormDashboard = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        fetchForms();
    });

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

  async function deleteData(id) {
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
  return (
    <div>
      <LeaveForm onUpdateForm={handleUpdateForm}   />
      <LeaveRequest forms={forms} updateForm={updateForm} deleteData={deleteData} />
    </div>
  )
}

export default LeaveFormDashboard
