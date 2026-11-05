// Vite serves this entry only in development. Production never imports it.
import React from 'react';
import ReactDOM from 'react-dom/client';
import DevelopmentApp from './DevelopmentApp';
import ApplicationBoundary from '../ApplicationBoundary';
import '../styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationBoundary>
      <DevelopmentApp />
    </ApplicationBoundary>
  </React.StrictMode>,
);
