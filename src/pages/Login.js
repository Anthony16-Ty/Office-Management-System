import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  paper: {
    padding: theme.spacing(4),
    width: 400,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  
  
  
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" component="h1" align="center">
          Login
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <div style={{border: "1px solid", borderColor: "lightBlue", textDecoration: "none", 
           borderRadius: "3px", backgroundColor: "transparent", paddingTop: "3px", paddingBottom: "3px",
           color: "blue", textAlign :"center"}} 
           onClick={handleSignUp}>
            <Link to='/signup'>{'Sign Up'}</Link>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;