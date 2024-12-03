// import React from 'react';
// import MenuIcon from '../../assets/icons/MenuIcon';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import logo from '../../assets/image/logo.png';

// interface NavbarProps {
//   IsIsMobileMenuOpenFun: (isOpen: boolean) => void;
//   isMobileMenuOpen: boolean;
// }

// const Navbar: React.FC<NavbarProps> = ({
//   IsIsMobileMenuOpenFun,
//   isMobileMenuOpen,
// }) => {
//   const user1 = useSelector((state: RootState) => state.auth.user);
//   const user = { ...user1 };

//   return (
//     <nav className="bg-[#CEE6FF] bg-gradient-to-br from-gray-900 to-slate-800 text-white p-2">
//       <div className="flex justify-between items-center">
//         {/* Mobile menu icon */}
//         <div className="lg:hidden">
//           <button
//             className="h-6 w-6 cursor-pointer"
//             onClick={() => IsIsMobileMenuOpenFun(!isMobileMenuOpen)}
//           >
//             <MenuIcon />
//           </button>
//         </div>
//         {/* Central title */}
//         <div className="text-center flex-grow w-full flex items-center justify-center">
//           {/* <h2 className="text-xl font-semibold text-white my-auto">
//             Education AI
//           </h2> */}
//           {/* <img src={logo} alt="Brand logo" loading="lazy" className="w-16" /> */}
//           AI
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Bell, Sun, Moon, Menu, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/theme-slice';

interface NavbarProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav
      className={`
      h-16 px-4 
      ${
        isDarkMode
          ? 'bg-[rgba(16,20,46,1)] border-b border-[rgba(67,97,238,0.2)]'
          : 'bg-white border-b border-gray-200'
      }
      transition-colors duration-300
    `}
    >
      <div className="h-full flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-[rgba(67,97,238,0.15)] rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu
              className={`w-5 h-5 md:w-7 md:h-7 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            />
          </button>

          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
            Vitharathi.ai
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'hover:bg-[rgba(67,97,238,0.15)]'
                : 'hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? (
              <Sun className="text-[#4cc9f0] w-5 h-5 md:w-7 md:h-7" />
            ) : (
              <Moon className="text-[#4361ee] w-5 h-5 md:w-7 md:h-7" />
            )}
          </button>

          <button
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? 'hover:bg-[rgba(67,97,238,0.15)]'
                : 'hover:bg-gray-100'
            }`}
          >
            <Bell
              className={`w-5 h-5 md:w-7 md:h-7 ${isDarkMode ? 'text-[#4cc9f0]' : 'text-[#4361ee]'}`}
            />
          </button>

          <div
            className={`
            w-7 h-7 md:w-10 md:h-10  rounded-full flex items-center justify-center
            ${
              isDarkMode
                ? 'bg-[rgba(67,97,238,0.15)] text-[#4cc9f0]'
                : 'bg-[#4361ee]/10 text-[#4361ee]'
            }
          `}
          >
            {/* {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User />
            )} */}
            <User className="w-5 h-5 md:w-7 md:h-7" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
