import React from 'react';
import rd from "../assets/rdm.jpg"

const RidePopUp = (props) => {
  const user = props.ride?.user;
  const pickup = props.ride?.pickup || "Pickup location not available";
  const destination = props.ride?.destination || "Destination not available";
  const fare = props.ride?.fare || "N/A";
  const firstname = user?.fullname?.firstname || "User";
  const lastname = user?.fullname?.lastname || "";

  return (
    <div>
      <h5 className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          // Use the correct prop name for closing the popup
          if (props.setRidePopPanel) props.setRidePopPanel(false);
          if (props.setRidePopupPanel) props.setRidePopupPanel(false);
        }}>
        <i className="text-3xl ri-arrow-drop-down-line text-gray-500"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg'>
        <div className='flex items-center gap-3'>
          <img className='h-15 rounded-full object-cover w-15' src={rd} />
          <h2 className='text-lg font-medium'>
            {firstname + " " + lastname}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2Km</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center '>
        <div className='w-full mt-5'>
          <div className='flex items-centre gap-5 p-3 border-b-2   '>
            <i className="text-lg ri-map-2-line"></i>
            <div>
              <h3 className='text-lg  font-medium'>Pickup</h3>
              <p className='text-sm text-gray-600 -mt-1'>{pickup}</p>
            </div>
          </div>
          <div className='flex items-centre gap-5 p-3 border-b-2  '>
            <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className='text-lg  font-medium'>Destination</h3>
              <p className='text-sm text-gray-600 -mt-1'>{destination}</p>
            </div>
          </div>
          <div className='flex items-centre gap-5 p-3 '>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg  font-medium'>{fare}</h3>
              <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='flex mt-5 w-full items-center justify-between'>
          <button onClick={() => {
            if (props.setRidePopPanel) props.setRidePopPanel(false);
            if (props.setRidePopupPanel) props.setRidePopupPanel(false);
          }} className='  bg-gray-400 text-gray-700 font-semibold  rounded-lg p-3 px-10'>Ignore</button>
          <button onClick={() => { props.setConfirmRidePopPanel(false)
           props.setConfirmRidePopPanel(true) }}
            className=' bg-green-600 text-white font-semibold  rounded-lg p-3 px-10'>Accept</button>
        </div>
      </div>
    </div>
  )
}
export default RidePopUp;