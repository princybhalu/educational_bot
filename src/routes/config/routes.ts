import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import  Layouts  from '../../layouts/layouts';

// Lazy load components
const Landing = lazy(() => import('../../pages/Landing3'));
const Login = lazy(() => import('../../pages/Login'));
const Register = lazy(() => import('../../pages/Register'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Profiling = lazy(() => import('../../pages/Profiling'));
const StudyPlannerDashboard = lazy(() => import('../../pages/study-planner'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    key: 'landing',
    element: Landing,
    islayout: false
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
    path: '/dashboard',
    key: 'dashboard',
    isProtected: true,
    isProfilingRequired: true,
    element: Dashboard,
    islayout: true,
  },
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
    isProfilingRequired: true,
    element: StudyPlannerDashboard,
    islayout: true,
  },
];
