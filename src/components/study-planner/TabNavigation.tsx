import React, { useState } from 'react';
import DayView from './dayPlaner';
import WeeklySchedule from './WeeklySchedule';
import ExamPreparationView from './ExamPreparation1';
import { Home, Calendar, BookOpen } from 'lucide-react';
import { DayPlanItem } from '../../types/study-planner';

type Tab = {
  id: 'plan-day' | 'plan-week' | 'plan-exam';
  label: string;
  icon: React.ComponentType<React.ComponentProps<typeof Home>>;
};

interface TabNavigationProps {
  activeTab: 'plan-day' | 'plan-week' | 'plan-exam';
  setActiveTab: (tabId: 'plan-day' | 'plan-week' | 'plan-exam') => void;
  dayPlan: DayPlanItem[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  dayPlan,
}) => {
  const tabs: Tab[] = [
    {
      id: 'plan-day',
      label: 'Plan Your Day',
      icon: Home,
    },
    {
      id: 'plan-week',
      label: 'Plan Your Week',
      icon: Calendar,
    },
    {
      id: 'plan-exam',
      label: 'Plan for Exam',
      icon: BookOpen,
    },
  ];

  return (
    <div className="w-full">
      <div className="relative bg-gray-950 border-b border-gray-800">
        {/* Background Glow Effect for Active Tab */}
        <div
          className="absolute h-1 bottom-0 bg-blue-500/20 blur-sm transition-all duration-300"
          style={{
            left: `${(tabs.findIndex((tab) => tab.id === activeTab) * 100) / tabs.length}%`,
            width: `${100 / tabs.length}%`,
          }}
        />

        {/* Tabs Container */}
        <div className="flex items-center justify-start overflow-x-auto scrollbar-hide max-w-screen-xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative group flex-shrink-0 flex items-center justify-center
                transition-all duration-200
                
                /* Mobile Styles */
                px-3 py-3 min-w-[100px]
                
                /* Tablet Styles */
                sm:px-4 sm:py-3 sm:min-w-[130px]
                
                /* Desktop Styles */
                md:px-6 md:py-4 md:min-w-[160px]
                
                ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}
              `}
            >
              {/* Active Tab Indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
              )}

              {/* Icon and Label Container */}
              <div className="flex items-center space-x-2">
                <tab.icon
                  size={18}
                  className={`transition-transform duration-200 
                    ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-500'}
                    group-hover:scale-110`}
                />
                <span
                  className={`
                    font-medium tracking-wide whitespace-nowrap
                    text-xs sm:text-sm
                    ${activeTab === tab.id ? 'text-blue-400' : ''}
                  `}
                >
                  {/* Show shortened labels on mobile */}
                  <span className="block sm:hidden">
                    {tab.label
                      .replace('Plan Your ', '')
                      .replace('Plan for ', '')}
                  </span>
                  {/* Show full labels on larger screens */}
                  <span className="hidden sm:block">{tab.label}</span>
                </span>
              </div>

              {/* Hover Indicator */}
              <div
                className={`
                  absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 pointer-events-none
                  ${activeTab === tab.id ? 'bg-blue-500/5' : 'bg-gray-700/10'}
                `}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-gray-950 min-h-screen">
        <div className="p-0 sm:p-2 md:p-4">
          {/* {activeTab === 'plan-day' && <DayView dayPlan={dayPlan}/>} */}
          {activeTab === 'plan-week' && <WeeklySchedule />}
          {activeTab === 'plan-exam' && <ExamPreparationView />}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
