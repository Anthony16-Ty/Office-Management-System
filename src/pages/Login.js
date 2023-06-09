import React, { useState } from 'react';

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
    height: '100vh',
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
          <Button variant="outlined" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
