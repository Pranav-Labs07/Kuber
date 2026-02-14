import React, { useState } from 'react';
import {CaptainDataContext} from '../context/CaptainContext';
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

  const {captain,setCaptain} =React.useContext(CaptainDataContext)

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
        localStorage.setItem('token',data.token)
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
        // express-validator returns array under errors or object
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
              alt="Uber Logo"
            />
    
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                {errors.map((err, idx) => (
                  <div key={idx} className="text-red-700 text-sm">{err.msg || err.message || JSON.stringify(err)}</div>
                ))}
              </div>
            )}

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
               value={lastN}
               onChange={(e)=>{
                setLastN(e.target.value)
               }}
               
               />
          
             </div>
            
            <h3 className="text-lg font-medium mb-2">What's your Email</h3>
            <input
            required
            className="bg-[#eeeeee mb-5 rounded px-4 py-2 border w-full placeholder:text-base text-lg"
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
            className="bg-[#eeeeee mb-5 rounded px-4 py-2 border w-full placeholder:text-sm text-lg"
            type='password'
            placeholder='Enter password'
            value={password}
               onChange={(e)=>{
                setPassword(e.target.value)
               }}
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-2 mb-5">
              <input
                required
                className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border placeholder:text-base text-base"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border placeholder:text-base text-base"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>

            <div className="flex gap-2 mb-5">
              <input
                required
                className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border placeholder:text-base text-base"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border placeholder:text-base text-base"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

          
    
              <button className="bg-[#111]  mt-4 text-white font-semibold rounded p-2 w-full text-lg">
                Create Captain Account
              </button>
            </form>
    
            <p className="text-center mt-4">
                       Already have account ?{' '} 
                      <Link to="/login" className="text-blue-600 underline">
                     Login here
                      </Link>
                    </p>
            
                    <Link
                      to="/captain-login"
                      className="bg-[#37ab2a] mt-6 flex items-center justify-center text-white font-semibold rounded p-2 w-full text-lg"
                    >
                      Sign in as a User
                    </Link>
          </div>
        </div>
        </div>
  )
}

export default CaptainSignup