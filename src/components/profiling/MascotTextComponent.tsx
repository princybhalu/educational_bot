// import React from 'react';
// import Mascot from '../../assets/image/Mascot.png';
// import DropletAnimation from '../avatar';

// interface MascotTextComponentProps {
//   text: string;
//   direction: 'left' | 'right';
// }

// const MascotTextComponent: React.FC<MascotTextComponentProps> = ({
//   text,
//   direction,
// }) => {
//   const isTextRight = direction === 'right';

//   return (
//     <div
//       className={`w-full max-w-[1200px] mx-auto flex ${isTextRight ? 'flex-row' : 'flex-row-reverse'} items-end gap-4 p-4`}
//     >
//       {/* <img
//         src={Mascot}
//         alt="mascot"
//         loading="lazy"
//         className="w-1/4 max-w-[200px] object-contain"
//       /> */}
//       <DropletAnimation />
//       <p
//         className={`bg-[#FFEBDE] w-full max-h-max px-6 py-3.5 md:px-10 md:py-6 rounded-t-[40px] ${direction === 'right' ? 'rounded-br-[40px]' : 'rounded-bl-[40px]'} text-xs sm:text-base md:text-xl`}
//       >
//         {text}
//       </p>
//     </div>
//   );
// };

// export default MascotTextComponent;

import React, { useState, useEffect } from 'react';
import DropletAnimation from '../avatar';

interface MascotTextComponentProps {
  text: string;
  direction: 'left' | 'right';
  typingSpeed?: number;
}

const MascotTextComponent: React.FC<MascotTextComponentProps> = ({
  text,
  direction,
  typingSpeed = 50, // Default typing speed (ms per character)
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const isTextRight = direction === 'right';

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText(''); // Reset text when new text prop is received

    let currentIndex = 0;
    const textLength = text.length;

    const typingInterval = setInterval(() => {
      if (currentIndex < textLength) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed]);

  return (
    <div
      className={`w-full max-w-[1200px] mx-auto flex ${
        isTextRight ? 'flex-row' : 'flex-row-reverse'
      } items-end gap-4 p-4`}
    >
      <div className={`${isTyping ? 'animate-bounce' : ''}`}>
        <DropletAnimation />
      </div>
      <div
        className={`bg-[#FFEBDE] w-full max-h-max px-6 py-3.5 md:px-10 md:py-6 rounded-t-[40px] ${
          direction === 'right' ? 'rounded-br-[40px]' : 'rounded-bl-[40px]'
        }`}
      >
        <p className="text-xs sm:text-base md:text-xl relative">
          {displayedText}
          <span
            className={`${
              isTyping ? 'opacity-100' : 'opacity-0'
            } inline-block ml-1 animate-blink`}
          >
            |
          </span>
        </p>
      </div>
    </div>
  );
};

// Add required CSS for the blinking cursor animation
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .animate-blink {
    animation: blink 1s step-end infinite;
  }
`;
document.head.appendChild(style);

export default MascotTextComponent;