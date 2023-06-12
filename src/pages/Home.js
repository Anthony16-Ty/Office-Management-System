import React from 'react';
// import Staff from './Staff';
import Projects from './Projects';
import { SidebarData } from '../components/SidebarData';

function Home() {
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Home</h1>
      
      <Projects />
    </div>
  );
}

export default Home;