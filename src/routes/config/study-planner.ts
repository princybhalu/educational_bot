import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import StudyPlannerDashboard from 'pages/study-planner/MainPage';
const AddFormOfTask = lazy(
  () => import('../../pages/study-planner/AddFormOfTask2')
);
const ChatScreen = lazy(() => import('../../pages/study-planner/ChatScreen'));

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
    path: '/study-planner/edit',
    key: 'study-planner-edit',
    // isProtected: true,
    element: AddFormOfTask,
    islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/study-planner-chat/:chatId',
    key: 'studyPlanner',
    // isProtected: true,
    // isProfilingRequired: true,
    element: ChatScreen,
    islayout: true,
  },
  {
    path: '/study-planner/:tab',
    key: 'study-planner',
    // isProtected: true,
    element: StudyPlannerDashboard,
    islayout: true,
    // isProfilingRequired: true,
  },
];
