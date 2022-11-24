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

import {Case, CaseExercise, GrammarCase, GrammarForm, GrammarPlurality} from '../../../../../tutor';
import {TableCell, TableRow} from '@mui/material';
import {CSS_CAPITALIZE} from '../../constants';
import T from '../../../../../l10n';
import Hint from '../../Hint';
import React, {useEffect, useState} from 'react';
import Rules from '../../Rules';

const hintTitles = [T`${GrammarPlurality.SINGULAR}`, T`${GrammarPlurality.PLURAL}`];

const TWO = 2;
const getCase = (cases: Case[], caseKey: string, p: GrammarPlurality): string => {
  const c = GrammarCase[caseKey as keyof typeof GrammarCase];
  return cases.filter(e => e.plurality === p && e.case === c)
    .sort((a, b) => {
      const aa = a.form === GrammarForm.SHORT ? TWO : a.form === GrammarForm.LONG ? 1 : 0;
      const bb = b.form === GrammarForm.SHORT ? TWO : b.form === GrammarForm.LONG ? 1 : 0;
      return aa - bb;
    })
    .map(e => e.word)
    .join(' | ');
};

const NounHint: React.FunctionComponent<{ exercise: CaseExercise }> =
  ({exercise}): React.ReactElement => {

    const [cases, setCases] = useState<Case[] | null>(null);

    useEffect(() => {
      // TODO: add setting to filter
      const gender = exercise.exerciseCase.gender;
      exercise.noun.cases().then(cs => {
        setCases(cs === null ? [] : cs.filter(c => !gender || c.gender === gender));
      });
    }, [exercise]);

    return <React.Fragment >
      <Hint columnTitles={hintTitles} >
        {cases !== null && Object.entries(GrammarCase).map(([key, value]) => <TableRow key={key} >
          <TableCell align="right" sx={CSS_CAPITALIZE} >
            {T`${value}`}
          </TableCell >

          <TableCell >
            {getCase(cases, key, GrammarPlurality.SINGULAR)}
          </TableCell >

          <TableCell >
            {getCase(cases, key, GrammarPlurality.PLURAL)}
          </TableCell >

        </TableRow >)}
      </Hint >

      {exercise.noun.rules ? <Rules rules={exercise.noun.rules} /> : null}
    </React.Fragment >;
  };

export default NounHint;
