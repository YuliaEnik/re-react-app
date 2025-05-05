import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import ErrorBoundary from './Components/ErrorBoundary';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { NotFound } from './view/NotFound/index.tsx';
import { store } from './Store/store.tsx';

const appBase = '/re-react-app/app-state-management';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to={appBase} />,
    },
    {
      path: appBase,
      element: <App />,
      errorElement: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: appBase,
  }
);

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
