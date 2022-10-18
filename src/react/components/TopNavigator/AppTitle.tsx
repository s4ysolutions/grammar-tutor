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
import {Typography, useMediaQuery} from '@mui/material';
import T from '../../../l10n';
import log from '../../../log';
import {getDi} from '../../../di/default';
import useObservable from '../../hooks/useObservable';
import {Route} from '../../../router';
import {map} from 'rxjs/operators';

const di = getDi();
const router = di.router;

const appTitle = T`App title`;
const flexGrow1 = {flexGrow: 1};

const AppTitle: React.FunctionComponent =
  (): React.ReactElement => {
    log.render('AppTitle');

    const routeTitle = useObservable(
      router.observableCurrentRoute.pipe(map((route: Route) => T`${route.title}`)),
      router.currentRoute.title,
    );

    const wideScreen = useMediaQuery('(min-width:600px)');
    return <Typography component="h1" sx={flexGrow1} variant="h6" >
      {wideScreen ? `${appTitle} - ${routeTitle}` : appTitle}
    </Typography >;
  };

export default AppTitle;
