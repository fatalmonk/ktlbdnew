import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initDatadog } from './datadog';
import { initGlobalErrorHandlers } from './lib/observability';
import './index.css';

initGlobalErrorHandlers();
initDatadog();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
