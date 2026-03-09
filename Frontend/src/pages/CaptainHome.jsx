import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracing";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // Join socket room and start sending location when captain loads
 useEffect(() => {
  if (!captain?._id) return;

  socket.on("connect", () => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
  });

  return () => {
    socket.off("connect");
  };
}, [captain, socket]);

  // Listen for new ride from user — slides up RidePopUp
  useEffect(() => {
    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off("new-ride");
    };
  }, [socket]);

  // Captain accepts ride → call backend confirm + notify user via socket
  async function confirmRide() {
    try {
      await axios.post(
        `/rides/confirm`,
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        },
      );
      // Backend sends 'ride-confirmed' to user via socket (see ride.controller.js)
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (err) {
      console.error("Confirm ride error:", err);
    }
  }

  // GSAP: RidePopUp slides up from bottom
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
        duration: 0.4,
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.4,
      });
    }
  }, [ridePopupPanel]);

  // GSAP: ConfirmRidePopUp slides up from bottom
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
        duration: 0.4,
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.4,
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Top bar */}
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen z-10">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map - top 60% */}
      <div className="h-3/5">
        <LiveTracking />
      </div>

      {/* Captain details - bottom 40% — always visible as default UI */}
      <div className="h-2/5 p-6 bg-white">
        <CaptainDetails />
      </div>

      {/* RidePopUp — hidden below screen, slides up when new ride arrives */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-2xl shadow-lg"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* ConfirmRidePopUp — hidden below screen, slides up only after Accept */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-2xl shadow-lg"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
