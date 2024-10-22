import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/config/routes';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './layouts/layouts'; // Import your layout
import NotificationWrapper from './components/notifiction/Notifiction';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import DropletAnimation from './components/avatar';
// import ErrorBoundary from './components/error-boundry/error-boundry';

const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <>
      {/* <ErrorBoundary> */}
      <Provider store={store}>
        <PersistGate loading={<DropletAnimation />} persistor={persistor}>
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
                        {route.islayout === true ? (
                          <Layout>
                            <Suspense fallback={<DropletAnimation />}>
                              <route.element />
                            </Suspense>
                          </Layout>
                        ) : (
                          <Suspense fallback={<DropletAnimation />}>
                            <route.element />
                          </Suspense>
                        )}
                      </ProtectedRoute>
                    ) : route.islayout === true ? (
                      <Layout>
                        <Suspense fallback={<DropletAnimation />}>
                          <route.element />
                        </Suspense>
                      </Layout>
                    ) : (
                      <Suspense fallback={<DropletAnimation />}>
                        <route.element />
                      </Suspense>
                    )
                  }
                />
              ))}
            </Routes>
          </Router>
          <NotificationWrapper />
        </PersistGate>
      </Provider>
      {/* <ErrorBoundary> */}
    </>
  );
};

export default App;
