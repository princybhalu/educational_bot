import React from 'react';
import '../../style/DropletAnimation.css';  // Assuming CSS is still external

const DropletAnimation: React.FC = () => {
    return (
        <div className="animation-container">
            <div className="circle-container">
                <div className="central-circle"></div>
                <div className="droplet"></div>
            </div>
        </div>
    );
}

export default DropletAnimation;
