import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  // Check if the current location matches the dashboard path
  const isDashboard = location.pathname.startsWith('/admindashboard');

  return (
    <div className="flex h-screen text-center">
      {isDashboard && (
        <div className="w-1/5 bg-gray-200">
          <Sidebar />
        </div>
      )}
      <div className="w-4/5 flex-grow overflow-y-auto bg-gray-100">
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
