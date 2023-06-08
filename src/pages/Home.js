import React from 'react';
// import Staff from './Staff';
import Projects from './Projects';
import { SidebarData } from '../components/SidebarData';

function Home() {
  return (
    <div className='home'>
      <h1>Home</h1>
      
      <Projects />
    </div>
  );
}

export default Home;