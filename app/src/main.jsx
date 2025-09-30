import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import App from './App';
import './index.css';

// Import fonts
// Fonts should be loaded via CSS (e.g. add @font-face rules in index.css pointing to /assets/... in public)
// or move actual font files (woff/woff2/ttf) into src/assets and import those files instead of .txt license files.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);