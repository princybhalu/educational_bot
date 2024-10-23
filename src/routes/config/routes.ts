import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import Layouts from '../../layouts/layouts';
import QuestionCards from '../../components/profiling/QuestionSection';

// Lazy load components
const Landing = lazy(() => import('../../pages/Landing'));
const Login = lazy(() => import('../../pages/login1'));
const Register = lazy(() => import('../../pages/register1'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Profiling = lazy(() => import('../../pages/Profiling'));
const BasicInfo = lazy(() => import('../../pages/BasicInfo'));
const StudyPlannerDashboard = lazy(() => import('../../pages/study-planner'));
const LearningPathDashboard = lazy(() => import('../../pages/learning-path'));
const ChapterList = lazy(() => import('../../pages/learning-path/ChapterList'));
const LearningChatView = lazy(
  () => import('../../pages/learning-path/LearningChatView')
);
const CalendarView = lazy(
  () => import('../../pages/study-planner/CalendarView')
);
const NotFound = lazy(() => import('../../components/shared/NotFoundPage'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    key: 'landing',
    element: Landing,
  },
  {
    path: '/login',
    key: 'login',
    element: Login,
  },
  {
    path: '/register',
    key: 'register',
    element: Register,
  },
  {
    path: '/basic-info',
    key: 'basic-info',
    element: BasicInfo,
    isProtected: true,
  },
  {
    path: '/dashboard',
    key: 'dashboard',
    isProtected: true,
    // isProfilingRequired: true,
    element: Dashboard,
    islayout: true,
  },
  // teacher tailer route
  {
    path: '/profiling',
    key: 'profiling',
    isProtected: true,
    element: Profiling,
    islayout: true,
  },
  {
    path: '/study-planner',
    key: 'studyPlanner',
    isProtected: true,
    // isProfilingRequired: true,
    element: StudyPlannerDashboard,
    islayout: true,
  },
  {
    path: '/study-planner/calendar/:scheduleId',
    key: 'studyPlanner',
    isProtected: true,
    // isProfilingRequired: true,
    element: CalendarView,
    islayout: true,
  },
  {
    path: '/learning-path',
    key: 'learningPath',
    // isProtected: true,
    // isProfilingRequired: true,
    element: LearningPathDashboard,
    islayout: true,
  },
  {
    path: '/learning-path/chapter-list/:subjectId/:subjectName',
    key: 'learningPathChapterList',
    // isProtected: true,
    // isProfilingRequired: true,
    element: ChapterList,
    islayout: true,
  },
  {
    path: '/learning-path/chat-view/:type/:relevantId/:topicName',
    key: 'chatView',
    // isProtected: true,
    // isProfilingRequired: true,
    element: LearningChatView,
    islayout: true,
  },
  {
    path: '*',
    key: 'not-found',
    element: NotFound,
  },
];
