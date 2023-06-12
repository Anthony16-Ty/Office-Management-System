import React from 'react';
// import Projects from './Projects';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(75),
    marginTop: theme.spacing(0.5),
  },
  button: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1, 1),
  },
  heading: {
    lineHeight: '1.5',
    margin: theme.spacing(3),
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
          <div className={classes.buttonContainer}>
            <div style={{float: "right"}}>
              <Link to='/login' style={{textDecoration: "none"}}>
               <Button variant='contained' color='primary' 
                className={classes.button}>
                {'Login'}
               </Button>
              </Link>
            </div>
            <div>
              <Link to='/signup' style={{textDecoration: "none"}}>
               <Button variant='contained' color='secondary' 
                className={classes.button}>
                {'Sign Up'}
               </Button>
              </Link>
            </div>
          </div>
          <div style={{lineHeight: "2rem", display: "flex", justifyContent: "space-between"}}>
            <div>
              <Typography variant='h3' className={classes.heading}>Welcome To <br /> Our Office  <br /> Management System
              </Typography>
            </div>
            <div style={{margin: "1.5rem"}}>
              <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
              alt="Office" height="380" />
            </div>
          </div>
    </div>
  );
}

export default Home;