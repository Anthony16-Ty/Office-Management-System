import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [techStack, setTechStack] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTechStackChange = (e) => {
    setTechStack(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs (e.g., check password match, required fields, etc.)
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }

    // Create a staff object to send to the server
    const staff = {
      staff_name: name,
      joining_date: new Date(), // Set the joining date
      reporting_to: "", // Set the reporting manager
      email,
      password,
      password_confirmation: confirmPassword,
      tech_stack: techStack,
      isStaff: true,
      admin_id: 0, // Set the admin ID as per your requirements
    };

    // Send the staff object to the server or perform further actions
    console.log(staff);
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <textarea
              className="mb-4 border border-gray-400 rounded-md p-2"
              placeholder="Tech Stack"
              value={techStack}
              onChange={handleTechStackChange}
              required
            />
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
