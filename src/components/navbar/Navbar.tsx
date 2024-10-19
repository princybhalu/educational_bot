import React from 'react';
import MenuIcon from '../../assets/icons/MenuIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
    <nav className="bg-[#003366] text-white p-2">
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
        <div className="text-center flex-grow">
          <h2 className="text-xl font-semibold text-white my-auto">
            Education AI
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
