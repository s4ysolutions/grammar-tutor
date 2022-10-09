import React from 'react';
import {createRoot} from 'react-dom/client';
import HelloWorld from './react/components/hello-world';

const container = document.getElementById('reactMount');
const root = createRoot(container);
root.render(<HelloWorld />);
