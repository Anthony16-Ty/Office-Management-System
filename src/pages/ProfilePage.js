import React from 'react';

const ProfilePage = ({ handleLogout }) => {
  const user = {
    name: 'Anthony Kimani',
    location: 'Nairobi, Kenya',
    about: 'Admin',
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <div className="w-full flex flex-row items-start bg-black text-white p-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
          alt="User Avatar"
          className="w-40 h-40 rounded-full border border-white"
        />
        <div className='mt-10 ml-4'>
          <h2 className="text-lg text-2xl text-white">{user.name}</h2>
          <p className="text-xl text-white">{user.location}</p>
        </div>
      </div>
      <div className="flex-grow bg-white py-1 flex items-start">
        <div>
          <div className='flex justify start ml-8'>
            <button className="mt-2 bg-blue-400 text-white-500 py-2 px-4 rounded">Edit Profile</button>
          </div>
          <div className="flex justify-between ml-5">
            <div>
              <h4 className="text-blue-500 mt-4 underline text-2xl">About</h4>
              <h6 className='text-black text-xl'>Staff Member</h6>
            </div>
            <div className='ml-10'>
              <h4 className="text-blue-500 mt-4 underline text-2xl">Roles</h4>
              <ul className='text-black text-bold text-xl'>
                <div className='flex justify around mt-3'>
                  <div>
                    <li className='ml-6 mb-2'>Joining Date: <strong>23/05/2023</strong></li>
                    <li className='mb-2'>Reporting To: <strong>Anthony</strong></li>
                    <li className='mb-2'>Id Number: <strong>35674849</strong></li>
                  </div>
                  <div>
                    <li className='ml-5 mb-2'>Email: <strong>anthony@gmail.com</strong></li>
                    <li className='mb-2'>TechStack: <strong>FullStack D</strong></li>
                    <li className='mr-5'>Mobile: <strong>0703383959</strong></li>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <button
            className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 mt-24 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
