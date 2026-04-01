import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles
import '@/styles/global.css';

// App
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
