// import React, { Suspense } from 'react';
// import { useRoutes, BrowserRouter } from 'react-router-dom';
// import routes from './routes/routes';
// import NotificationWrapper from './components/notifiction/Notifiction';

// const App: React.FC = () => {
//   const element = useRoutes(routes);

//   return (<>
//     <BrowserRouter>
//       <Suspense fallback={<div>Loading...</div>}>
//         {element}
//       </Suspense>
//     </BrowserRouter>
//     <NotificationWrapper />
//     </>
//   );
// };

// export default App;

// src/App.tsx

import React, { Suspense } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { Router } from './routes/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
