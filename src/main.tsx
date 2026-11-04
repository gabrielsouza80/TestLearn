import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApplicationBoundary from './ApplicationBoundary';
import './styles.css';
// Vite erases this import in production; keep pilot content out of App's graph.
const Root = import.meta.env.DEV
  ? React.lazy(() => import('./experimental/DevelopmentApp'))
  : App;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationBoundary>
      <React.Suspense fallback={<p role="status">A carregar… / Loading…</p>}>
        <Root />
      </React.Suspense>
    </ApplicationBoundary>
  </React.StrictMode>,
);
