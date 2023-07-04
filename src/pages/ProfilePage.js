import React from "react";

const ProfilePage = ({ handleLogout }) => {
  const user = {
    name: "Anthony Kimani",
    location: "Nairobi, Kenya",
    about: "Admin",
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <div className="w-full flex flex-row items-start bg-black text-white p-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
          alt="User Avatar"
          className="w-40 h-40 rounded-full border border-white"
        />
        <div className="mt-10 ml-4">
          <h2 className="text-lg text-2xl text-white">{user.name}</h2>
          <p className="text-xl text-white">{user.location}</p>
        </div>
      </div>
      <div className="flex-grow bg-white py-1 flex items-start">
        <div className="flex flex-col justify-between ml-8 mr-8">
          <div>
            <button className="mt-4 bg-blue-400 text-white py-2 px-4 rounded">
              Edit Profile
            </button>
            <h4 className="text-blue-500 mt-6 underline text-2xl">About</h4>
            <p className="text-black text-xl">{user.about}</p>
          </div>
          <div>
            <h4 className="text-blue-500 mt-8 underline text-2xl">Roles</h4>
            <ul className="text-black text-xl">
              <li className="mt-3">
                <strong>Joining Date:</strong> 23/05/2023
              </li>
              <li>
                <strong>Reporting To:</strong> Anthony
              </li>
              <li>
                <strong>ID Number:</strong> 35674849
              </li>
              <li className="mt-4">
                <strong>Email:</strong> anthony@gmail.com
              </li>
              <li>
                <strong>Tech Stack:</strong> Full Stack D
              </li>
              <li>
                <strong>Mobile:</strong> 0703383959
              </li>
            </ul>
          </div>
          <button
            className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 mt-8 rounded-full self-center"
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
