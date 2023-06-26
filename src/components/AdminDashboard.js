import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Tasks from '../pages/Tasks';
import Staff from '../pages/Staff';
import Projects from '../pages/Projects';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveForm from '../pages/LeaveForm';
import { LeaveType } from '../pages/LeaveType';
import Client from '../pages/Client';
import TimeSheets from '../pages/TimeSheets';

function AdminDashboard() {

    return (
      <div>
        <h2>Welcome to Admin Dashboard</h2>

        <AdminLayout>
          <Routes>
            <Route path="/admin/tasks" element={<Tasks />} />
            <Route path="/admin/staff" element={<Staff />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/timesheets" element={<TimeSheets />} />
            <Route path="/admin/leave-form" element={<LeaveForm />} />
            <Route path="/admin/leave-request" element={<LeaveRequest />} />
            <Route path="/admin/leave-type" element={<LeaveType />} />
            <Route path="/admin/client" element={<Client />} />
          </Routes>
        </AdminLayout>

      </div>
    );
  }

export default AdminDashboard;
