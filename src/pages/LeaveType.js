import React, { useState, useContext } from 'react';

import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const LeaveType = () => {
  const [name, setName] = useState('');
  
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: uuid(),
      name
    }
  
    navigate.push("/");
  }

  const onChange = (e) => {
    setName(e.target.value);
  }

  return (
    <Form onSubmit={onSubmit} className='form-type'>
      <FormGroup style={{marginLeft: "2rem"}}>
        <div style={{marginTop: "10px", display: "flex", marginBottom: "10px"}}>
          <Label style={{fontWeight: "bold", fontSize: "18px", marginRight: "5px"}}>Name: </Label>
          <Input type="text" name="text" placeholder="Enter Name" style={{width: "55%"}} required></Input>
        </div>
        <div style={{marginTop: "10px", display: "flex"}}>
          <Label style={{fontWeight: "bold", fontSize: "18px", marginRight: "14px"}}>Days: </Label>
          <Input type="text" name='text' placeholder="Enter Days Allowed" style={{width: "55%"}} required></Input>
        </div>
        
      </FormGroup>
      <Button type="submit" style={{marginLeft: "5.5rem", backgroundColor: "blue", color: "white"}}>Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}