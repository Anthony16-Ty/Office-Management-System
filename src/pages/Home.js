import React from 'react';
// import Projects from './Projects';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(75),
    marginTop: theme.spacing(0.5),
  },
  button: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  heading: {
    lineHeight: '1.5',
    marginTop: theme.spacing(9),
    marginLeft: theme.spacing(7),
    color: "white",
    fontWeight: "bold",
  },
  image: {
    borderRadius: "5px",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <div style={{lineHeight: "2rem", display: "flex", justifyContent: "space-between"}}>
        <div>
          <Typography variant='h3' className={classes.heading}>Welcome To <br /> Our Office  <br /> Management System
          </Typography>
        </div>
        <div style={{marginTop: "2.5rem", marginRight: "1.5rem"}}>
          <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
          alt="Office" height="400" className={classes.image}/>
        </div>
      </div>
    </div>
  );
}

export default Home;