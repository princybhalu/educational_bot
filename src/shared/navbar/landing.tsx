import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-white py-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Right: Menu Icon for Small Screens */}
          <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none ">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div> 
        {/* Left: Logo */}
        <div className="flex items-center">
          <div className="text-3xl font-bold mr-8 font-space-grotesk">
            <a href="#" className="text-white">Education Bot</a>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-200 hover:text-white">Features</a>
            <a href="#pricing" className="text-gray-200 hover:text-white">Pricing</a>
            <a href="#" className="text-gray-200 hover:text-white">Contact Us</a>
          </div>
        </div>

     

        {/* Right: Buttons */}
        <div className="flex justify-end items-center">
          <button className="border border-white text-white py-2 px-4 rounded-full transition duration-300 tracking-widest transform hover:scale-105 hover:bg-[#002E4D] transition-colors duration-200">Login</button>
          <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300 hidden md:flex ml-3">Sign Up</button>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <div className="md:hidden text-white py-4 px-4">
          <a href="#" className="block py-2 hover:text-gray-200">Features</a>
          <a href="#pricing" className="block py-2 hover:text-gray-200">Pricing</a>
          <a href="#" className="block py-2 hover:text-gray-200">Contact Us</a>
          <button className="text-white py-2 rounded-full hover:bg-gray-300 transition duration-300 mt-2">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
