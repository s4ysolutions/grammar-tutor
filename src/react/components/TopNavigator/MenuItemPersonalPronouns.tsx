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
import {Lesson} from '../../../tutor';
import {RouteId} from '../../../router';

const di = getDi();

const handleClick = (): void => {
  di.router.go(RouteId.PERSONAL_PRONOUNS_CASES);
  di.lessons.selectLesson(Lesson.PersonalPronounsCases);
  di.uiState.mainMenuOpen = false;
};

const MenuItemPersonalPronouns: React.FunctionComponent =
  (): React.ReactElement => {

    log.render('MenuItemPersonalPronouns');

    return <MenuItem onClick={handleClick}>
      {T`Personal Pronouns cases`}
    </MenuItem>;
  };

export default MenuItemPersonalPronouns;
