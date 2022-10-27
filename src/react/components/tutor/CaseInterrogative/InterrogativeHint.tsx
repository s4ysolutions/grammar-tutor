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

import {Case, CaseExercise, GrammarAnimation, GrammarCase} from '../../../../tutor';
import {TableCell, TableRow} from '@mui/material';
import {CSS_CAPITALIZE} from '../constants';
import T from '../../../../l10n';
import Hint from '../Hint';
import React, {useEffect, useState} from 'react';

const hintTitles = [T`${GrammarAnimation.ANIMATE}`, T`${GrammarAnimation.INANIMATE}`];

const getCase = (cases: Case[], caseKey: string, p: GrammarAnimation): string => {
  const c = GrammarCase[caseKey as keyof typeof GrammarCase];
  return cases.filter(e => e.animation === p && e.case === c).map(e => e.word)
    .join(' | ');
};

const InterrogativeHint: React.FunctionComponent<{exercise: CaseExercise}> =
  ({exercise}): React.ReactElement => {

    const [cases, setCases] = useState<Case[] | null>(null);

    useEffect(() => {
      // TODO: add setting to filter
      exercise.noun.cases().then(cs => {
        setCases(cs === null ? [] : cs);
      });
    }, [exercise]);

    return <Hint columnTitles={hintTitles} >
      {cases !== null && Object.entries(GrammarCase).map(([key, value]) => <TableRow key={key} >
        <TableCell align="right" sx={CSS_CAPITALIZE} >
          {T`${value}`}
        </TableCell >

        <TableCell >
          {getCase(cases, key, GrammarAnimation.ANIMATE)}
        </TableCell >

        <TableCell >
          {getCase(cases, key, GrammarAnimation.INANIMATE)}
        </TableCell >

      </TableRow >)}
    </Hint >;
  };

export default InterrogativeHint;
