// SparkleButton.tsx
import React, { useState, useEffect } from 'react';

interface SparkleProps {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
}

interface SparkleButtonProps {
  onNavigate?: () => void;
  buttonText?: string;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({
  onNavigate = () => console.log('Navigation placeholder'),
  buttonText = 'Finalize Your AI Teacher',
}) => {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  useEffect(() => {
    const createSparkle = (): SparkleProps => {
      return {
        id: Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 1 + 0.5,
      };
    };

    // Create initial sparkles
    const initialSparkles: SparkleProps[] = Array.from(
      { length: 30 },
      createSparkle
    );
    setSparkles(initialSparkles);

    // Regenerate sparkles periodically
    const interval = setInterval(() => {
      setSparkles((prev) => [...prev.slice(1), createSparkle()]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky bottom-4 mt-8 text-center z-20 relative overflow-hidden">
      {/* Background sparkles container */}
      <div className="absolute inset-0 -z-10">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute rounded-full bg-white opacity-0 animate-sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animationDuration: `${sparkle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Button with gradient background */}
      <button
        onClick={onNavigate}
        className="px-8 py-4 relative rounded-lg font-semibold max-w-md w-full
                 bg-gradient-to-r from-[#4cc9f0] to-[#4361ee]
                 text-white
                 transform hover:scale-105
                 transition-all duration-300
                 shadow-lg hover:shadow-xl hover:shadow-[#4361ee]/20"
        type="button"
      >
        <span className="relative z-10">{buttonText}</span>

        {/* Subtle button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4cc9f0]/20 to-[#4361ee]/20 rounded-lg blur-md -z-10" />
      </button>
    </div>
  );
};

export default SparkleButton;
