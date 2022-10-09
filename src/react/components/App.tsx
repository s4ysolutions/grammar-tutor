import React from 'react';
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import Workspace from './workspace';
import {ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
};

const theme = createTheme(themeOptions);

const App: React.FunctionComponent = (): React.ReactElement => <React.StrictMode >
  <CssBaseline />

  <ThemeProvider theme={theme} >
    <Workspace />
  </ThemeProvider >
</React.StrictMode >;

export default App;
