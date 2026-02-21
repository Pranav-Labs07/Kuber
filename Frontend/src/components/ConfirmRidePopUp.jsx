import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import rd from "../assets/rdm.jpg";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: props.ride?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.status === 200) {
        props.setConfirmRidePopPanel(false);
        props.setRidePopPanel(false);
        navigate('/captain-riding');
      }
    } catch (err) {
      console.error('Confirm ride error:', err);
    } finally {
      setLoading(false);
    }
  };

  const ride = props.ride || {};
  const user = ride.user || {};
  const userName = user.fullname?.firstname
    ? `${user.fullname.firstname} ${user.fullname.lastname || ''}`
    : 'Passenger';

  return (
    <div>
      <h5 className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setConfirmRidePopPanel(false)}>
        <i className="text-3xl ri-arrow-drop-down-line text-gray-500"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg'>
        <div className='flex items-center gap-3'>
          <img className='h-15 rounded-full object-cover w-15' src={rd} />
          <h2 className='text-lg font-medium'>{userName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>₹{ride.fare}</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-centre gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-2-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm text-gray-600 -mt-1'>{ride.pickup}</p>
            </div>
          </div>

          <div className='flex items-centre gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm text-gray-600 -mt-1'>{ride.destination}</p>
            </div>
          </div>

          <div className='flex items-centre gap-5 p-3'>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
              <p className='text-sm text-gray-600 -mt-1'>Cash/Online</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter OTP from passenger'
            />
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-green-600 flex justify-center text-white font-semibold rounded-lg p-2 mt-2'
            >
              {loading ? 'Confirming...' : 'Confirm Ride'}
            </button>
            <button
              type='button'
              onClick={() => {
                props.setConfirmRidePopPanel(false);
                props.setRidePopPanel(false);
              }}
              className='w-full mt-1 bg-red-600 text-white font-semibold rounded-lg p-2'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ConfirmRidePopUp;
