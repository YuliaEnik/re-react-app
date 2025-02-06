import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './Components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
