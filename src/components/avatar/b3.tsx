import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

const AITypingAnimation: React.FC<{
  isAiThinking: boolean;
  feedback: string;
  avatarSize: string;
}> = ({ isAiThinking = true, feedback = '', avatarSize = 'md' }) => {
  const [dotIndex, setDotIndex] = useState(0);

  // Handle dot animation
  useEffect(() => {
    if (!isAiThinking) return;

    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, [isAiThinking]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className="flex items-center gap-6">
      {/* Avatar Container */}
      <div className={`relative w-24 h-24 `}>
        {/* Base Circle */}
        <div className="absolute inset-0 rounded-full bg-gray-900 shadow-lg" />

        {/* Animated Gradient Circle */}
        <div
          className={`absolute inset-0 rounded-full 
            bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800
            transition-all duration-300 ease-in-out
            ${isAiThinking ? 'animate-pulse opacity-80' : 'opacity-0'}
          `}
        />

        {/* Inner Circle with Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Circle
            className={`w-1/2 h-1/2 transition-all duration-300
              ${isAiThinking ? 'text-blue-400 animate-spin' : 'text-gray-600'}
            `}
            aria-label="Thinking animation"
          />
        </div>
      </div>

      {/* Message Bubble */}
      <div className="relative bg-gray-800 rounded-2xl p-4 min-w-48">
        {isAiThinking ? (
          <div className="flex gap-2 h-6 items-center px-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  w-3 h-3 rounded-full
                  transition-all duration-300
                  ${dotIndex === i ? 'bg-blue-400 scale-125' : 'bg-gray-600 scale-100'}
                `}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-200 leading-relaxed">{feedback}</div>
        )}

        {/* Bubble Tail */}
        <div className="absolute -left-2 top-1/2 -mt-2 w-4 h-4 bg-gray-800 transform rotate-45" />
      </div>
    </div>
  );
};

// Demo Component
const Demo = () => {
  const [isThinking, setIsThinking] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Demo: Toggle thinking state every 3 seconds
    const interval = setInterval(() => {
      setIsThinking((prev) => {
        if (prev) {
          setFeedback('Hello! How can I help you today?');
          return false;
        } else {
          setFeedback('');
          return true;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <AITypingAnimation
        isAiThinking={isThinking}
        feedback={feedback}
        avatarSize="md"
      />
    </div>
  );
};

export default Demo;
