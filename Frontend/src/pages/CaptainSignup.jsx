import React, { useState, useContext } from 'react';
import {CaptainDataContext} from '../context/CaptainContext';
import {SocketContext} from '../context/SocketContext'; 
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import Ll from "../assets/llog.jpg";

const CaptainSignup=()=>{

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [firstName,setFirstName]=useState('')
  const [lastN,setLastN]=useState('')
  const [userData,setUserData] =useState({})
  const [errors, setErrors] = useState([])
  const Navigate=useNavigate()
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const {captain,setCaptain} =useContext(CaptainDataContext)
  const {socket} = useContext(SocketContext) // ✅ ADD THIS LINE

  const submitHandler = async (e) => {
    e.preventDefault()
    const CaptainData={
      fullname:{
        firstname:firstName,
        lastname:lastN
      },
      email:email,
      password:password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType:vehicleType
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData);
      if (response.status === 201){
        const data =response.data
        setCaptain(data.captain)
        localStorage.setItem('captain-token',data.token)
        
        // ✅ ADD THIS BLOCK - Emit socket join event after signup
        if (socket && data.captain?._id) {
          console.log('[v0] Emitting join event for newly registered captain:', data.captain._id);
          socket.emit('join', {
            userId: data.captain._id,
            userType: 'captain'
          });
        }
        
        Navigate('/captain-home')
      }
      setErrors([])
      setEmail('')
      setFirstName('')
      setLastN('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    } catch (err) {
      const resp = err.response?.data
      if (!resp) {
        setErrors([{ msg: 'Network error or server did not respond' }])
      } else if (resp.errors) {
        if (Array.isArray(resp.errors)) {
          setErrors(resp.errors)
        } else if (Array.isArray(resp.errors?.array)) {
          setErrors(resp.errors.array)
        } else if (resp.errors?.message) {
          setErrors([{ msg: resp.errors.message }])
        } else {
          setErrors([{ msg: JSON.stringify(resp.errors) }])
        }
      } else if (resp.message) {
        setErrors([{ msg: resp.message }])
      } else {
        setErrors([{ msg: 'Signup failed' }])
      }
    }
  }

  return (
    <div>
      <div className="p-7 flex flex-col justify-between min-h-screen">
        <div>
          <img
            className="w-40 mb-6"
            src={Ll}
            alt="Logo"
          />
          {/* Rest of your signup form JSX */}
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;