import React from 'react';
import chat from '../../assets/landing-page/chat.png';

const AIMentorSection: React.FC = () => {
  return (
    <div className="bg-white text-center ">
      <div className="flex justify-center mb-6 mt-20 ">
        <img
          src={chat}
          alt="AI Mentor Icon"
          className="w-40 h-40 md:w-60 md:h-60"
        />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 px-4">
        Your Personal AI Mentor, Always Available
      </h2>
      <p className="text-gray-600 mb-8 text-sm md:text-base  mx-auto px-4 max-w-[1200px] mx-auto">
        Need help in the middle of the night? Your personal AI guide is there
        for you—anytime, anywhere. Whether it’s helping you with studies or
        managing your stress, your guide ensures you’re never alone in your
        academic journey.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 mb-10 rounded-md hover:bg-blue-700 transition duration-300">
        Start Your Exam Prep Now
      </button>
      <footer className="mt-12 bg-blue-900 text-white py-4 px-4">
        <p className="text-sm">
          ©2024 - All rights reserved | Powered By{' '}
          <span className="font-semibold text-blue-300">Hexalon Analytics</span>
        </p>
      </footer>
    </div>
  );
};

export default AIMentorSection;
