import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  profilingIncomplete?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  profilingIncomplete = false,
}) => {
  const isAuthenticated = true; // Replace with your actual auth logic
  const hasCompletedProfiling = false; // Replace with your actual profiling check

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (profilingIncomplete && hasCompletedProfiling) {
    // If the profiling is incomplete, prevent access to certain routes
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow access
  return <>{children}</>;
};

export default ProtectedRoute;
