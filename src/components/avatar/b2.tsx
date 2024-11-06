import React, { useState, useEffect } from 'react';

interface AITypingAnimationProps {
  isAiThinking: boolean;
  feedback: string;
}

interface Particle {
  id: number;
  size: number;
  startX: number;
  startY: number;
  angle: number;
  progress: number;
}

const AITypingAnimation: React.FC<AITypingAnimationProps> = ({
  isAiThinking,
  feedback,
}) => {
  const [dotIndex, setDotIndex] = useState(0);
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [drainParticles, setDrainParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isAiThinking) {
      setIsAvatarActive(true);
    } else {
      setIsAvatarActive(false);
      setDrainParticles([]);
    }
  }, [isAiThinking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrainParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            progress: particle.progress + 5,
          }))
          .filter((particle) => particle.progress <= 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <div className="avatar-container relative w-24 h-24 mb-4 transition-all duration-300">
        <div
          className={`relative w-24 h-24 mb-4 ease-in duration-300 ${isAvatarActive ? 'avatar-active' : ''}`}
        >
          <div
            className="w-full h-full rounded-full ease-in duration-300"
            style={{
              background: 'rgb(18, 24, 38)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
            }}
          />
          <div
            className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ${
              isAvatarActive ? 'avatar-glow' : ''
            }`}
            style={{
              background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite',
              transform: 'scale(1)',
              zIndex: 1,
            }}
          />
        </div>
      </div>

      <div className="message-bubble ml-4">
        {isAiThinking ? (
          <div className="flex space-x-1 h-6 mt-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-3 w-3 bg-white rounded-full dot ${dotIndex === i ? 'active' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        ) : (
          <p>{feedback}</p>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAiThinking, setIsAiThinking] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Simulate AI thinking process
    // setTimeout(() => {
    //   setIsAiThinking(false);
    //   setFeedback("This is the AI's feedback.");
    // }, 3000);
  }, []);

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <AITypingAnimation isAiThinking={isAiThinking} feedback={feedback} />
    </div>
  );
};

export default App;
