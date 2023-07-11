import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveHistory({ staffId=1, fetchLeaveHistory }) {
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await axios.get(`https://oms-api-production-acab.up.railway.app/forms?staff_id=${staffId}`);
        const forms = response.data;
        const staffLeaveHistory = forms.filter((form) => form.staff_id === staffId);
        setLeaveHistory(staffLeaveHistory);
      } catch (error) {
        console.error('Error fetching leave history:', error);
      }
    };

    fetchLeaveHistory();
  }, [fetchLeaveHistory, staffId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leave History</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Leave Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((form) => (
            <tr key={form.id}>
              <td>{form.your_name}</td>
              <td>{form.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveHistory;
