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

import React, {useMemo} from 'react';
import {Box, Typography, useTheme} from '@mui/material';
import {SlevVerbRule} from '../../../../tutor/databases/rules/slev-verbs';

const topSpace = 2;

const SlevVerbHint: React.FunctionComponent<{ rule: SlevVerbRule }> =
  ({rule}): React.ReactElement => {
    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
    }), [theme]);

    return <Box sx={sx} >
      <Typography align="center" key={rule.description} variant="body1" >
        {rule.description}
      </Typography >
    </Box >;
  };

export default SlevVerbHint;
