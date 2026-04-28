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

    // Remove splash screen after a small delay to ensure React has started mounting
    setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) {
        console.log("Removing splash screen");
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => splash.remove(), 500);
      }
    }, 100);

    console.log("EduQuiz Pro: Render triggered");
  } catch (error) {
    console.error("EduQuiz Pro: Mount failed", error);
  }
} else {
  console.error("EduQuiz Pro: Root element not found");
}
