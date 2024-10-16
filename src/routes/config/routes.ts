import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import { AuthLayout } from '../../layouts/AuthLayout';
import { ProfilingCheck } from '../../layouts/ProfilingCheck';

// Lazy load components
const Landing = lazy(() => import('../../pages/Landing'));
const Login = lazy(() => import('../../pages/Login'));
const Register = lazy(() => import('../../pages/Register'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Profiling = lazy(() => import('../../pages/Profiling'));
const BasicInfo = lazy(() => import('../../pages/BasicInfo'));

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
    layout: AuthLayout,
  },
  {
    path: '/profiling',
    key: 'profiling',
    isProtected: true,
    element: Profiling,
    layout: AuthLayout,
  },
];
