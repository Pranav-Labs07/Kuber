import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from '../context/CaptainContext'
import Cl from '../assets/captain-login.jpg';

const CaptainLogin= () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {captain,setCaptain} = React.useContext(CaptainDataContext)
    const navigate=useNavigate( )

    const SubmitHandler = async(e)=>{
      e.preventDefault();
      const captain ={
        email:email,
        password:password
      }
      
    

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

     if (response.status === 200){
      const data =response.data
      setCaptain(data.captain)
      localStorage.setItem('captain-token',data.token)
      navigate('/captain-home')
    }
  
      setEmail('');
      setPassword('');

    }    
   

  return (
  <div className="p-7 flex flex-col justify-between min-h-screen">
    <div>
    <img
          className="w-30 mb-6"
          src={Cl}
          alt="Uber Logo"
        />
    
      <form onSubmit={SubmitHandler}>
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
                />
      
                <button className="bg-[#8a0404] mt-4 text-white font-semibold rounded p-2 w-full text-lg">
                  Login
                </button>
              </form>
      
              <p className="text-center mt-4">
                New here?{' '}
                <Link to="/captain-signup" className="text-blue-600 underline">
                  Register as a Captain
                </Link>
              </p>
      
              <Link
                to="/login"
                className="bg-[#535c03] mt-6 flex items-center justify-center text-white font-semibold rounded p-2 w-full text-lg"
              >
                Sign in as a User
              </Link>

    </div>
  </div>
  );
};

export default CaptainLogin