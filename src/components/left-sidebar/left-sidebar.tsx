import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LayoutDashboard, GraduationCap, Settings, Route } from 'lucide-react';

interface LeftSidebarProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: GraduationCap, label: 'Learning', path: '/learning' },
    { icon: Route, label: 'Study Planner', path: '/study-planner/overview' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
      fixed lg:relative
      w-64 h-[calc(100vh-4rem)]
      transition-transform duration-300
      ${
        isDarkMode
          ? 'bg-[rgba(16,20,46,1)] border-r border-[rgba(67,97,238,0.2)]'
          : 'bg-white border-r border-gray-200'
      }
      overflow-y-auto
      z-50
    `}
    >
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full px-4 py-3 rounded-lg
                flex items-center gap-3
                transition-all duration-300
                ${
                  isActive
                    ? isDarkMode
                      ? 'bg-[rgba(67,97,238,0.15)] text-[#4cc9f0]'
                      : 'bg-[#4361ee]/10 text-[#4361ee]'
                    : isDarkMode
                      ? 'text-white/70 hover:bg-[rgba(67,97,238,0.1)] hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
