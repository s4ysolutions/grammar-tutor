import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './react/components/App';

const container = document.getElementById('reactMount');
const root = createRoot(container);
root.render(<App />);
