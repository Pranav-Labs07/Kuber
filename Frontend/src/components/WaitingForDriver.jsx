import react from 'react';
import Carr from '../assets/uber-go.jpg';

const WaitingForDriver = (props) => {
  const ride = props.ride || {};
  const captain = ride.captain || {};
  const captainName = captain.fullname?.firstname
    ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}`
    : 'Finding captain...';
  const vehiclePlate = captain.vehicle?.plate || '---';
  const vehicleColor = captain.vehicle?.color || '';

  return (
    <div>
      <h5 className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setWaitingForDriver && props.setWaitingForDriver(false)}>
        <i className="text-3xl ri-arrow-drop-down-line text-gray-500"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img className='h-25' src={Carr} />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>{captainName}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{vehiclePlate}</h4>
          <p className='text-sm text-gray-600'>{vehicleColor}</p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-centre gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-2-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm text-gray-600 -mt-1'>{ride.pickup || props.pickup || ''}</p>
            </div>
          </div>

          <div className='flex items-centre gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm text-gray-600 -mt-1'>{ride.destination || props.destination || ''}</p>
            </div>
          </div>

          <div className='flex items-centre gap-5 p-3'>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride.fare || props.fare || ''}</h3>
              <p className='text-sm text-gray-600 -mt-1'>Cash/Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WaitingForDriver;