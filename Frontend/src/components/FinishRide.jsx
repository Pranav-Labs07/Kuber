import react from 'react';
import rd from "../assets/rdm.jpg"
import { Link } from 'react-router-dom';

const FinishRide=(props)=>{
  return(
    <div>
      <div >
      <h5 className="p-1 text-center w-[93%] absolute top-0"
      onClick={()=>{
            props.setFinishRidePanel(false)
             }}>
      <i className="text-3xl ri-arrow-drop-down-line text-gray-500"></i></h5>
        <h3 className='text-2xl font-semibold mb-5' >Finish This Ride</h3>
        <div className='flex items-center justify-between mt-4 p-4 border-4 border-yellow-300 rounded-lg'>
          <div className='flex items-center gap-3'>
            <img className='h-15 rounded-full object-cover w-15' src={rd}/>
            <h2 className='text-lg font-medium'>Akash Patil </h2>
          </div>
          <h5 className='text-lg font-semibold'>2.2Km</h5>
        </div>
      <div className='flex gap-2 justify-between flex-col items-center '>
          <div className='w-full mt-5'>
           <div className='flex items-centre gap-5 p-3 border-b-2   '>
              <i className="text-lg ri-map-2-line"></i>
            <div>
              <h3 className='text-lg  font-medium'>562/11-A</h3>
              <p className='text-sm text-gray-600 -mt-1'>Amod Vihar,Pune</p>
          </div>
            </div>
                    
            <div className='flex items-centre gap-5 p-3 border-b-2  '>
            <i className="text-lg ri-map-pin-line"></i>
            <div><h3 className='text-lg  font-medium'>562/11-A</h3>
              <p className='text-sm text-gray-600 -mt-1'>Amod Vihar,Pune</p>
              </div>
                </div>
          <div className='flex items-centre gap-5 p-3 '>
            <i className="ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className='text-lg  font-medium'>₹99</h3>
                <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
          </div>
        </div>
    
  </div>
 
  <div className='mt-6 w-full '>
    
      <Link to='/captain-home' onClick={()=>{
      
      }} className='w-full bg-green-600 flex  justify-center text-white text-lg font-semibold rounded-lg p-2'>Finish Ride</Link>
    
    
    
    </div>  
     
      </div>
        </div>
        </div>
  )
}
export default FinishRide