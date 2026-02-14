import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Li from "../assets/llog.jpg"

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      const resp = error.response?.data;
      if (!resp) {
        setErrorMsg('Network error or server did not respond');
      } else if (resp.message) {
        setErrorMsg(resp.message);
      } else if (resp.errors) {
        if (Array.isArray(resp.errors)) setErrorMsg(resp.errors.map(e=>e.msg||e.message).join(', '));
        else setErrorMsg(JSON.stringify(resp.errors));
      } else {
        setErrorMsg('Login failed');
      }
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between min-h-screen">
      <div>
        <img
          className="w-40 mb-6"
          src={Li}
          alt="Uber Logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2 text-center">What's your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white rounded px-2 py-2 border w-full text-lg"
            required
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-xl mb-2 mt-4 text-center">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded px-2 py-2 border w-full text-lg"
            required
            type="password"
            placeholder="Password"
            minLength="6"
          />

          {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}

          <button className="bg-[#111] mt-4 text-white font-semibold rounded p-2 w-full text-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New here?{' '}
          <Link to="/signup" className="text-blue-600 underline">
            Create new Account
          </Link>
        </p>

        <Link
          to="/captain-login"
          className="bg-[#37ab2a] mt-6 flex items-center justify-center text-white font-semibold rounded p-2 w-full text-lg"
        >
          Sign in as a Captain
        </Link>
      </div>
    </div>
  );
};


export default UserLogin;
