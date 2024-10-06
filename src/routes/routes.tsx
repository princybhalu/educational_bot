// src/routes/Router.tsx
import { Suspense, createElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';
import { RouteConfig } from '../types/route';
import { ProfilingCheck } from '../layouts/ProfilingCheck';

const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

export const Router = () => {
  const renderRoute = (route: RouteConfig) => {
    // Create the base component
    let element = (
      <Suspense fallback={<LoadingSpinner />}>
        {createElement(route.element)}
      </Suspense>
    );

    // Wrap with layout if specified
    if (route.layout) {
      element = createElement(route.layout, null, element);
    }

    // Wrap with profiling check if required
    if (route.isProfilingRequired) {
      element = createElement(ProfilingCheck, null, element);
    }

    return <Route key={route.key} path={route.path} element={element} />;
  };

  return <Routes>{routes.map(renderRoute)}</Routes>;
};
