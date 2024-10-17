import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import Layouts from '../../layouts/layouts';

// Lazy load components
const Landing = lazy(() => import('../../pages/Landing'));
const Login = lazy(() => import('../../pages/Login'));
const Register = lazy(() => import('../../pages/Register'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Profiling = lazy(() => import('../../pages/Profiling'));
const BasicInfo = lazy(() => import('../../pages/BasicInfo'));
const StudyPlannerDashboard = lazy(() => import('../../pages/study-planner'));

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
    isProfilingRequired: true,
    element: Dashboard,
    islayout: true,
  },
  // teacher tailer route
  {
    path: '/profiling',
    key: 'profiling',
    // isProtected: true,
    element: Profiling,
    islayout: true,
  },
  {
    path: '/study-planner',
    key: 'studyPlanner',
    isProtected: true,
    isProfilingRequired: true,
    element: StudyPlannerDashboard,
    islayout: true,
  },
];
