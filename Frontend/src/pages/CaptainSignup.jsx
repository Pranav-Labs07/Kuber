import React, { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CaptainSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('') // ✅ FIXED: was 'lastN', caused crash in JSX
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { setCaptain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(`/captains/register`, CaptainData);

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('captain-token', data.token)

        // Emit join after signup so socketId is saved immediately
        if (socket && data.captain?._id) {
          const emitJoin = () => {
            socket.emit('join', {
              userId: data.captain._id,
              userType: 'captain'
            });
          };
          if (socket.connected) {
            emitJoin();
          } else {
            socket.once('connect', emitJoin);
          }
        }

        // Reset form
        setErrors([])
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')

        navigate('/captain-home')
      }

    } catch (err) {
      const resp = err.response?.data
      if (!resp) {
        setErrors([{ msg: 'Network error or server did not respond' }])
      } else if (resp.errors) {
        if (Array.isArray(resp.errors)) {
          setErrors(resp.errors)
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
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        {/* ✅ Show validation errors */}
        {errors.length > 0 && (
          <div className='mb-4'>
            {errors.map((err, i) => (
              <p key={i} className='text-red-500 text-sm'>{err.msg}</p>
            ))}
          </div>
        )}

        <form onSubmit={submitHandler}>

          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName} // ✅ FIXED: was 'lastName' (undefined), now correctly bound
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Create Captain Account
          </button>

        </form>

        <p className='text-center'>
          Already have an account?{' '}
          <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>
      </div>

      <div>
        <p className='text-[10px] mt-6 leading-tight'>
          This site is protected by reCAPTCHA and the{' '}
          <span className='underline'>Google Privacy Policy</span> and{' '}
          <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
