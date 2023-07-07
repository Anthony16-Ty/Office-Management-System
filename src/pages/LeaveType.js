import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LeaveType = ({ onUpdateLeave, dashboardType, staffs}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leave_reason: '',
    Total_days_allowed: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://oms-api-production-acab.up.railway.app/leave_types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Network response was not ok. Response status: ${response.status}`);
        }
      })
      .then(function (data) {
        onUpdateLeave(data);

        setFormData({
          leave_reason: '',
          days_allowed: '',
        });

        if (dashboardType === 'admin') {
          navigate('/admindashboard/leave-report'); // Navigate to /admindashboard/leave-report for admin dashboard
        } else if (dashboardType === 'staff') {
          navigate('/stdashboard/leave-report'); // Navigate to /stdashboard/leave-report for staff dashboard
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='mx-auto bg-white rounded-lg shadow-lg ml-15 px-1 py-8 w-96'>
      <div>
        <form onSubmit={handleSubmit} className='justify-center'>
          <h5 className='text-center text-xl font-bold mt-4 text-green-500'>
            Leave Type
          </h5>
          <div className='ml-1'>

          <div className="form-group mt-3">
              <label htmlFor="client_details">Staff Name</label>
                <select
                  className="form-control"
                  name="leave_reason"
                  id="leave_reason"
                  value={formData.leave_reason}
                  onChange={handleChange}
                  >
                  <option value="">Select Staff Name</option>
                    {staffs &&
                      Array.isArray(staffs) &&
                      staffs.map((staff) => (
                        <option key={staff.id} value={staff.staff_name}>
                         ID: {staff.id} Name: {staff.staff_name}
                        </option>
                      ))}
                  </select>
            </div>

            <div className='m-1'>
              <label className='block text-sm font-bold mb-1'>
                Enter Days Allowed
              </label>
              <input
                name='days_allowed'
                value={formData.days_allowed}
                onChange={handleChange}
                className='border border-gray-400 rounded-md p-2 w-full'
              />
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='bg-blue-500 text-white font-bold py-2 px-4 mt-4 mr-5 rounded-md'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LeaveType };
