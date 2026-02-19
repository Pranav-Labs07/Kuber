import React,{useState, useRef, useEffect , useContext   } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import Log from "../assets/home-bg.jpg"
import CaptainDetails from "../components/CaptainDetails"
import ConfirmRidePopUp from "../components/ConfirmRidePopUp"
// import CaR from "../assets/uber-go.jpg"
import Hl from '../assets/home-logo.jpg';
import RidePopUp from "../components/RidePopUp";
import {SocketContext} from "../context/SocketContext"
import {CaptainDataContext} from "../context/CaptainContext"

const CaptainHome=()=>{
const [ridePopUpPanel,setRidePopUpPanel]=useState(false) 
const [ConfirmRidePopupPanel,setConfirmRidePopupPanel]=useState(false) 
const ridePopupPanelRef=useRef(null)
const confirmRidePopupPanelRef=useRef(null)
const [ride,setRide]=useState(null);
const [confirmride,setConfirmride]=useState(null);

const {socket} =useContext(SocketContext)
const {captain} =useContext(CaptainDataContext)

useEffect(() => {
  if (socket && captain?._id) {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log({userId:captain._id,
          location:{
        lat: position.coords.latitude,
        lng: position.coords.longitude
        }
      })
        socket.emit('update-location-captain', {
        userId: captain._id,
        location:{
        lat: position.coords.latitude,
        lng: position.coords.longitude
        }
        });
      });
      }
    }, 10000);

    return () => clearInterval(intervalId);
    }
}, [socket, captain?._id]);
useEffect(() => {
  if (!socket) return;
  const handleNewRide = (data) => {
    setRide(data);
    setRidePopUpPanel(true);
    setConfirmRidePopupPanel(false);
  };
  socket.on('new-ride', handleNewRide);
  return () => socket.off('new-ride', handleNewRide);
}, [socket]);

 useGSAP(function () {
   if (ridePopUpPanel) {
    gsap.to(ridePopupPanelRef.current, {
    transform: 'translateY(0)'
        })
      } else {
          gsap.to(ridePopupPanelRef.current, {
          transform: 'translateY(100%)'
        })
      }
  }, [ ridePopUpPanel ])

useGSAP (function () {
if (ConfirmRidePopupPanel) {
gsap.to (confirmRidePopupPanelRef.current, {
transform: 'translateY(0)'
})
} else {
gsap.to(confirmRidePopupPanelRef.current, {
transform: 'translateY(100%)'
})
}
}, [ConfirmRidePopupPanel])


  
return(
<div className='h-screen'>  
<div className='fixed p-6 top-0 flez items-center justify-between w-screen '>
   <img className='w-16 ' src={Hl}/>
  <Link to='/home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full'>
<i className="ri-logout-box-r-line"></i>
</Link> 
  </div> 
<div className='h-3/5'>
<img className='h-full w-full object-cover' src={Log} />
</div>

<div className='h-2/5 p-6'>
<CaptainDetails/>
 </div>

  <div ref={ridePopupPanelRef}   className='fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full'>
          <RidePopUp 
          ride={ride}
          setRidePopupPanel={setRidePopUpPanel}
          setConfirmRidePopPanel={setConfirmRidePopupPanel} 
          confirmride={confirmride}
          /></div>

  <div ref={confirmRidePopupPanelRef}   className='fixed w-full h-screen  z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full'>
          <ConfirmRidePopUp setConfirmRidePopPanel={setConfirmRidePopupPanel}
          setRidePopPanel={setRidePopUpPanel}/>
        </div>
</div>
  

  )
}

export default CaptainHome;