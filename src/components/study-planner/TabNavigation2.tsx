// import React, { useState } from 'react';
// import DayView from './dayPlaner';
// import WeeklySchedule from './WeeklySchedule';
// import ExamPreparationView from './ExamPreparation1';
// import {
//   Home,
//   Calendar,
//   BookOpen,
// } from 'lucide-react';

// type Tab = {
//   id: 'plan-day' | 'plan-week' | 'plan-exam';
//   label: string;
//   icon: React.ComponentType<React.ComponentProps<typeof Home>>;
// };

// interface TabNavigationProps {
//   activeTab: 'plan-day' | 'plan-week' | 'plan-exam';
//   setActiveTab: (tabId: 'plan-day' | 'plan-week' | 'plan-exam') => void;
// }

// const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
//   const tabs: Tab[] = [
//     {
//       id: 'plan-day',
//       label: 'Plan Your Day',
//       icon: Home,
//     },
//     {
//       id: 'plan-week',
//       label: 'Plan Your Week',
//       icon: Calendar,
//     },
//     {
//       id: 'plan-exam',
//       label: 'Plan for Exam',
//       icon: BookOpen,
//     },
//   ];

//   return (
//       <div className="w-full mt-6">
//       <div className=" bg-gray-800 border-b border-gray-700 py-3">
//         <button
//           className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors ${
//             activeTab === 'plan-day'
//               ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
//               : 'text-gray-300 hover:bg-gray-700'
//           }`}
//           onClick={() => setActiveTab('plan-day')}
//         >
//           <Home size={20} />
//           <span className="ml-2">Plan Your Day</span>
//         </button>
//         <button
//           className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors ${
//             activeTab === 'plan-week'
//               ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
//               : 'text-gray-300 hover:bg-gray-700'
//           }`}
//           onClick={() => setActiveTab('plan-week')}
//         >
//           <Calendar size={20} />
//           <span className="ml-2">Plan Your Week</span>
//         </button>
//         <button
//           className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors ${
//             activeTab === 'plan-exam'
//               ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
//               : 'text-gray-300 hover:bg-gray-700'
//           }`}
//           onClick={() => setActiveTab('plan-exam')}
//         >
//           <BookOpen size={20} />
//           <span className="ml-2">Plan for Exam</span>
//         </button>
//       </div>
//       {/* display active tabs content */}
//       {activeTab === 'plan-day' && (
//         <> <DayView /> </>
//       )}
//       {activeTab === 'plan-week' && (
//         <div className="p-4">
//           <WeeklySchedule />
//         </div>
//       )}
//       {activeTab === 'plan-exam' && (
//         <div className="p-4">
//           {/* <h2 className="text-2xl font-bold text-blue-400">Exam Prep View</h2> */}
//           {/* exam prep view content */}
//           <ExamPreparationView />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TabNavigation;

import React from 'react';

export default function TabNavigation2() {
  return <div>TabNavigation2</div>;
}
