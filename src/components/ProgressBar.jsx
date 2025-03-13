import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-md font-semibold text-gray-700">
        {progress.toFixed(0)}%
      </div>
    </div>
  );
};

export default ProgressBar;