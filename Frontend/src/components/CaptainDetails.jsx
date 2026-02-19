import react, { useContext } from 'react';
import {CaptainDataContext} from "../context/CaptainContext";
import Rd from "../assets/rdm.jpg"
const CaptainDetails=()=>{

  const   {captain} = useContext(CaptainDataContext)


  return(
    <div>
      <div className='flex items-center justify-between'>
  <div className='flex items-center justify-start  gap-3'>
    <img className='h-10 w-10 rounded-full object-cover' src={Rd}/>
    <h4 className='text-lg font-medium'>{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h4>
 </div>
   
  <div>
    <h4 className='text-center font-semibold'>₹205.6</h4>
    <p className='text-sm text-gray-600'>Earned</p>
      </div> 
  </div>
    <div className='flex p-3 mt-6 bg-gray-100 justify-center gap-5 items-start'>
      <div className='text-center'>
        <i className="text-3xl mb-2 font-thin ri-time-line"></i>
        <h5 className='text-lg font-medium'>10.2Hr</h5>
        <p className='text-sm text-gray-600'>Hrs Online</p>
      </div>
      <div className='text-center'>
        <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
        <h5 className='text-lg font-medium'>10.2Hr</h5>
        <p className='text-sm text-gray-600'>Hrs Online</p>
      </div>
      <div className='text-center'>
        <i className="text-3xl mb-2 font-thin ri-edit-line"></i>
        <h5 className='text-lg font-medium'>10.2Hr</h5>
        <p className='text-sm text-gray-600'>Hrs Online</p>
      </div>
  </div>
  
    </div>
  )
}
export default CaptainDetails;