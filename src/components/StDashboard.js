import React from 'react';
import Layout from './Layout';
import { Route, Routes} from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Projects from '../pages/Projects';
import LeaveRequest from '../pages/LeaveRequest';
import LeaveForm from '../pages/LeaveForm';
import { LeaveType } from '../pages/LeaveType';
import TimeSheets from '../pages/TimeSheets';

function StDashboard() {

    return (
      <div>
        <h2>Welcome to Staff Dashboard</h2>
        <Layout>
          <Routes>
            <Route path="/st/tasks" element={<Tasks />} />
            <Route path="/st/projects" element={<Projects />} />
            <Route path="/st/timesheets" element={<TimeSheets />} />
            <Route path="/st/leave-form" element={<LeaveForm />} />
            <Route path="/st/leave-request" element={<LeaveRequest />} />
            <Route path="/st/leave-type" element={<LeaveType />} />
          </Routes>
        </Layout>
      </div>
    );
  }

export default StDashboard;
