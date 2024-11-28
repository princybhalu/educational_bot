import { lazy } from 'react';
import { RouteConfig } from '../../types/route';
import { PsychologicalProfileRoutes } from './psychological-profile-routes';
import { StudyPlannerRoutes } from './study-planner';

const Landing = lazy(() => import('../../pages/Landing'));
const Login = lazy(() => import('../../pages/login1'));
const Register = lazy(() => import('../../pages/register1'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const BasicInfo = lazy(() => import('../../pages/BasicInfo'));
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
    // isProtected: true,
    // isProfilingRequired: true,
    element: Dashboard,
    islayout: true,
  },
  ...PsychologicalProfileRoutes,
  ...StudyPlannerRoutes,
  {
    path: '*',
    key: 'not-found',
    element: NotFound,
  },
];
