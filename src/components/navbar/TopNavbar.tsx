import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import logo from '../../assets/image/logo.png';

// eslint-disable-next-line react/prop-types
const NavItem = ({ to, children }: { to: any; children: any }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-base ${
        isActive ? 'text-logoColor font-semibold' : 'text-gray-600'
      } hover:text-logoColor transition-colors duration-200`
    }
  >
    {children}
  </NavLink>
);

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="w-full h-full border-b text-base bg-white">
      <nav className="w-full max-w-[1280px] mx-auto py-4 px-4 md:px-2">
        <div className="flex justify-between items-center">
          {/* <h1 className="text-2xl md:text-4xl text-logoColor font-bold">
            Logo here
          </h1> */}
          <img src={logo} alt="Brand logo" loading="lazy" className="w-16" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <NavItem key={item.name} to={item.path}>
                {item.name}
              </NavItem>
            ))}
          </div>

          <div className="hidden md:flex gap-5 items-center">
            <NavLink
              to="/login"
              className="text-logoColor hover:text-logoColor/80 transition-colors duration-200"
            >
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className="text-white bg-richblue-900 px-5 py-2 rounded-lg hover:bg-richblue-800 transition-colors duration-200"
            >
              Get Started
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <IoMdClose size={24} /> : <CiMenuFries size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <NavItem key={item.name} to={item.path}>
                {item.name}
              </NavItem>
            ))}
            <NavLink
              to="/login"
              className="text-logoColor hover:text-logoColor/80 transition-colors duration-200"
            >
              Log in
            </NavLink>
            <NavLink
              to="/get-started"
              className="text-white bg-richblue-900 px-5 py-2 rounded-lg hover:bg-richblue-800 transition-colors duration-200 text-center"
            >
              Get Started
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default TopNavbar;
