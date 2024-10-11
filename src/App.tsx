import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from "react-redux";
// import { store } from "./store";
import { routes } from './routes/config/routes';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './layouts/layouts'; // Import your layout
// import NotificationWrapper from "./shared/Notification";

const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <>
      {/* <Provider store={store}> */}
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.isProtected ? (
                  <ProtectedRoute
                    profilingIncomplete={route.isProfilingRequired ?? false}
                  >
                    {/* Exclude Layout for specific routes like /login */}
                    {route.islayout !== false ? (
                      <Layout>
                        <Suspense fallback={<LoadingSpinner />}>
                          <route.element />
                        </Suspense>
                      </Layout>
                    ) : (
                      <Suspense fallback={<LoadingSpinner />}>
                        <route.element />
                      </Suspense>
                    )}
                  </ProtectedRoute>
                ) : route.islayout !== false ? (
                  <Layout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <route.element />
                    </Suspense>
                  </Layout>
                ) : (
                  <Suspense fallback={<LoadingSpinner />}>
                    <route.element />
                  </Suspense>
                )
              }
            />
          ))}
        </Routes>
      </Router>
      {/* </Provider> */}
      {/* <NotificationWrapper /> */}
    </>
  );
};

export default App;
