import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Home,
  Grid,
  Search,
  Calendar,
  Award,
  Target,
  ChevronRight,
  Plus,
  BookOpen,
} from 'lucide-react';
import { Icon as LucideIcon } from 'lucide-react'; // Ensure correct import for the icon type

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => (
  <div className="w-full bg-gray-800/50 rounded-full h-4 relative overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500 ease-out"
      style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-size-1rem animate-shimmer" />
    </div>
    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
      {Math.round((value / max) * 100)}%
    </span>
  </div>
);

interface StatsCardProps {
  icon: any;
  label: string;
  value: string | number;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
}) => (
  <CustomCard>
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  </CustomCard>
);

const AIEnhancedStudyPlanner = () => {
  const [progress, setProgress] = useState(65);
  const [points, setPoints] = useState(1250);
  const [streak, setStreak] = useState(7);
  const [activeTab, setActiveTab] = useState('plan-day');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'plan-day', label: 'Daily Plan', icon: Home },
    { id: 'plan-week', label: 'Weekly Plan', icon: Grid },
    { id: 'plan-exam', label: 'Exam Prep', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Study Hub
              <span className="text-blue-400 ml-2">AI</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Your personalized learning assistant
            </p>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
          </div>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Target}
            label="Daily Progress"
            value={`${progress}%`}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Award}
            label="Total Points"
            value={points}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={Calendar}
            label="Study Streak"
            value={`${streak} days`}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={BookOpen}
            label="Topics Covered"
            value="12/15"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Progress Section */}
        <CustomCard className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-200">
              Overall Progress
            </h2>
            <ProgressBar value={progress} max={100} />
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Daily Target: 75%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Weekly Goal: 85%</span>
              </div>
            </div>
          </div>
        </CustomCard>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto bg-gray-800/50 rounded-lg p-1 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-max ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {!isSmallScreen && tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <CustomCard>
          <div className="p-6 space-y-4">
            {activeTab === 'plan-day' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    Today&rsquo;s Schedule
                  </h2>
                  <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                {/* Add your day planner content here */}
              </div>
            )}
            {activeTab === 'plan-week' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  Weekly Overview
                </h2>
                {/* Add your weekly planner content here */}
              </div>
            )}
            {activeTab === 'plan-exam' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  Exam Preparation
                </h2>
                {/* Add your exam prep content here */}
              </div>
            )}
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default AIEnhancedStudyPlanner;
