import React from "react";
import {Route,Routes} from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
// import LocationSearchPanel from '../src/components/LocationSearchPanel';
import Riding from '../src/pages/Riding';
import CaptainRiding from '../src/pages/CaptainRiding';
// import React,{useState, useRef } from 'react';
// import { useGSAP } from '@gsap/react';
import CaptainDetails from "./components/CaptainDetails"
import ('remixicon/fonts/remixicon.css');



const App=() =>{
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Routes>
    <Route path='/' element={<Start/> }/>
    <Route path='/login' element={<UserLogin/>}/>
    <Route path='/signup' element={<UserSignup/>}/>
    <Route path='/Riding' element={<Riding/>}/>
    <Route path='/captain-riding' element={<CaptainRiding/>}/>
    <Route path='/captain-login' element={<CaptainLogin/> }/>
    <Route path='/captain-signup' element={<CaptainSignup/> }/>
    <Route path='/home' element={<UserProtectWrapper> <Home/> </UserProtectWrapper> }/>

    <Route path='/user/logout' element={<UserProtectWrapper>
      <UserLogout/>

    </UserProtectWrapper>
    }/>

    <Route path='/captain-home' element={
      <CaptainProtectWrapper>
      <CaptainHome />
      </CaptainProtectWrapper>}
      />


  </Routes>
    </LoadScript>
  );
};

export default App;
