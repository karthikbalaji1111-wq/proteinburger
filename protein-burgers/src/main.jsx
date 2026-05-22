import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  document.body.innerHTML =
    '<p style="font-family:sans-serif;padding:2rem">Root element missing. Run npm run dev from the protein-burgers folder.</p>';
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}
