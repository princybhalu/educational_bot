import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { useSelector } from 'react-redux';

const LeftsideBar: React.FC<{
  currentScreen: string;
  handleNavigation: (screen: string, path: string) => void;
  isMobileMenuOpen: boolean;
  IsIsMobileMenuOpenFun: (isOpen: boolean) => void;
}> = ({
  currentScreen,
  handleNavigation,
  isMobileMenuOpen,
  IsIsMobileMenuOpenFun,
}) => {
  const [isCompact, setIsCompact] = useState(true);

  // Define the menu items
  const menuItems = [
    {
      name: 'Learning Path',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      ),
      screen: 'learningPath',
      path: '/learning-path',
      allowedRoles: [
        /* Add roles as necessary */
      ],
    },
    {
      name: 'Daily Study Planner',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
          />
        </svg>
      ),
      screen: 'dailyStudyPlanner',
      path: '/daily-study-planner',
      allowedRoles: [
        /* Add roles as necessary */
      ],
    },
  ];

  // Filter menu items based on allowed roles (if needed)
  const filteredMenuItems = menuItems; // Adjust filtering logic based on roles if necessary

  return (
    <>
      {/* Sidebar for laptop view */}
      <aside
        className={`bg-[#003366] text-white ${isCompact ? 'w-16' : 'w-64'} hidden lg:flex flex-col justify-between transition-all duration-300`}
      >
        <div className="p-4">
          {filteredMenuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${currentScreen === item.screen ? 'bg-[var(--sidebar-active)]' : 'hover:bg-[var(--sidebar-hover)]'} ${isCompact ? 'justify-center' : ''}`}
              onClick={() => handleNavigation(item.screen, item.path)}
            >
              <div
                className={`${isCompact ? 'w-8 h-8' : 'w-6 h-6'} transition-all duration-300`}
              >
                {item.icon}
              </div>
              {(!isCompact || currentScreen === item.screen) && (
                <span
                  className={`ml-2 ${isCompact ? 'hidden group-hover:inline-block' : ''}`}
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="p-4">
          <button
            className="w-full p-2 rounded-lg bg-[var(--sidebar-hover)] hover:bg-[var(--sidebar-active)] transition-colors duration-200 flex items-center justify-center"
            onClick={() => setIsCompact(!isCompact)}
          >
            {isCompact ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-[#003366] text-white h-full w-64 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">LOGO HREE</h2>
              <button onClick={() => IsIsMobileMenuOpenFun(false)}>
                <CloseIcon />
              </button>
            </div>
            {filteredMenuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${currentScreen === item.screen ? 'bg-[var(--sidebar-active)]' : 'hover:bg-[var(--sidebar-hover)]'}`}
                onClick={() => handleNavigation(item.screen, item.path)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LeftsideBar;
