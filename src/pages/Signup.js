import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("regular"); // Default user type is regular

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here based on the userType
    if (userType === "admin") {
      // Handle admin sign-up
      console.log("Admin sign-up:", name, email, password);
    } else {
      // Handle regular user sign-up
      console.log("Staff sign-up:", name, email, password);
    }
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/05/06/79/02/240_F_506790264_N8BVZ9NLLRrTAShK6PADQmo0SZ4LUuJJ.jpg')", // Add the URL of the background image here
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center mt-4 border rounded-md overflow-hidden bg-white/25 shadow-md w-2/5 min-w-[300px] max-w-[40%]">
          <h1 className="text-2xl mb-4">Sign Up</h1>
          <form className="flex flex-col w-2/3" onSubmit={handleSubmit}>
            <input
              className="mb-4 border border-gray-400 rounded-md p-2"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <input
              className="mb-4 border border-gray-400 rounded-md p-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              className="mb-4 border border-gray-400 rounded-md p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <input
              className="mb-4 border border-gray-400 rounded-md p-2"
              type="password"
              placeholder="Confirm Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label className="mb-2">
              User Type:
              <select
                className="ml-2 border border-gray-400 rounded-md p-2"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="regular">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
