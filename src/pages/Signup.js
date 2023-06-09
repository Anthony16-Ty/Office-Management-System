import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  textField: {
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
  },
});

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          required
        />
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
