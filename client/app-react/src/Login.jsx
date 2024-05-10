import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Cookies from 'js-cookie'
// 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
const Login = ({connected,setConnected}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  axios.create({withCredentials: true});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      Cookies.set('userId', response.data.user._id, { expires: 1 }); // expires in 7 days
      setMessage(response.data);
      setConnected(true);
    } catch (error) {setMessage(error.response.data.message);}
  }

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;