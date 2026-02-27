import react from "react";
import { Link } from "react-router-dom";
import Log from "../assets/home-bg.jpg";
import CaR from "../assets/uber-go.jpg";
const Riding = () => {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img className="h-full w-full object-cover" src={Log} />

        {/* <div className='h-1/2 p-4'>
<div className='flex justify-between items-center '>
  <img className='h-30' src={CaR} ></img>
    <div className='text-right'>
      <h2 className='text-lg font-medium'>Sarthak</h2>
      <h4 className='text-xl font-semibold -mt-1 -mb-1'> MP04 AB 1234 </h4>
      <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
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
           <div>
            <h3 className='text-lg  font-medium'>562/11-A</h3>
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
         
         </div>
         </div>

       </div>
       */}
        <div className="flex items-center justify-between">
          <img className="h-25 " src={CaR} />
          <div className="text-right">
            <h2 className="text-lg font-medium">Sarthak</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {" "}
              MH04 AB 1234{" "}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center ">
          <div className="w-full mt-5">
            <div className="flex items-centre gap-5 p-3 border-b-2  ">
              <i className="text-lg ri-map-pin-line"></i>
              <div>
                <h3 className="text-lg  font-medium">562/11-A</h3>
                <p className="text-sm text-gray-600 -mt-1">Amod Vihar,Pune</p>
              </div>
            </div>

            <div className="flex items-centre gap-5 p-3 ">
              <i className="ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg  font-medium">₹99</h3>
                <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            // props.setVehicleFound(true)
            // props.setConfirmRidePanel(false)
          }}
          className="w-full bg-green-600 text-white font-semibold  rounded-lg p-2"
        >
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
