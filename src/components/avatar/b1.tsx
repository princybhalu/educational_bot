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
    let intervalId: NodeJS.Timeout | undefined;

    if (isAiThinking) {
      setIsAvatarActive(true);
      intervalId = setInterval(() => {
        setDotIndex((prevIndex) => (prevIndex + 1) % 4);

        // Generate new particles
        setDrainParticles((prevParticles) => [
          ...prevParticles,
          {
            id: prevParticles.length,
            size: Math.floor(Math.random() * 10) + 5,
            startX: Math.floor(Math.random() * 100),
            startY: Math.floor(Math.random() * 100),
            angle: Math.random() * 2 * Math.PI,
            progress: 0,
          },
        ]);
      }, 500);
    } else {
      setIsAvatarActive(false);
      setDrainParticles([]);
    }

    return () => clearInterval(intervalId);
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
      <style>
        {`
  

}`}
      </style>
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
          {/* {drainParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                left: '50%',
                top: '50%',
                transform: `translate(
                  calc(-50% + ${particle.startX + Math.cos(particle.angle) * particle.progress}px),
                  calc(-50% + ${particle.startY + Math.sin(particle.angle) * particle.progress}px)
                )`,
                opacity: 1 - particle.progress / 100,
                transition: 'transform 0.1s linear, opacity 0.1s linear',
              }}
            />
          ))} */}
        </div>
      </div>
      {/* <div className="card">
        <div className="card-body">
          <div className="chat-thread">
            {isAiThinking ? (
              <div className="message">
                <div className="avatar"></div>
                <div className="message-content">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 bg-white ${dotIndex === i ? 'opacity-100' : 'opacity-50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="message">
                <div className="avatar"></div>
                <div className="message-content">
                  <p>{feedback}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}
      <div className="message-bubble ml-4">
        {isAiThinking ? (
          <p className="h-full">
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-4 bg-white rounded-full ${dotIndex === i ? 'opacity-100' : 'opacity-50'}`}
                />
              ))}
            </div>
          </p>
        ) : (
          <p>
            {
              ' dk fjbknbelbmrlnrlIdk fjbknbelbmrlnrlIdk fjbknbelbmrlnrlIdk fjbknbelbmrlnrlI'
            }
          </p>
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
    setTimeout(() => {
      setIsAiThinking(false);
      setFeedback("This is the AI's feedback.");
    }, 3000);
  }, []);

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <AITypingAnimation isAiThinking={isAiThinking} feedback={feedback} />
    </div>
  );
};

export default App;
