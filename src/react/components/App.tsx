/*
 * Copyright 2022 by s4y.solutions
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
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import Workspace from './workspace';
import {ThemeOptions} from '@mui/material/styles';
import TopNavigator from './top-navigator';
import log from '../../log';

export const themeOptions: ThemeOptions = {};

const theme = createTheme(themeOptions);

const App: React.FunctionComponent = (): React.ReactElement => {
  log.render('App');
  return <React.StrictMode >
    <CssBaseline />

    <ThemeProvider theme={theme} >
      <TopNavigator />

      <Workspace />
    </ThemeProvider >
  </React.StrictMode >;
};

export default App;
