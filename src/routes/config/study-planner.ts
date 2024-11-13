import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import StudyPlannerDashboard from 'pages/study-planner/index3';
import CalendarView from 'pages/study-planner/CalendarView';

export const StudyPlannerRoutes: RouteConfig[] = [
  {
    path: '/study-planner',
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
