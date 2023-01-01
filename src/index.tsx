/*
 * Copyright 2023 by s4y.solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './react/components/App';
import './array/shuffle';
import log from './log';

declare global {
  interface ImportMeta {
    env?: { DEV?: boolean };
  }
}
if (!(location.hostname === 'localhost' || location.hostname === '127.0.0.1') && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;

      if (import.meta.env?.DEV) {
        reg = await navigator.serviceWorker.register('/service-worker.js', {
          type: 'module',
        });
        log.info('Service worker registered in dev mode!', reg);
      } else {
        // In production, use the normal service worker registration
        reg = await navigator.serviceWorker.register('/service-worker.js');
        log.info('Service worker registered!', reg);
      }

    } catch (err) {
      log.info('Service worker registration failed: ', err);
    }
  });
}

const container = document.getElementById('reactMount');
const root = createRoot(container);
root.render(<App />);
