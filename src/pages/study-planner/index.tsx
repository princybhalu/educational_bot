import TaskSection from '../../components/study-planner/TaskSection';
import Chart from '../../components/study-planner/Chart';
import React, { useState } from 'react';
import UpcomingTask from '../../components/study-planner/UpcomingTask';
import { MdArrowForward, MdEvent, MdHome } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const StudyPlannerDashboard = () => {
  const [activeScheduledId, setActiveScheduledId] = useState<null | string>(
    null
  );

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="w-full">
          {/* Breadcrumb */}
          <div className="px-6 py-4 flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <MdHome className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <MdArrowForward className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 flex items-center space-x-1">
              <MdEvent className="w-4 h-4" />
              <span>Study Planner</span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 border-b lg:border-r mb-2">
          <Chart />
          <TaskSection setActiveScheduledId={setActiveScheduledId} />
        </div>
        <div className="w-full lg:w-1/3">
          {activeScheduledId && (
            <UpcomingTask activeScheduledId={activeScheduledId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlannerDashboard;
