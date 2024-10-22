import React from 'react';
import '../../style/DropletAnimation.css'; // Assuming CSS is still external

const DropletAnimation: React.FC = () => {
  return (
    <div className="animation-container w-full h-[150px] md:h-[200px]">
      <div className="circle-container w-full h-full">
        <div className="central-circle w-[50px] h-[50px] md:w-[120px] md:h-[120px]"></div>
        <div className="droplet w-[50px] h-[50px] md:w-[120px] md:h-[120px]"></div>
      </div>
    </div>
  );
};

export default DropletAnimation;
