import React, { useState } from 'react';
import Moto from "../assets/Motoo.jpg"
import car from "../assets/uber-go.jpg"
import Auto from "../assets/auto.jpg"

const VehiclePanel = (props) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  return(
    <div>
      <h5 
        className="p-1 text-center w-[93%] absolute top-0 left-0 cursor-pointer bg-white"
        onClick={() => {
            props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl ri-arrow-drop-down-line text-gray-500"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

      <div onClick={() => 
        [props.setConfirmRidePanel(true),
         props.selectVehicle('car'),
         setSelectedVehicle('uber-go')]} 
        className={`flex ${selectedVehicle === 'uber-go' ? 'border-2 border-black' : 'border-2 border-gray-300'} p-3 mb-2 rounded-xl w-full items-center justify-between cursor-pointer hover:border-black transition-colors`}>
        <img className='h-15' src={car} alt="Car" />
        <div className='w-1/2'>
          <h4 className='font-medium text-sm'>Kuber Go<span><i className="ri-user-3-fill"> 4 </i></span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-medium text-sm text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-xl font-semibold'>₹{props.fare?.car ?? "N/A"}</h2>
      </div>

      <div onClick={() =>
        [props.setConfirmRidePanel(true),
         props.selectVehicle('auto'),
         setSelectedVehicle('Auto')]} 
        className={`flex ${selectedVehicle === 'Auto' ? 'border-2 border-black' : 'border-2 border-gray-300'} p-3 mb-2 rounded-xl w-full items-center justify-between cursor-pointer hover:border-black transition-colors`}>
        <img className='h-15' src={Auto} alt="Auto" />
        <div className='bg-greeen-500 w-1/2'>
          <h4 className='font-medium text-sm'>Auto<span><i className="ri-user-3-fill">3</i></span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-medium text-sm text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-xl font-semibold'>₹{props.fare?.auto ?? "N/A"}</h2>
      </div>

      <div onClick={() => 
        [props.setConfirmRidePanel(true),
         props.selectVehicle('moto'),
         setSelectedVehicle('Moto')]} 
        className={`flex ${selectedVehicle === 'Moto' ? 'border-2 border-black' : 'border-2 border-gray-300'} p-3 mb-2 rounded-xl w-full items-center justify-between cursor-pointer hover:border-black transition-colors`}>
        <img className='h-15' src={Moto} alt="Moto" />
        <div className='bg-greeen-500 w-1/2'>
          <h4 className='font-medium text-sm'>Moto<span><i className="ri-user-3-fill"> 1</i></span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-medium text-sm text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-xl font-semibold'>₹{props.fare?.moto ?? "N/A"}</h2>
      </div>
    </div>
  );
}
export default VehiclePanel