import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';

export const LeaveType = ({leaves, onUpdateLeave, deleteLeave, updateLeave}) => {
  const [formData, setFormData] = useState({
    name: "",
    days: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!formData.name || !formData.days){
        console.log('Please fill out all the form fields.');
        return;
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
    const data = response.data
    onUpdateLeave(data);
    setFormData({name: "", days: ""});
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='form-type'>
      <FormGroup style={{marginLeft: "2rem"}}>
        <div style={{marginTop: "10px", display: "flex", marginBottom: "10px"}}>
          <Label style={{fontWeight: "bold", fontSize: "18px", marginRight: "5px"}}>Name: </Label>
          <Input type="text" name="text" placeholder="Enter Name" style={{width: "55%"}} onChnage={handleChange} required></Input>
        </div>
        <div style={{marginTop: "10px", display: "flex"}}>
          <Label style={{fontWeight: "bold", fontSize: "18px", marginRight: "14px"}}>Days: </Label>
          <Input type="text" name='text' placeholder="Enter Days Allowed" style={{width: "55%"}} onChange={handleChange} required></Input>
        </div>

      </FormGroup>
      <Button type="submit" style={{marginLeft: "5.5rem", backgroundColor: "blue", color: "white"}}>Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}
