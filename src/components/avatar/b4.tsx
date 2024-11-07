import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  size: number;
  startX: number;
  startY: number;
  angle: number;
  progress: number;
}

interface EnhancedAITypingProps {
  isAiThinking?: boolean;
  feedback?: string;
}

const EnhancedAITyping: React.FC<EnhancedAITypingProps> = ({
  isAiThinking = true,
  feedback = 'This is a sample feedback message that will be displayed word by word.',
}) => {
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [drainParticles, setDrainParticles] = useState<Particle[]>([]);
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Handle avatar activation and particles
  useEffect(() => {
    setIsAvatarActive(isAiThinking);
    if (!isAiThinking) {
      setDrainParticles([]);
    }
  }, [isAiThinking]);

  // Generate particles
  useEffect(() => {
    if (!isAiThinking) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance to spawn a particle
        const newParticle: Particle = {
          id: Date.now(),
          size: Math.random() * 4 + 2,
          startX: (Math.random() - 0.5) * 20,
          startY: (Math.random() - 0.5) * 20,
          angle: Math.random() * Math.PI * 2,
          progress: 0,
        };
        setDrainParticles((prev) => [...prev, newParticle]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isAiThinking]);

  // Update particles
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
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Handle typing animation
  useEffect(() => {
    if (!feedback || isAiThinking) {
      setDisplayWords([]);
      setCurrentWordIndex(0);
      return;
    }

    const words = feedback.split(' ');
    const typingInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length) {
          clearInterval(typingInterval);
          return prev;
        }
        //@ts-ignore
        setDisplayWords((prev) => [...prev, words[prev]]);
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [feedback, isAiThinking]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="avatar-container relative w-24 h-24 mb-4 transition-all duration-300">
        <div
          className={`relative w-24 h-24 mb-4 ease-in duration-300 ${
            isAvatarActive ? 'avatar-active' : ''
          }`}
        >
          {/* Base Circle */}
          <div
            className="w-full h-full rounded-full ease-in duration-300"
            style={{
              background: 'rgb(18, 24, 38)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
            }}
          />

          {/* Gradient Overlay */}
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

          {/* Particles */}
          {drainParticles.map((particle) => (
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
          ))}
        </div>
      </div>

      {/* Feedback Display */}
      {!isAiThinking && displayWords.length > 0 && (
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
          </p>
        </div>
      )}
    </div>
  );
};

// Demo Component
const Demo: React.FC = () => {
  const [isThinking, setIsThinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThinking(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <EnhancedAITyping
        isAiThinking={isThinking}
        feedback="Welcome! I'm an AI assistant ready to help you with any questions or tasks you might have. Let's work together to find the best solutions for your needs."
      />
    </div>
  );
};

export default Demo;
