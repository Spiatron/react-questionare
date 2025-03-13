import React from 'react';

const ScoreComponent = ({ currentScore, lowestPossibleScore, maximumPossibleScore }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between text-gray-700 font-semibold mb-2">
        <div>Score: {currentScore.toFixed(2)}%</div>
        <div>Max Score: {maximumPossibleScore.toFixed(2)}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 relative">
        {/* Maximum Possible Score (Light Gray) */}
        <div
          className="absolute h-4 rounded-full"
          style={{
            width: `${maximumPossibleScore}%`,
            backgroundColor: '#adb5bd',
          }}
        ></div>
        {/* Lowest Possible Score (Gray) */}
        <div
          className="absolute h-4 rounded-full"
          style={{
            width: `${lowestPossibleScore}%`,
            backgroundColor: '#A9A9A9',
          }}
        ></div>
        {/* Current Score (Black) */}
        <div
          className="absolute h-4 rounded-full"
          style={{
            width: `${currentScore}%`,
            backgroundColor: '#000000',
          }}
        ></div>
      </div>
      <div className="text-gray-500 text-sm mt-2">
        Lowest Possible Score: {lowestPossibleScore.toFixed(2)}%
      </div>
    </div>
  );
};

export default ScoreComponent;