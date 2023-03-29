import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import App from './App';

ReactGA.initialize('G-TGW6ESXKH9', { debug: false });
ReactGA.pageview(window.location.pathname + window.location.search);

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// reportWebVitals();
