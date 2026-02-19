import react from 'react';
import { Link } from 'react-router-dom';
import Log from "../assets/home-bg.jpg"
import Hl from '../assets/home-logo.jpg';
import ('remixicon/fonts/remixicon.css');
import React,{useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FinishRide from "../components/FinishRide"



const CaptainRiding=()=>{
const [finishRidePanel, setFinishRidePanel] =useState(false);
const finishRidePanelRef=useRef(null); 

useGSAP(function () {
   if (finishRidePanel) {
    gsap.to(finishRidePanelRef.current, {
    transform: 'translateY(0)'
        })
      } else {
          gsap.to(finishRidePanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
  }, [ finishRidePanel ])


return(
    
<div className='h-screen relative'>    
<div className='fixed p-6 top-0 flez items-center justify-between w-screen '>
<img className='w-16 ' src={Hl}/>
<Link to='/captain-home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full'>
<i className="ri-logout-box-r-line"></i>
</Link> 
</div> 

<div className='h-4/5'>
<img className='h-full w-full object-cover' src={Log} />
</div>
<div className='h-1/5 p-6 flex items-center relative justify-between bg-yellow-400' onClick={()=>{
  setFinishRidePanel(true)
}}>

<h5 className="p-1 text-center w-[]95%] absolute top-0 flex justify-between items-center"
onClick={()=>{}}>
<i className="text-3xl ri-arrow-drop-down-line 
 text-gray-800"></i></h5>
<h4 className='text-xl font-semibold'>4KM away</h4>
<button className=' bg-green-600 text-white font-semibold  rounded-lg p-3 px-10'>Complete Ride</button>
</div>

 <div ref={finishRidePanelRef}   className='fixed w-full h-screen  z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full'>
<FinishRide setFinishRidePanel={setFinishRidePanel} />
        </div>

</div>

  )
}
export default CaptainRiding;