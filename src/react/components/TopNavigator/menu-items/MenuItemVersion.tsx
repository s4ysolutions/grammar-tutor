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
import {Typography} from '@mui/material';
import T from '../../../../l10n';

const MenuItemVersion: React.FunctionComponent =
  (): React.ReactElement => <div>
    <Typography align="center" variant="body2">
v20230415
    </Typography >

    <a href="https://slev.life">
      {T`Used materials`}
    </a>
  </div>;

export default MenuItemVersion;
