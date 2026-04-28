import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

console.log("React: Start mounting");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    
    // Remove splash screen when React is ready to render
    const splash = document.getElementById('splash');
    if (splash) {
      console.log("Removing splash screen");
      splash.remove();
    }

    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log("React: Render triggered");
  } catch (error) {
    console.error("React: Mount failed", error);
  }
} else {
  console.error("React: Root element not found");
}
