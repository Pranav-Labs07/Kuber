import React,{ useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { UserDataContext } from '../context/UserContext';

const UserSignup=()=>{

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')

const navigate=useNavigate()
const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password,
        
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);

      if (response.status ===201){  
        const data=response.data
        setUser(data.user)
         localStorage.setItem('token',data.token)
        navigate('/home')
      }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    } catch (error) {
  console.log(error.response?.data);
  alert(error.response?.data?.message || "Signup failed");
}

 }
  return (
    <div>
      <div className="p-7 flex flex-col justify-between min-h-screen">
      <div>
        <img
          className="w-40 mb-6"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="Uber Logo"
        />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

        <h3 className="text-lg font-medium mb-2">Enter your Name</h3>
        <div className="flex gap-2 mb-5 ">
          <input
           required
           className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border placeholder:text-base text-base"
           type="text"
           placeholder="First name"
           value={firstName}
           onChange={(e)=>{
            setFirstName(e.target.value)
           }}
        />          
          <input
           required
           className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border placeholder:text-base text-lg"
           type="text"
           placeholder="last name"
           value={lastName}
           onChange={(e)=>{
            setLastName(e.target.value)
           }}
           
           />
      
         </div>
        
        <h3 className="text-lg font-medium mb-2">What's your Email</h3>
        <input
        required
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full placeholder:text-base text-lg"
        type='email'
        placeholder='email@ex.com'
        value={email}
           onChange={(e)=>{
            setEmail(e.target.value)
           }}
        />

        <h3 className="text-lg font-medium mb-2">Enter your password</h3>
        <input
        required
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full placeholder:text-sm text-lg"
        type='password'
        placeholder='Enter password'
        value={password}
           onChange={(e)=>{
            setPassword(e.target.value)
           }}
        />

          <button className="bg-[#111]  mt-4 text-white font-semibold rounded p-2 w-full text-lg">Create account
          </button>
        </form>

        <p className="text-center mt-4">
                   Already have account{' '} 
                  <Link to="/login" className="text-blue-600 underline">
                 Login here
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
    </div>
  )
}

export default UserSignup