import React from "react";
import DatePicker from 'react-datepicker';
import { Select, Option } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react'
import  "../components/LeaveRequestForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LeaveForm() {
    const [ requestId, setRequestId ] = useState('')
    const [ staffId, setStaffId] = useState('')
    const [ leaveType, setLeaveType ] = useState('')
    const [ leaveReason, setLeaveReason ] = useState('')
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    // const handleChange = (event) => {
    //   setGender(event.target.value)
    //   setJobType(event.target.value)
    // }
    
    function handleSubmit(e){
      e.preventDefault()
      fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          request_id: requestId,
          staff_id: staffId,
          date_from: dateFrom,
          date_to: dateTo,
          leave_reason: leaveReason,
          leave_type: leaveType,
          
        })
      })
      .then(res=> res.json())
      .then(data => {
        console.log(data)
        
        setRequestId('')
        setStaffId('')
        setLeaveType('')
        setLeaveReason ('')
        setDateFrom('')
        setDateTo('')
        
      })
      .catch(err => err.message)

      document.querySelector('form').reset() }
    return (
    <div className="container">
      <div className="contact-box">
        <div className="left"></div>
        <div className="right">
          <h2> Leave Application Form💡</h2>
          <form onSubmit={handleSubmit}>
      
            <input
              type='integer'
              required
              className ="field"
              placeholder='Request Id'
              value={ requestId }
              onChange={(e) => setRequestId(e.target.value)}
            ></input>
            <input
              type='integer'
              required
              className ="field"
              placeholder='Staff Id'
              value={ staffId}
              onChange={(e) => setStaffId(e.target.value)}
            ></input>
            <br />
            
            <input
              type='text'
              required
              className ="field"
              placeholder='Leave Type'
              value={ leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            ></input>
            <br />
          
          <textarea placeholder="Leave Reason" className="field" value={ leaveReason }
               onChange={(e) => setLeaveReason(e.target.value)}></textarea>
          <br />
         
          <div class="flex items-center justify-center">
          <label className='name1'>Date From:</label>
          <br />
          <DatePicker
            selected={dateFrom}
            onChange={(date) => setDateFrom(date)}
            isClearable
            placeholderText="Date From"
          />
          </div>
          <div class="flex items-center justify-center">
          <label className='name1'>Date To:</label>
          <br />
          <DatePicker
            selected={dateTo}
            onChange={(date) => setDateTo(date)}
            isClearable
            placeholderText="Date To"
          />
          </div>
          

          <button className="btn2">Apply</button>
          </form>
        </div>
      </div>
	  </div>
    
    );
}