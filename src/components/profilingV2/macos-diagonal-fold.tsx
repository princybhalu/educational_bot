import React, { useState } from 'react';

const MacWindow = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 overflow-hidden">
      {/* Dock */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/30 backdrop-blur-lg flex items-center justify-center">
        <div id="dock-icon" className="w-12 h-12 rounded-lg bg-gray-200"></div>
      </div>

      {/* Window Wrapper for perspective */}
      <div className="perspective-container" style={{ perspective: '1000px' }}>
        {/* Window */}
        <div
          className={`
            bg-white rounded-lg shadow-xl overflow-hidden
            ${isMinimized ? 'minimize-diagonal' : ''}
          `}
          style={{
            width: '500px',
            height: '300px',
            transformStyle: 'preserve-3d',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Window Header */}
          <div className="bg-gray-200 p-3 flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
            ></button>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
          </div>

          {/* Window Content */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">MacOS Window</h2>
            <p className="text-gray-600 mb-4">
              Click yellow button to minimize
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg">
                  Content {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-container {
          perspective-origin: bottom right;
        }

        @keyframes minimize-diagonal {
          0% {
            transform: scale(1) rotate3d(0, 0, 0, 0deg);
            opacity: 1;
          }
          30% {
            transform: scale(0.8) rotate3d(-1, 1, 0, 15deg) translateY(10vh);
            opacity: 0.9;
          }
          60% {
            transform: scale(0.4) rotate3d(-1, 1, 0, 30deg) translateY(20vh);
            opacity: 0.7;
          }
          100% {
            transform: scale(0) rotate3d(-1, 1, 0, 45deg) translateY(40vh);
            opacity: 0;
          }
        }

        .minimize-diagonal {
          animation: minimize-diagonal 0.6s cubic-bezier(0.2, 0, 0, 1) forwards;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default MacWindow;
