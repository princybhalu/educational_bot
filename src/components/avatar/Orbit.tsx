import React, { useEffect, useState } from 'react';
import { OrbitProps } from '../../types/profiling';
import '../../style/orbit.css';

const Orbit: React.FC<OrbitProps> = ({
  opration,
  size = 150,
  colors = ['#4361ee', '#3498db', '#2ecc71', '#e74c3c', '#4361ee'],
}) => {
  const [dotIndex, setDotIndex] = useState(0);

  // Handle dot animation
  useEffect(() => {
    if (opration === 'loading1') return;

    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, [opration]);

  return (
    <div className="orbit-container" style={{ width: size, height: size }}>
      <div className={`orbit ${opration === 'loading' ? 'complete' : ''}`}>
        {opration === 'loading1' ? (
          <>
            {' '}
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
          </>
        ) : (
          <div
            className={`orbit-inner`}
            style={{
              backgroundColor: opration === 'loading' ? '#212121' : '#4361ee',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Orbit;
