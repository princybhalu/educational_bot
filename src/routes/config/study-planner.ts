import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import StudyPlannerDashboard from 'pages/study-planner/MainPage';
import CalendarView from 'pages/study-planner/CalendarView';
const AddFormOfTask = lazy(
  () => import('../../pages/study-planner/AddFormOfTask2')
);

export const StudyPlannerRoutes: RouteConfig[] = [
  // {
  //   path: '/study-planner',
  //   key: 'study-planner',
  //   // isProtected: true,
  //   element: StudyPlannerDashboard,
  //   islayout: true,
  //   // isProfilingRequired: true,
  // },
  {
    path: '/study-planner/add',
    key: 'study-planner',
    // isProtected: true,
    element: AddFormOfTask,
    islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/study-planner/:tab',
    key: 'study-planner',
    // isProtected: true,
    element: StudyPlannerDashboard,
    islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/study-planner/calendar/:scheduleId',
    key: 'studyPlanner',
    // isProtected: true,
    // isProfilingRequired: true,
    element: CalendarView,
    islayout: true,
  },
];
