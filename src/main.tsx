import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

console.log("EduQuiz Pro: Booting main.tsx");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );

    // Optimized splash removal
    const removeSplash = () => {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.4s ease-out';
        setTimeout(() => splash.remove(), 400);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(removeSplash, 500);
    } else {
      window.addEventListener('load', removeSplash);
      setTimeout(removeSplash, 2000); // Fallback
    }
  } catch (error) {
    console.error("Critical: Render failure", error);
  }
} else {
  console.error("EduQuiz Pro: Root element not found");
}
