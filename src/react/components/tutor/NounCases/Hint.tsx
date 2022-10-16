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

import log from '../../../../log';
import {getDi} from '../../../../di/default';
import {GrammarCase, GrammarForm, GrammarPlurality, NounCase} from '../../../../tutor';
import React, {useCallback, useMemo} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme} from '@mui/material';
import T from '../../../../l10n';
import usePromiseOnce from '../../../hooks/usePromiseOnce';

const di = getDi();
const nounsDB = di.pronounsDb;
const capitalize = {'textTransform': 'capitalize', 'fontWeight': 'bold'};
const upper = {'textTransform': 'uppercase', 'fontWeight': 'bold'};

const topSpace = 3;
const TWO = 2;

const Hint: React.FunctionComponent<{ word: string, exerciseCase: NounCase }> =
  ({word, exerciseCase: ec}): React.ReactElement => {
    log.render('Hint', word);

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
      mb: theme.spacing(topSpace),
    }), [theme]);

    const promiseIssuer = useCallback((): Promise<NounCase[]> => nounsDB.getNoun(word)
      .then(noun => noun.cases())
      // TODO: add setting to filter
      .then(cases =>
        cases === null
          ? null
          : cases.filter(c => c.gender === ec.gender)), [ec, word]);

    const cases = usePromiseOnce<NounCase[] | null>(promiseIssuer, null);

    const getCase = useCallback(
      (caseKey: string, p: GrammarPlurality): string => {
        const c = GrammarCase[caseKey as keyof typeof GrammarCase];
        return cases.filter(e => e.plurality === p && e.case === c)
          .sort((a, b) => {
            const aa = a.form === GrammarForm.SHORT ? TWO : a.form === GrammarForm.LONG ? 1 : 0;
            const bb = b.form === GrammarForm.SHORT ? TWO : b.form === GrammarForm.LONG ? 1 : 0;
            return aa - bb;
          })
          .map(e => e.word)
          .join(' | ');
      }
      , [cases],
    );

    return cases === null ? null : <TableContainer component={Paper} sx={sx} >
      <Table aria-label="simple table" >
        <TableHead >
          <TableRow >
            <TableCell />

            <TableCell sx={upper} >
              {T`${GrammarPlurality.SINGULAR}`}
            </TableCell >

            <TableCell sx={upper} >
              {T`${GrammarPlurality.PLURAL}`}
            </TableCell >
          </TableRow >
        </TableHead >

        <TableBody >
          {
            Object.entries(GrammarCase).map(([key, value]) => <TableRow key={key} >
              <TableCell align="right" sx={capitalize} >
                {T`${value}`}
              </TableCell >

              <TableCell >
                {getCase(key, GrammarPlurality.SINGULAR)}
              </TableCell >

              <TableCell >
                {getCase(key, GrammarPlurality.PLURAL)}
              </TableCell >

            </TableRow >)
          }
        </TableBody >
      </Table >
    </TableContainer >;
  };

export default Hint;
