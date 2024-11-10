import React from 'react';
import { OrbitProps } from '../../types/profiling';

const Orbit: React.FC<OrbitProps> = ({
  opration,
  size = 150,
  colors = ['#4361ee', '#3498db', '#2ecc71', '#e74c3c', '#4361ee'],
}) => {
  console.log({ opration, t: opration === 'loading' });
  return (
    <div className="orbit-container" style={{ width: size, height: size }}>
      <div className={`orbit ${opration === 'loading' ? 'complete' : ''}`}>
        <div
          className={`orbit-inner`}
          style={{
            backgroundColor: opration === 'loading' ? 'transparent' : '#4361ee',
          }}
        />
      </div>
    </div>
  );
};

export default Orbit;
