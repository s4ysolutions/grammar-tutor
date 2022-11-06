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

import {ConjugationExercise, GrammarForm, GrammarPerson, GrammarPlurality, Person} from '../../../../tutor';
import {TableCell, TableRow} from '@mui/material';
import {CSS_BOLD} from '../constants';
import T from '../../../../l10n';
import Hint from '../Hint';
import React, {useEffect, useState} from 'react';
import Rules from '../Rules';

const hintTitles = [T`${GrammarPlurality.SINGULAR}`, T`${GrammarPlurality.PLURAL}`];

const TWO = 2;
const getPerson = (persons: Person[], personKey: string, p: GrammarPlurality): string => {
  const pe = GrammarPerson[personKey as keyof typeof GrammarPerson];
  return persons.filter(e => e.plurality === p && e.person === pe)
    .sort((a, b) => {
      const aa = a.form === GrammarForm.SHORT ? TWO : a.form === GrammarForm.LONG ? 1 : 0;
      const bb = b.form === GrammarForm.SHORT ? TWO : b.form === GrammarForm.LONG ? 1 : 0;
      return aa - bb;
    })
    .map(e => e.word)
    .join(' | ');
};

const VerbHint: React.FunctionComponent<{ exercise: ConjugationExercise }> =
  ({exercise}): React.ReactElement => {

    const [persons, setPersons] = useState<Person[] | null>(null);

    useEffect(() => {
      exercise.verb.persons().then(ps => {
        setPersons(ps === null ? [] : ps);
      });
    }, [exercise]);

    return <React.Fragment >
      <Hint columnTitles={hintTitles} >
        {persons !== null && Object.entries(GrammarPerson).map(([key, value]) => <TableRow key={key} >
          <TableCell align="right" sx={CSS_BOLD} >
            {T`${value}`}
          </TableCell >

          <TableCell >
            {getPerson(persons, key, GrammarPlurality.SINGULAR)}
          </TableCell >

          <TableCell >
            {getPerson(persons, key, GrammarPlurality.PLURAL)}
          </TableCell >

        </TableRow >)}
      </Hint >

      <Rules rules={exercise.verb.rules} />
    </React.Fragment >;
  };

export default VerbHint;
