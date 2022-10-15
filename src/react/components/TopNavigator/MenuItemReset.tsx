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
import log from '../../../log';
import T from '../../../l10n';
import {MenuItem} from '@mui/material';
import {getDi} from '../../../di/default';

const di = getDi();

const handleClick = (): void => {
  di.learningDb.reset().then();
  di.uiState.mainMenuOpen = false;
};

const MenuItemReset: React.FunctionComponent =
  (): React.ReactElement => {

    log.render('MenuItemReset');

    return <MenuItem onClick={handleClick}>
      {T`Reset`}
    </MenuItem>;
  };

export default MenuItemReset;
