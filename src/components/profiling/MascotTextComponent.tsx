import React from 'react';
import Mascot from '../../assets/image/Mascot.png';
import DropletAnimation from '../avatar';

interface MascotTextComponentProps {
  text: string;
  direction: 'left' | 'right';
}

const MascotTextComponent: React.FC<MascotTextComponentProps> = ({
  text,
  direction,
}) => {
  const isTextRight = direction === 'right';

  return (
    <div
      className={`w-full max-w-[1200px] mx-auto flex ${isTextRight ? 'flex-row' : 'flex-row-reverse'} items-end gap-4 p-4`}
    >
      {/* <img
        src={Mascot}
        alt="mascot"
        loading="lazy"
        className="w-1/4 max-w-[200px] object-contain"
      /> */}
      <DropletAnimation />
      <p
        className={`bg-[#FFEBDE] w-full max-h-max px-6 py-3.5 md:px-10 md:py-6 rounded-t-[40px] ${direction === 'right' ? 'rounded-br-[40px]' : 'rounded-bl-[40px]'} text-xs sm:text-base md:text-xl`}
      >
        {text}
      </p>
    </div>
  );
};

export default MascotTextComponent;
