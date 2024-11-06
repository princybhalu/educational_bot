import React, { useState, useEffect } from 'react';
import { FaCog, FaBrain, FaBolt } from 'react-icons/fa';

const CraftingAITeacher: React.FC = () => {
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progressPercent < 100) {
        setProgressPercent((prev) => prev + 5);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progressPercent]);

  return (
    <div className="min-h-screen bg-gray-900 w-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl  w-full p-4 items-center">
        {/* Brain Icon with Gradient */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8 animate__animated animate__bounce animate__infinite">
            {/* Base Avatar */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: '#12182a',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />

            {/* Gradient Color Layer */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
                opacity: 1,
                transform: 'scale(1)',
                transition: 'all 0.1s ease-out',
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-2xl md:text-3xl mx-auto font-semibold mb-4">
          Crafting Your AI Teacher
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-4 text-center  rounded-full mb-6">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progressPercent}%`,
              animation: 'progress-bar 1s ease-in-out',
              background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between w-full items-center flex-wrap">
          <div className="flex flex-col items-center text-gray-300 mb-4 md:mb-0">
            <FaCog className="text-blue-400 text-3xl mb-2 animate__animated animate__rotateIn animate__infinite" />
            <span>Configuring Preferences</span>
          </div>
          <div className="flex flex-col items-center text-gray-300 mb-4 md:mb-0">
            <FaBrain className="text-purple-400 text-3xl mb-2 animate__animated animate__zoomIn animate__infinite" />
            <span>Training Neural Networks</span>
          </div>
          <div className="flex flex-col items-center text-gray-300 mb-4 md:mb-0">
            <FaBolt className="text-pink-500 text-3xl mb-2 animate__animated animate__flash animate__infinite" />
            <span>Optimizing Responses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftingAITeacher;
