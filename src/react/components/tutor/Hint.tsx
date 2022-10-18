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

import log from '../../../log';
import React, {ReactNode, useMemo} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme} from '@mui/material';

const upper = {'textTransform': 'uppercase', 'fontWeight': 'bold'};

const topSpace = 3;

const Hint: React.FunctionComponent<{ columnTitles: string[], children: ReactNode[]}> =
  ({columnTitles, children}): React.ReactElement => {
    log.render('Hint');

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
      mb: theme.spacing(topSpace),
    }), [theme]);

    // return cases === null ? null : <TableContainer component={Paper} sx={sx} >
    return <TableContainer component={Paper} sx={sx} >
      <Table aria-label="simple table" >
        <TableHead >
          <TableRow >
            <TableCell />

            {
              columnTitles.map(title => <TableCell key={title} sx={upper} >
                {title}
              </TableCell >)
            }
          </TableRow >
        </TableHead >

        <TableBody >
          {children}
        </TableBody >
      </Table >
    </TableContainer >;
  };

export default Hint;
