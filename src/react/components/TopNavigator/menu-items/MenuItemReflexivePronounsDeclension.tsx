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
import {MenuItem} from '@mui/material';
import diFactory from '../../../../di/default';
import {Lesson} from '../../../../tutor';
import {RouteId} from '../../../../router';

const {di} = diFactory;

const handleClick = (): void => {
  di.tutor.selectLesson(Lesson.REFLEXIVE_PRONOUNS_DECLINATION).then(() =>
    di.router.go(RouteId.REFLEXIVE_PRONOUNS_DECLENSION));
  di.uiState.mainMenuOpen = false;
};

const MenuItemReflexivePronounsDeclension: React.FunctionComponent =
  (): React.ReactElement => <MenuItem onClick={handleClick}>
    {di.router.routeReflexivePronounsDeclension.title}
  </MenuItem>;

export default MenuItemReflexivePronounsDeclension;
