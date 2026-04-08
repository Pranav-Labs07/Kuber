import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracing";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  const location = useLocation();
  const ride = location.state?.ride;

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(finishRidePanelRef.current, { transform: "translateY(100%)" });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen z-10">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="ri-home-5-line text-lg"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <LiveTracking />
      </div>

      <div
        className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 cursor-pointer"
        onClick={() => setFinishRidePanel(true)}
      >
        <div>
          <h4 className="text-xl font-semibold">4 KM away</h4>
          <p className="text-sm text-gray-700">{ride?.destination}</p>
        </div>
        <button className="bg-green-600 text-white font-semibold rounded-lg p-3 px-8">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full"
      >
        <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
