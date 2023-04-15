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

import {Button, useTheme} from '@mui/material';
import React, {useCallback, useMemo} from 'react';

const space = 1;

export enum Status {
  NONE,
  WRONG,
  CORRECT,
  HINT
}

const font80 = {fontSize: '80%', fontStyle: 'italic'};
const bold = {fontWeight: 'bold'};
const Variant: React.FunctionComponent<{variant: string, onClick: (answer: string) => void, status: Status}> =
  ({onClick, variant, status}): React.ReactElement => {

    const theme = useTheme();
    const sx = useMemo(() => ({
      ml: theme.spacing(space),
      mr: theme.spacing(space),
      mt: theme.spacing(space),
      mb: theme.spacing(space),
    }), [theme]);

    const handleClick = useCallback(
      () => onClick(variant)
      , [variant, onClick],
    );

    const parts = variant.split(';');

    const label = parts.length === 1 ? <span style={bold}>
      {variant}
    </span> : <React.Fragment>
      <span style={bold}>
        {parts[0]}
      </span>
&nbsp;&nbsp;

      <span style={font80}>
        {parts[1]}
      </span>
    </React.Fragment>;

    return <Button
      color={status === Status.CORRECT ? 'success' : status === Status.WRONG ? 'error' : 'primary'}
      onClick={handleClick}
      sx={sx}
      variant={status === Status.NONE ? 'outlined' : 'contained'}
    >

      {label}
    </Button >;
  };

export default Variant;
