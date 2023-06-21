import React from 'react';

function Home() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="leading-9 mt-16 ml-28 text-white font-bold">
            Welcome To <br /> Our Office  <br /> Management System
          </h3>
        </div>
        <div className="mt-10 mr-6">
          <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
            alt="Office" height="400" className="rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Home;