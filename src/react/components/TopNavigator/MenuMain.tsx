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
import {Divider, Menu} from '@mui/material';
import useObservable from '../../hooks/useObservable';
import {getDi} from '../../../di/default';
import MenuItemReset from './MenuItemReset';
import MenuItemPersonalPronouns from './MenuItemPersonalPronouns';
import MenuItemInterrogativePronouns from './MenuItemInterrogativePronouns';

const di = getDi();
const uiState = di.uiState;

const menuListProps = {'aria-labelledby': 'main-menu-button'};
const handleClose = () => {
  uiState.mainMenuOpen = false;
};

const MenuMain: React.FunctionComponent<{anchorEl: Element}> =
  ({anchorEl}): React.ReactElement => {

    const open = useObservable<boolean>(uiState.observableMainMenuOpen, uiState.mainMenuOpen);
    log.render(`Menu ${open}`);

    return <Menu
      MenuListProps={menuListProps}
      anchorEl={anchorEl}
      id="main-menu"
      onClose={handleClose}
      open={open}>

      <MenuItemPersonalPronouns />

      <MenuItemInterrogativePronouns />

      <Divider />

      <MenuItemReset />

    </Menu>;
  };

export default MenuMain;
