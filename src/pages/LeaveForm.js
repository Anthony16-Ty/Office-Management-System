import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import React, { useEffect,useState } from 'react'
import { Container } from '@mui/system';



const LeaveForm = ({ handlePosting}) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('')
    const [leaveForm, setLeaveForm] = useState([])
    const [formData, setFormData] = useState({
      request_id: '',
      staff_id: '',
     date_from: '',
      date_to: '',
      reason_for_leave: '',
      leave_type: '',
    
    })
    
    useEffect( () => {
      fetch("")
      .then(res => res.json())
      .then(data => setLeaveForm(data))
    },[])

    function handleSubmit(e){
        e.preventDefault();
        fetch(``,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(data => {
            handlePosting(data)
        })

        setFormData({
          request_id: '',
          staff_id: '',
         date_from: '',
          date_to: '',
          reason_for_leave: '',
          leave_type: '',
          
        })
    }

    function handleChange(e){
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    }  

  return (
    <div className='container'>
      <div>
        <Container className='leave-form'>
          <h5 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", marginTop: "10px" }}>
            Request Leave 
          </h5>
          <Box style={{marginLeft: "6rem"}}>
            <FormControl sx={{ m: 1, width: '30ch' }}>
              <FormHelperText style={{ fontSize: "12px", fontWeight: "bold"}}>Please Enter Request Id</FormHelperText>
              <Input name="request_id" value={formData.request_id} onChange={handleChange}/>
            </FormControl>

      <div>
        <FormControl sx={{ m: 2, width: '30ch' }}>
            <FormHelperText style={{ fontSize: "12px", fontWeight: "bold"}}>Please Enter Staff Id</FormHelperText>
            <Input name="staff_id" value={formData.staff_id} onChange={handleChange}/>
            
        </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }}>
            <FormHelperText style={{ fontSize: "12px", fontWeight: "bold"}}>Please Enter Date From</FormHelperText>
            <Input type='date' id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }}>
            <FormHelperText style={{ fontSize: "12px", fontWeight: "bold"}}>Please Enter Date To</FormHelperText>
            <Input type='date' id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            
        </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }}>
            <FormHelperText style={{ fontSize: "12px", fontWeight: "bold"}}>Please Enter Reason For Leave</FormHelperText>
            <Input name="reason_for_leave" value={formData.reason_for_leave} onChange={handleChange}/>
           
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }}>
            <FormHelperText style={{ fontSize: "12px", fontWeight: "bold"}}>Please Enter Type of Leave</FormHelperText>
            <Input name="leave_type" value={formData.leave_type} onChange={handleChange}/>
        </FormControl>
      </div>
      </Box>
      <div>
        <FormControl sx={{ display: "flex", flexWrap: "wrap", m: 1, width: '10ch' }}>
            <Button variant='outlined' type='submit' onClick={handleSubmit} 
            style={{color: 'white', backgroundColor: "blue", marginTop: "10px", marginLeft: "10.5rem"}}>
                Submit
            </Button>
        </FormControl>
      </div>
    </Container>
    </div>
    
  </div>

    
  );
}

export default LeaveForm;