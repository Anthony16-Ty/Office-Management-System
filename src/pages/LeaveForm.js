import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import React, { useEffect,useState } from 'react'
import { Container } from '@mui/system';


const LeaveForm = ({ handlePosting}) => {
 


  // const [tech, setTech] = useFetchData()
  // const deleteTech = ()=>{
  //   fetch(`http://localhost:9292/technicians/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type":"application/json"
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(data => console.log(data))
  //   .catch(err=>console.log(err))

  //   fetch("http://localhost:9292/technicians")
  //     .then(res => res.json())
  //     .then(data => {
  //       setTech(data)
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err))
  // }



    const [formData, setFormData] = useState({
      request_id: '',
      staff_id: '',
     date_from: '',
      date_to: '',
      reason_for_leave: '',
      leave_type: '',
    
    })
    

      
    const [leaveForm, setLeaveForm] = useState([])
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
    <div>
      <div>
        <Container className='formContainer'>
    <div 
    style={{ fontSize: "20px", fontWeight: "bold" }}
    >
        Request Leave 
    </div>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Request Id</InputLabel>
            <Input name="request_id" value={formData.first_name} onChange={handleChange}/>
            <FormHelperText>Please Enter Request Id</FormHelperText>
        </FormControl>
      </div>

      <div>
        <FormControl sx={{ m: 2, width: '35ch' }}>
            <InputLabel>Staff Id</InputLabel>
            <Input name="lstaff_id" value={formData.last_name} onChange={handleChange}/>
            <FormHelperText>Please Enter Staff Id</FormHelperText>
        </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Date From</InputLabel>
            <Input name="date_from" value={formData.email} onChange={handleChange}/>
            <FormHelperText>Please Enter Date From</FormHelperText>
        </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Date To</InputLabel>
            <Input name="date_to" value={formData.phone} onChange={handleChange}/>
            <FormHelperText>Please Enter Date To</FormHelperText>
        </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Reason For Leave</InputLabel>
            <Input name="leave_for_leave" value={formData.town} onChange={handleChange}/>
            <FormHelperText>Please Enter Reason For Leave</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Leave Type</InputLabel>
            <Input name="leave_type" value={formData.job_type} onChange={handleChange}/>
            <FormHelperText>Please Enter Type of Leave</FormHelperText>
        </FormControl>
      </div>
      
    
    </Box>
    <div>
        <FormControl sx={{ display: "flex", flexWrap: "wrap", m: 1, width: '10ch' }}>
            <Button variant='outlined' type='submit' onClick={handleSubmit}>
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