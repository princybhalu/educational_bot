import React, { useState, ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar';
import LeftsideBar from '../components/left-sidebar/LeftSidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import based on your store setup

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');

  const user = useSelector((state: RootState) => state.auth.user);

  const navigation = useNavigate();

  const handleNavigation = (screen: string, path: string) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
    navigation(path);
  };

  console.log(
    window.location.pathname.startsWith('/learning-path/chat-view/'),
    window.location.pathname.startsWith('/study-planner/calendar/')
  );

  return (
    <div className="flex flex-col h-screen ">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        IsIsMobileMenuOpenFun={setIsMobileMenuOpen}
      />

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {!(
          window.location.pathname === '/' ||
          window.location.pathname === '/profiling' ||
          window.location.pathname === '/dashboard'
        ) && (
          <>
            <LeftsideBar
              currentScreen={currentScreen}
              handleNavigation={handleNavigation}
              isMobileMenuOpen={isMobileMenuOpen}
              IsIsMobileMenuOpenFun={setIsMobileMenuOpen}
            />
          </>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* {!(window.location.pathname.startsWith('/learning-path/chat-view/') ||
          window.location.pathname.startsWith('/study-planner/calendar/')) && (
            <>
              <div className="animation-container1 absolute right-8 bottom-6 z-50 bg-transparent">
                <div className="circle-container1 w-full h-full">
                  <div className="central-circle1 w-[50px] h-[50px] "></div>
                  <div className="droplet1 w-[50px] h-[50px]"></div>
                </div>
              </div>
            </>
          )} */}
      </div>
    </div>
  );
};

export default Layout;
