// import React, { useState, ReactNode } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import LeftsideBar from '../components/left-sidebar/LeftSidebar';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store'; // Adjust the import based on your store setup

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [currentScreen, setCurrentScreen] = useState<string>('dashboard');

//   const user = useSelector((state: RootState) => state.auth.user);

//   const navigation = useNavigate();

//   const handleNavigation = (screen: string, path: string) => {
//     setCurrentScreen(screen);
//     setIsMobileMenuOpen(false);
//     navigation(path);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-slate-800">
//       <Navbar
//         isMobileMenuOpen={isMobileMenuOpen}
//         IsIsMobileMenuOpenFun={setIsMobileMenuOpen}
//       />

//       {/* Content area */}
//       <div className="flex flex-1 overflow-hidden">
//         {!(
//           window.location.pathname === '/' ||
//           window.location.pathname === '/profiling' ||
//           window.location.pathname === '/dashboard'
//         ) && (
//           <>
//             <LeftsideBar
//               currentScreen={currentScreen}
//               handleNavigation={handleNavigation}
//               isMobileMenuOpen={isMobileMenuOpen}
//               IsIsMobileMenuOpenFun={setIsMobileMenuOpen}
//             />
//           </>
//         )}

//         {/* Main content */}
//         <main className="flex-1 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState, ReactNode } from 'react';
import Navbar from '../components/navbar/navbar';
import LeftSidebar from '../components/left-sidebar/left-sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? 'bg-[#0a0d1e] text-white' : 'bg-white text-gray-900'
      }`}
    >
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {!(
          window.location.pathname === '/' ||
          window.location.pathname === '/profiling'
        ) && (
          <LeftSidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}

        <main className="flex-1 w-full overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
