import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttonOne: {
    marginLeft: theme.spacing(65),
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  buttonTwo: {
    marginRight: theme.spacing(7),
    marginTop: theme.spacing(1),
  },

}));

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const classes = useStyles();

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'blue'}}>
        <div className='navbar'>
          <div>
          <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          </div>
          <div>
            <h4 style={{marginTop: "14px"}}>Menu</h4>
          </div>
          <div style={{float: "right"}}>
            <Link to='/login' style={{textDecoration: "none"}}>
              <Button variant='contained' color='primary' 
                className={classes.buttonOne}>
                {'Login'}
               </Button>
            </Link>
          </div>
          <div>
            <Link to='/signup' style={{textDecoration: "none"}}>
              <Button variant='contained' color='secondary' 
                className={classes.buttonTwo}>
                {'Sign Up'}
               </Button>
            </Link>
            </div>
          </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;