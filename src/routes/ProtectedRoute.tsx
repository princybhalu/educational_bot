import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/TypedHooks'; // Ensure you have typed hooks for Redux

interface ProtectedRouteProps {
  children: React.ReactNode;
  profilingIncomplete?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  profilingIncomplete = false,
}) => {
  // Access the authentication state from Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);
  const hasCompletedProfiling = useAppSelector(
    (state) => state.auth.user?.hasCompletedProfiling
  ); // Assuming `hasCompletedProfiling` is part of user data

  // Check if the user is logged in
  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If profiling is incomplete, redirect to profiling page
  if (profilingIncomplete && !hasCompletedProfiling) {
    //TODO: check user is filled all basic info
    return <Navigate to="/profiling" replace />;
  }

  // If authenticated and profiling is complete, render children
  return <>{children}</>;
};

export default ProtectedRoute;
