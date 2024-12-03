import React from 'react';
import { FiArrowRight } from 'react-icons/fi'; // Import arrow icon

const Approach: React.FC = () => {
  return (
    <div className="bg-black text-white py-20 px-4 flex flex-col items-center justify-center space-y-6">
      <h2 className="text-sm uppercase tracking-wide">
        Get a blend of unconventional ideas, skills, and out-of-box
      </h2>
      <h1 className="text-4xl font-bold">Mobile developmental approach.</h1>

      <div className="relative flex items-center justify-center">
        {/* Circular Border with Arrow Icon in the center */}
        <a
          href="#"
          className="w-24 h-24 rounded-full border border-white flex items-center justify-center relative z-10"
        >
          <FiArrowRight className="text-white text-3xl" />
        </a>

        {/* Circular Text around the border */}
        <div className="circle-text w-48 h-48 flex items-center justify-center">
          <p className="circle">
            SCHEDULE A CALL • SCHEDULE A CALL • SCHEDULE A CALL •
          </p>
        </div>
      </div>
    </div>
  );
};

export default Approach;
