import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3000/login', {
        email,
        password,
      });
      const { data } = response;

      // Check if login was successful
      if (data.success) {
        // Call the onLogin function passed from parent component to update login state
        onLogin();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError('Incorrect Email or Password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-60vh">
      <div className="p-8 bg-white shadow-md rounded-md w-72">
        <h1 className="text-2xl text-center">Login</h1>
        {error && <div className="error">{error}</div>}
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="border border-lightBlue rounded-md bg-transparent py-1 px-2 text-blue-500 text-center">
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


