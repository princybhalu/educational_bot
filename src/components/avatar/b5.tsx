import React, { useState, useEffect } from 'react';

const EnhancedAITyping: React.FC = () => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAiThinking, setIsAiThinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAiThinking(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 p-8">
      {/* Avatar Container */}
      <div className="relative w-24 h-24 mb-4 transition-all duration-300">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-16 h-8 bg-white rounded-full flex items-center justify-center shadow-lg relative">
            {/* Typing dots animation */}
            <div className="flex space-x-1">
              <span
                className="dot w-2 h-2 bg-black rounded-full animate-bounce"
                style={{ animationDelay: '0s' }}
              ></span>
              <span
                className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></span>
              <span
                className="dot w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                style={{ animationDelay: '0.4s' }}
              ></span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Display */}
      {!isAiThinking && (
        <div className="w-full max-w-3xl bg-[#12182a] rounded-lg p-4 mb-8 shadow-lg border border-[#1d2235]">
          <p className="text-md md:text-lg text-white leading-relaxed">
            {displayWords.map((word, index) => (
              <span
                key={index}
                className={`word inline-block mx-1 transition-all duration-200 ease-out ${
                  index === currentWordIndex ? 'text-[#3b82f6]' : 'text-white'
                }`}
              >
                {word}
              </span>
            ))}
            {currentWord && (
              <span className="current-word word inline-block mx-1 text-[#3b82f6]">
                {currentWord} <span className="animate-pulse">|</span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedAITyping;
