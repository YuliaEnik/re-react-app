import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import ErrorBoundary from './Components/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { NotFound } from './view/NotFound/index.tsx';
import { store } from './Store/store.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
