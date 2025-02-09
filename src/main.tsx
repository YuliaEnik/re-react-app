import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './Components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/re-react-app">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
