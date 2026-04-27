import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Global error logging for debugging published white screens
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global JS Error:", { message, source, lineno, colno, error });
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Failed to find root element");
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
  } catch (err) {
    console.error("Critical error during createRoot:", err);
  }
}
