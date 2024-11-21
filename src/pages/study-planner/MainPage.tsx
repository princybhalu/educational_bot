import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Bot } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Orbit from '../../components/avatar/Orbit';
import OverviewSection from '../../components/study-planner-V3/OverviewSection';
import TaskSection from '../../components/study-planner-V3/TaskSection';
import TaskFormModal from '../../components/study-planner-V3/TaskFormModal';

const TitleSection: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAITextarea, setShowAITextarea] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState(
    "Hi! Tell me your goals, and I'll plan tasks to help you achieve them!"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        //@ts-ignore
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Title and Description Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-4xl font-bold font-[Darker Grotesque] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
            Personalized AI Study Planner
          </h1>

          <div className="hidden md:flex items-center gap-4">
            {/* Generate AI Button - Web View */}
            <button
              onClick={() => setShowAITextarea(true)}
              className={`
                    px-6 py-2.5 rounded-lg font-medium
                    transition-all duration-300
                    bg-gradient-to-r from-[#4361ee] to-[#4cc9f0]
                    text-white hover:shadow-lg
                    hover:shadow-[#4361ee]/20
                    flex items-center gap-2
                  `}
            >
              <Bot size={20} />
              Generate by AI
            </button>

            {/* Menu Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                      p-2 rounded-lg transition-colors duration-300
                      ${
                        isDarkMode
                          ? 'hover:bg-[rgba(67,97,238,0.15)]'
                          : 'hover:bg-gray-100'
                      }
                    `}
              >
                <MoreVertical
                  className={isDarkMode ? 'text-white' : 'text-gray-900'}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className={`
                        absolute right-0 mt-2 w-48 rounded-xl shadow-2xl
                        ${
                          isDarkMode
                            ? 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]'
                            : 'bg-white/90 border border-gray-200'
                        }
                        z-50
                        backdrop-blur-lg
                        animate-slide-in-top
                      `}
                >
                  <div className="py-2">
                    <button
                      className={`
                            w-full px-4 py-2 text-left
                            transition-colors duration-300
                            ${
                              isDarkMode
                                ? 'text-white hover:bg-[rgba(67,97,238,0.15)]'
                                : 'text-gray-900 hover:bg-gray-100'
                            }
                          `}
                    >
                      Chat History
                    </button>
                    <button
                      className={`
                            w-full px-4 py-2 text-left
                            transition-colors duration-300
                            ${
                              isDarkMode
                                ? 'text-white hover:bg-[rgba(67,97,238,0.15)]'
                                : 'text-gray-900 hover:bg-gray-100'
                            }
                          `}
                    >
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <p
            className={`md:text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}
          >
            Need help planning your study sessions? Describe your goals or
            challenges, and our AI will suggest a tailored approach to enhance
            your study experience.
          </p>

          {/* Generate AI Button - Mobile View */}
          <div className="md:hidden flex items-center justify-end">
            <button
              onClick={() => setShowAITextarea(true)}
              className={`
                    px-6 py-2.5 rounded-lg font-medium
                    transition-all duration-300
                    bg-gradient-to-r from-[#4361ee] to-[#4cc9f0]
                    text-white hover:shadow-lg
                    hover:shadow-[#4361ee]/20
                    flex items-center gap-2
                  `}
            >
              <Bot size={20} />
              Generate by AI
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                      p-2 rounded-lg transition-colors duration-300
                      ${
                        isDarkMode
                          ? 'hover:bg-[rgba(67,97,238,0.15)]'
                          : 'hover:bg-gray-100'
                      }
                    `}
              >
                <MoreVertical
                  className={isDarkMode ? 'text-white' : 'text-gray-900'}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className={`
                        absolute right-0 mt-2 w-48 rounded-xl shadow-2xl
                        ${
                          isDarkMode
                            ? 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)] text-white'
                            : 'bg-white/90 border border-gray-200 text-gray-900'
                        }
                        z-50
                        backdrop-blur-lg
                        animate-slide-in-top
                        ring-2
                        ${
                          isDarkMode
                            ? 'ring-[rgba(67,97,238,0.3)]'
                            : 'ring-gray-200'
                        }
                      `}
                >
                  <div className="py-2">
                    <button
                      className={`
                            w-full px-4 py-2 text-left
                            transition-colors duration-300
                            ${
                              isDarkMode
                                ? 'hover:bg-[rgba(67,97,238,0.2)] hover:text-white'
                                : 'hover:bg-gray-100'
                            }
                          `}
                    >
                      Chat History
                    </button>
                    <button
                      className={`
                            w-full px-4 py-2 text-left
                            transition-colors duration-300
                            ${
                              isDarkMode
                                ? 'hover:bg-[rgba(67,97,238,0.2)] hover:text-white'
                                : 'hover:bg-gray-100'
                            }
                          `}
                    >
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Message */}
      {avatarMessage && (
        <div
          className={`
                p-6 rounded-xl
                ${
                  isDarkMode
                    ? 'bg-[rgba(16,20,46,1)] border border-[rgba(67,97,238,0.2)]'
                    : 'bg-white/90 border border-gray-200'
                }
                transition-all duration-300
                hover:shadow-lg
                ${
                  isDarkMode
                    ? 'hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]'
                    : 'hover:shadow-[0_10px_30px_rgba(67,97,238,0.1)]'
                }
              `}
        >
          <div className="flex items-start gap-2 md:gap-4">
            <div
              className={`
                    rounded-full flex items-center justify-center
                  `}
            >
              <Orbit opration={null} size={50} />
            </div>
            <p
              className={`flex-1 md:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {avatarMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface Tab {
  name: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="space-y-3 md:space-y-6 w-full max-w-3xl md:max-w-7xl">
      {/* Tab Headers */}
      <div
        className={`border-b ${
          isDarkMode ? 'border-[rgba(67,97,238,0.2)]' : 'border-gray-200'
        }`}
      >
        {/* Responsive Tab Container */}
        <div className="flex flex-wrap md:flex-nowrap -mb-px overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`
                flex-grow md:flex-grow-0
                px-4 py-2 text-sm md:text-base font-medium
                transition-colors duration-300 whitespace-nowrap
                ${
                  activeTab === tab.name
                    ? isDarkMode
                      ? 'text-[#4cc9f0] border-b-2 border-[#4cc9f0]'
                      : 'text-[#4361ee] border-b-2 border-[#4361ee]'
                    : isDarkMode
                      ? 'text-white/70 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  );
};

const MainPage: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const tabs = [
    { name: 'Overview', content: <OverviewSection /> },
    { name: 'Tasks', content: <TaskSection /> },
    { name: 'Progress', content: <div>Progress content here</div> },
    { name: 'Exam', content: <div>Exam content here</div> },
  ];

  const baseStyles = {
    light: {
      bg: 'bg-white',
      surface: 'bg-white/90',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-white/90',
      buttonHover: 'hover:bg-[#4361ee]/10',
    },
    dark: {
      bg: 'bg-[#0a0d1e]',
      surface: 'bg-[rgba(16,20,46,0.9)]',
      text: 'text-white',
      textSecondary: 'text-white/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-[rgba(16,20,46,1)]',
      buttonHover: 'hover:bg-[#4361ee]/15',
    },
  };

  const theme = isDarkMode ? baseStyles.dark : baseStyles.light;

  return (
    <div
      className={`
        min-h-screen w-full
        transition-colors duration-300
        ${isDarkMode ? 'bg-[#0a0d1e]' : 'bg-gray-50'}
      `}
    >
      <div className="max-w-7xl mx-auto">
        <TitleSection />
        <Tabs tabs={tabs} />
      </div>
      <TaskFormModal theme={theme} isOpen={false} onClose={() => false} />
    </div>
  );
};

export default MainPage;
