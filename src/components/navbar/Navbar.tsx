import React from 'react';
import MenuIcon from '../../assets/icons/MenuIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import logo from '../../assets/image/logo.png';

interface NavbarProps {
  IsIsMobileMenuOpenFun: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  IsIsMobileMenuOpenFun,
  isMobileMenuOpen,
}) => {
  const user1 = useSelector((state: RootState) => state.auth.user);
  const user = { ...user1 };

  return (
    <nav className="bg-[#CEE6FF] text-black p-2">
      <div className="flex justify-between items-center">
        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button
            className="h-6 w-6 cursor-pointer"
            onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
          >
            <MenuIcon />
          </button>
        </div>
        {/* Central title */}
        <div className="text-center flex-grow w-full flex items-center justify-center">
          {/* <h2 className="text-xl font-semibold text-white my-auto">
            Education AI
          </h2> */}
          <img src={logo} alt="Brand logo" loading="lazy" className="w-16" />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
