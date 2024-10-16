import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/routes';
import NotificationWrapper from './components/notifiction/Notifiction';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import ErrorBoundary from './components/error-boundry/error-boundry';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {' '}
      {/* <ErrorBoundary> */}
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <Router />
        </PersistGate>
        <NotificationWrapper />
      </Provider>
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  );
};

export default App;
