import React from "react";
const LocationSearchPanel = ({ suggestions = [], onSelectSuggestion, setPanelOpen }) => {
  return (
    <div>
      {suggestions.length === 0 && (
        <div className="text-gray-400 text-center py-4">No suggestions</div>
      )}
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            onSelectSuggestion(elem);
            setPanelOpen(true);
          }}
          className={`flex gap-4 border-2 p-3 rounded-xl items-center my-2 justify-start cursor-pointer border-gray-300 hover:border-black hover:bg-gray-100`}
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
