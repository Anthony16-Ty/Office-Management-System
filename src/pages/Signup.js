import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <div className="flex flex-col items-center mt-4 border rounded-md overflow-hidden bg-white shadow-md w-2/5 min-w-[300px] max-w-[40%]">
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
        <button
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;