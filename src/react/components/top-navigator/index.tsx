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
import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import T from '../../../l10n';
import {getRouter} from '../../../di';
import useObservable from '../../hooks/useObservable';

import {Route} from '../../../router';
import {map} from 'rxjs/operators';

const router = getRouter();
const mr2 = {mr: 2};
const flexGrow1 = {flexGrow: 1};
const appTitle = T`App title`;

const TopNavigator: React.FunctionComponent = (): React.ReactElement => {
  const routerTitle = useObservable(
    router.observableCurrentRoute.pipe(map((route: Route) => route.title)),
    router.currentRoute.title,
  );

  return <Box sx={flexGrow1} >
    <AppBar position="static" >
      <Toolbar >
        <IconButton
          aria-label="menu"
          color="inherit"
          edge="start"
          size="large"
          sx={mr2}
        >
          {
            // <MenuIcon />
          }
        </IconButton >

        <Typography component="h1" sx={flexGrow1} variant="h6" >
          {`${appTitle} - ${routerTitle}`}
        </Typography >

        {/*
          <Button color="inherit" >
            Login
          </Button >
          */
        }
      </Toolbar >
    </AppBar >
  </Box >;
};

export default TopNavigator;