import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Global debug logging
console.log("React Boot Sequence Started");

window.onerror = (message, source, lineno, colno, error) => {
  console.error("CRITICAL JS ERROR:", { message, source, lineno, colno, error });
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("CRITICAL: Root element not found!");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
    console.log("React Render Complete");
  } catch (err) {
    console.error("RENDER FAILURE:", err);
  }
}
