import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

console.log("EduQuiz Pro: Booting...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log("EduQuiz Pro: Rendered");
  } catch (err) {
    console.error("EduQuiz Pro: Render Failure", err);
  }
} else {
  console.error("EduQuiz Pro: Root element not found");
}
