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

  const handleButtonClick = () => {
    console.log('Navigating to website...');
    // Replace with actual navigation code if needed
  };

  return (
    <div className="min-h-screen bg-gray-900 w-full flex flex-col items-center justify-center p-4 md:p-8">
      <style>
        {`
        @keyframes rotateCog {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulseBrain {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes flashBolt {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes sparkle {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .rotate-cog {
          animation: rotateCog 5s linear infinite;
        }

        .pulse-brain {
          animation: pulseBrain 2s ease-in-out infinite;
        }

        .flash-bolt {
          animation: flashBolt 1s ease-in-out infinite;
        }

        .sparkle {
          animation: sparkle 1s ease-in-out forwards;
        }

        @keyframes sparkleText {
          0% { text-shadow: 0 0 30px #60a5fa; }
          50% { text-shadow: 0 0 50px #60a5fa; }
          100% { text-shadow: 0 0 30px #60a5fa; }
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glitter {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .sparkle-point {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          animation: glitter 1s ease-in-out infinite;
        }

        .title-container {
          position: relative;
          display: inline-block;
          animation: floating 3s ease-in-out infinite;
        }

        .glowing-text {
          background: linear-gradient(45deg, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 30px #60a5fa;
          animation: sparkleText 1.5s ease-in-out infinite;
          font-weight: 800;
          letter-spacing: 1px;
          -webkit-text-stroke: 2px #2563eb;
        }
      `}
      </style>

      <div className="max-w-4xl w-full p-4 items-center">
        {/* Brain Icon with Gradient */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: '#12182a',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />

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

        {/* Title with Sparkle Effect */}
        <div className="title-container text-center mb-8">
          <div
            className="sparkle-point"
            style={{ top: '-20px', left: '10%' }}
          />
          <div
            className="sparkle-point"
            style={{ top: '-10px', right: '20%' }}
          />
          <div
            className="sparkle-point"
            style={{ bottom: '-15px', left: '30%' }}
          />
          <div
            className="sparkle-point"
            style={{ top: '-5px', right: '40%' }}
          />
          <div
            className="sparkle-point"
            style={{ bottom: '-10px', right: '15%' }}
          />
          <h2 className="glowing-text text-4xl md:text-5xl">
            Crafting Your AI Teacher
          </h2>
        </div>

        {/* Progress Bar with Sparkle Effect */}
        <div className="w-full bg-gray-700 h-4 text-center rounded-full mb-6">
          <div
            className="h-full rounded-full sparkle"
            style={{
              width: `${progressPercent}%`,
              animation: 'progress-bar 1s ease-in-out',
              background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between w-full items-center mb-4">
          <div className="flex flex-row md:flex-col items-center text-gray-300 mb-4 md:mb-0">
            <FaCog className="text-blue-400 text-3xl mb-2 rotate-cog mr-2 md:mr-0" />
            <span>Configuring Preferences</span>
          </div>
          <div className="flex flex-row md:flex-col items-center text-gray-300 mb-4 md:mb-0">
            <FaBrain className="text-purple-400 text-3xl mb-2 pulse-brain mr-2 md:mr-0" />
            <span>Training Neural Networks</span>
          </div>
          <div className="flex flex-row md:flex-col items-center text-gray-300 mb-4 md:mb-0">
            <FaBolt className="text-pink-500 text-3xl mb-2 flash-bolt mr-2 md:mr-0" />
            <span>Optimizing Responses</span>
          </div>
        </div>

        {/* Button to visit website - only appears when progress is 100% */}
        {progressPercent === 100 && (
          <button
            onClick={handleButtonClick}
            className="mt-8 bg-blue-500 item-center hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Let&rsquo;s Visit Website
          </button>
        )}
      </div>
    </div>
  );
};

export default CraftingAITeacher;
