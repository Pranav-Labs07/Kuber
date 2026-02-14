import React, { useState } from "react";

const LocationSearchPanel = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = [
    "72c, Near Kapoor's cafe, Sheryians Coding School, pune",
    "44a, Near Kapoor's cafe, Sheryians Coding School, pune",
    "24a, Near Kapoor's cafe, Sheryians Coding School, pune",
    "24c, Near Kapoor's cafe, Sheryians Coding School, pune",
    "18c, Near Kapoor's cafe, Sheryians Coding School, pune"
  ];

  return (
    <div>
      {location.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            setSelectedLocation(elem);
            props.setVehiclePanelOpen?.(true);
          }}
          className={`flex gap-4 border-2 p-3 rounded-xl items-center my-2 justify-start cursor-pointer
            ${
              selectedLocation === elem9
                ? "border-black bg-gray-100"
                : "border-gray-300"
            }
          `}
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
