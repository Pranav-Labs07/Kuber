import React, { useState, useRef, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import("remixicon/fonts/remixicon.css");
import LocationSearchPanel from "../components/LocationSearchPanel";
import axios from "axios";
import VehiclePanel from "../components/Vehiclepanel";
import Hl from "../assets/home-logo.jpg";
import Hb from "../assets/home-bg.jpg";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
// import vehiclepanel from '../components/VehiclePanel'

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
  const [suggestions, setSuggestions] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const confirmRidePanelRef = useRef(null);
  const [vehiclepanel, setVehiclepanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [fare, getFare] = useState({})
  const [confirmedRide, setConfirmedRide] = useState(null)
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (user && user._id) {
      socket.emit('join', { userType: 'user', userId: user._id })
    }
    socket.on('ride-confirmed', ride => {
      setConfirmedRide(ride)
      setVehicleFound(false)
      setWaitingForDriver(true)
    })
    return () => socket.off('ride-confirmed')
  }, [user])


  const submitHandler = (e) => {
    e.preventDefault();
  };

  // Fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:4000/maps/suggestions?q=${encodeURIComponent(query)}`,
      );
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      setSuggestions([]);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen],
  );

  useGSAP(
    function () {
      if (vehiclepanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclepanel],
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel],
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound],
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  async function findTrip() {
    setVehiclepanel(true)
    setPanelOpen(false)
    try {
      console.log('Sending to backend:', { pickup, destination });
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      getFare(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching fare:', error);
      getFare({});
    }
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5 " src={Hl} />

      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover bottom-5" src={Hb} />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative mt-45">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absoulte top-6 w-90% opacity-1 left-6  bg-white text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* <div className="line absolute h-20 w-1 top-[53%] left-10 bg-gray-700 rounded-full invisible"></div> */}

            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 mb-1.5"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
                fetchSuggestions(pickup);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField("pickup");
                fetchSuggestions(e.target.value);
              }}
              type="text"
              placeholder="Add a pick-up location"
              autoComplete="off"
            />

            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 mb-2 z-5"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                fetchSuggestions(destination);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
                fetchSuggestions(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
              autoComplete="off"
            />
          </form>
          <button
            className="bg-black text-amber-50 px-12 py-2 text-lg rounded-lg w-full"
            onClick={findTrip}
          >
            Find a Ride
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-10 mt-5">
          <LocationSearchPanel
            suggestions={suggestions}
            activeField={activeField}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclepanel}
            onSelectSuggestion={(value) => {
              if (activeField === "pickup") setPickup(value);
              if (activeField === "destination") setDestination(value);
              setPanelOpen(false);
              setSuggestions([]);
            }}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed w-screen translate-y-full bg-white bottom-0 px-3 py-10 pt-12 z-10"
        >
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            selectVehicle={setVehicleType}
            fare={fare}
            createRide={createRide}
            setVehiclePanel={setVehiclepanel}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-10 pt-12"
        >
          <ConfirmRide
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            createRide={createRide}
            fare={fare}
            VehicleType={vehicleType}

            setConfirmRidePanel={setConfirmRidePanel}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-10 pt-12"
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            createRide={createRide}
            fare={fare}
            VehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
            setVehiclePanelOpen={setVehiclepanel} />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed w-full z-10  bg-white bottom-0 px-3 py-10 pt-12"
        >
          <WaitingForDriver
            ride={confirmedRide}
            pickup={pickup}
            destination={destination}
            fare={fare?.[vehicleType]}
            waitingForDriver={waitingForDriver}
            setWaitingForDriver={setWaitingForDriver}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
