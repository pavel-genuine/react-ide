import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div style={{display:'flex', color:'white',marginLeft:'20px'}} className="metrics-container bg-slate-800 text-white mt-4 flex flex-col space-y-3 text-slate-400 p-2">
      
      <p style={{marginRight:'20px',backgroundColor:'#1e293b'}} className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p style={{marginRight:'20px',backgroundColor:'#1e293b'}}  className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
