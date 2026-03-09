import React from "react";
import rd from "../assets/rdm.jpg";

const RidePopUp = (props) => {
  return (
    <div>
      {/* Drag handle / close */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => props.setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      {/* Rider info */}
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={rd}
            alt="rider"
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname}{" "}
            {props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      {/* Ride details */}
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill text-lg"></i>
          <div>
            <h3 className="text-base font-medium">Pickup</h3>
            <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-2-fill text-lg"></i>
          <div>
            <h3 className="text-base font-medium">Destination</h3>
            <p className="text-sm text-gray-600">{props.ride?.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line text-lg"></i>
          <div>
            <h3 className="text-base font-medium">₹{props.ride?.fare}</h3>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 w-full flex flex-col gap-2">
        <button
          onClick={() => {
            // Accept: confirm ride with backend, open ConfirmRidePopUp, close this panel
            props.confirmRide();
          }}
          className="bg-green-600 w-full text-white font-semibold p-3 rounded-lg text-lg"
        >
          Accept
        </button>
        <button
          onClick={() => {
            // Ignore: just close this panel, do NOT open ConfirmRidePopUp
            props.setRidePopupPanel(false);
          }}
          className="w-full bg-gray-200 text-gray-700 font-semibold p-3 rounded-lg text-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
