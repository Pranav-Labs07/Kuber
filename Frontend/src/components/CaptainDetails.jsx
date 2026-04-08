import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      {/* Captain name + status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold uppercase">
            {captain?.fullname?.firstname?.[0] || "C"}
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize">
              {captain?.fullname?.firstname} {captain?.fullname?.lastname}
            </h2>
            <p className="text-sm text-gray-500 capitalize">
              {captain?.vehicle?.vehicleType} · {captain?.vehicle?.plate}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold">₹0.00</h4>
          <p className="text-xs text-gray-500">Today's earnings</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-between bg-gray-100 rounded-xl p-4">
        <div className="text-center">
          <i className="ri-time-line text-2xl mb-1 block"></i>
          <h5 className="text-lg font-semibold">
            0<span className="text-sm font-normal"> hrs</span>
          </h5>
          <p className="text-xs text-gray-500">Hours online</p>
        </div>
        <div className="text-center border-x border-gray-300 px-6">
          <i className="ri-speed-up-line text-2xl mb-1 block"></i>
          <h5 className="text-lg font-semibold">
            0<span className="text-sm font-normal"> km</span>
          </h5>
          <p className="text-xs text-gray-500">Distance</p>
        </div>
        <div className="text-center">
          <i className="ri-booklet-line text-2xl mb-1 block"></i>
          <h5 className="text-lg font-semibold">0</h5>
          <p className="text-xs text-gray-500">Rides</p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
        <p className="text-sm text-gray-600">
          You are online — waiting for ride requests
        </p>
      </div>
    </div>
  );
};

export default CaptainDetails;
