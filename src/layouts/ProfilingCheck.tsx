import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProfilingCheck = () => {
  const { isProfilingComplete } = useAuth();

  if (!isProfilingComplete) {
    return <Navigate to="/profiling" replace />;
  }

  return <Outlet />;
};
