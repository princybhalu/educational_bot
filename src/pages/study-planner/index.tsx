import TaskSection from '../../components/study-planner/TaskSection';
import Chart from '../../components/study-planner/Chart';
import React from 'react';
import UpcomingTask from '../../components/study-planner/UpcomingTask';

const StudyPlannerDashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3 border-b lg:border-r mb-2">
        <Chart />
        <TaskSection />
      </div>
      <div className="w-full lg:w-1/3">
        <UpcomingTask />
      </div>
    </div>
  );
};

export default StudyPlannerDashboard;
