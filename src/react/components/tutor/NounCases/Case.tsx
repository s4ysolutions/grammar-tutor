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

import React, {useMemo} from 'react';
import {NounCase} from '../../../../tutor';
import T from '../../../../l10n';
import log from '../../../../log';
import {Typography, useTheme} from '@mui/material';

const topSpace = 2;

const caseTitle = (exerciseCase: NounCase) => {
  const casePlurality = T`${exerciseCase.plurality}`;
  const caseName = T`${exerciseCase.case}`;

  if (!exerciseCase.gender && !exerciseCase.form) {
    return `${casePlurality}, ${caseName}`;
  }

  if (exerciseCase.gender && exerciseCase.form) {
    const formName = T`${exerciseCase.form}`;
    const genderName = T`${exerciseCase.gender}`;
    return `${casePlurality}, ${genderName}, ${caseName}, ${formName}`;
  }

  if (exerciseCase.gender) {
    const genderName = T`${exerciseCase.gender}`;
    return `${casePlurality}, ${genderName}, ${caseName}`;
  }

  const formName = T`${exerciseCase.form}`;
  return `${casePlurality}, ${caseName}, ${formName}`;
};

const Case: React.FunctionComponent<{exerciseCase: NounCase}> = ({exerciseCase}): React.ReactElement => {
  log.render('Case', exerciseCase);
  const theme = useTheme();
  const sx = useMemo(() => ({
    mt: theme.spacing(topSpace),
  }), [theme]);
  return <Typography align="center" sx={sx} variant="h6">
    {caseTitle(exerciseCase)}
  </Typography>;
};

export default Case;
