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

import TableRow from '@mui/material/TableRow/TableRow';
import React from 'react';
import {CaseExercise, GrammarCase, GrammarGender, GrammarPlurality} from '../../../../../../tutor';
import {
  IDeclensionSlevRule,
  SlevRule,
  iDeclensionSlevRules,
  nounsSlevRules,
  slevNotes,
} from '../../../../../../tutor/databases/rules/slev-nouns';
import Hint from '../../../Hint';
import {TableCell, Typography} from '@mui/material';
import {CSS_CAPITALIZE} from '../../../constants';
import T from '../../../../../../l10n';
import './styles.scss';

let id = 1;

const notesFragment: React.ReactElement = <div className="slev-notes">
  {Object.entries(slevNotes).map(n => <div key={id++} >
    <sup >
      {n[0]}
    </sup >

    <span>
      {n[1]}
    </span>
  </div >)}
</div >;

const headers = [T`${GrammarPlurality.SINGULAR}`, T`${GrammarPlurality.PLURAL}`];

const prettyRules = (rules: SlevRule[]): React.ReactElement[] =>
  rules.map((r) => {
    const notes = r.notes ? <sup >
      {r.notes.join(', ')}
    </sup > : null;

    const replacements = r.replacements ? <div className="replacements" >
      {r.replacements.map(rr => <div key={id++}>
        {rr.from}
&nbsp;➟&nbsp;

        {rr.to}
      </div>)}
    </div> : null;

    return <div className="slev-rule" key={id++}>
      <div className="ending" key={id++} >
        {`-${r.ending}`}

        {notes}

      </div >

      {replacements}
    </div>;
  });

const SlevHintDefault: React.FunctionComponent<{ exercise: CaseExercise }> = ({exercise}): React.ReactElement => {
  const slev = nounsSlevRules[exercise.exerciseCase.case];
  const ms: SlevRule[] = [];
  const mp: SlevRule[] = [];
  const fs: SlevRule[] = [];
  const fp: SlevRule[] = [];
  const ns: SlevRule[] = [];
  const np: SlevRule[] = [];

  let hasNotes = false;
  let isException = false;

  slev.rules.forEach(r => {
    if (r.notes) {
      hasNotes = true;
    }
    if (r.exceptions && r.exceptions.indexOf(exercise.mainForm) >= 0) {
      isException = true;
    }
    if (r.plurality.indexOf(GrammarPlurality.SINGULAR) >= 0) {
      if (r.genders.indexOf(GrammarGender.MASCULINE) >= 0) {
        ms.push(r);
      }
      if (r.genders.indexOf(GrammarGender.FEMININE) >= 0) {
        fs.push(r);
      }
      if (r.genders.indexOf(GrammarGender.NEUTER) >= 0) {
        ns.push(r);
      }
    } else if (r.plurality.indexOf(GrammarPlurality.PLURAL) >= 0) {
      if (r.genders.indexOf(GrammarGender.MASCULINE) >= 0) {
        mp.push(r);
      }
      if (r.genders.indexOf(GrammarGender.FEMININE) >= 0) {
        fp.push(r);
      }
      if (r.genders.indexOf(GrammarGender.NEUTER) >= 0) {
        np.push(r);
      }
    }
  });

  const pl = exercise.exerciseCase.plurality;
  const g = exercise.exerciseCase.gender;

  return <div className="slev-hint">
    {isException ? <Typography color="error" variant="h5">
      {T`Exception`}
    </Typography> : null}

    <Hint columnTitles={headers} >
      <TableRow >
        <TableCell align="right" sx={CSS_CAPITALIZE} >
          {T`${GrammarGender.MASCULINE}`}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.SINGULAR && g === GrammarGender.MASCULINE ? 'current' : ''}>
          {prettyRules(ms)}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.PLURAL && g === GrammarGender.MASCULINE ? 'current' : ''}>
          {prettyRules(mp)}
        </TableCell >
      </TableRow >

      <TableRow >
        <TableCell align="right" sx={CSS_CAPITALIZE} >
          {T`${GrammarGender.NEUTER}`}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.SINGULAR && g === GrammarGender.NEUTER ? 'current' : ''}>
          {prettyRules(ns)}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.PLURAL && g === GrammarGender.NEUTER ? 'current' : ''}>
          {prettyRules(np)}
        </TableCell >
      </TableRow >

      <TableRow >
        <TableCell align="right" sx={CSS_CAPITALIZE} >
          {T`${GrammarGender.FEMININE}`}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.SINGULAR && g === GrammarGender.FEMININE ? 'current' : ''}>
          {prettyRules(fs)}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.PLURAL && g === GrammarGender.FEMININE ? 'current' : ''}>
          {prettyRules(fp)}
        </TableCell >
      </TableRow >

    </Hint >

    {hasNotes ? notesFragment : null}
  </div >;
};

const SlevHintI: React.FunctionComponent<{ exercise: CaseExercise }> = ({exercise}): React.ReactElement => {
  const s: Record<string, IDeclensionSlevRule> = {};
  const p: Record<string, IDeclensionSlevRule> = {};

  iDeclensionSlevRules.forEach(r => {
    if (r.plurality.indexOf(GrammarPlurality.SINGULAR) >= 0) {
      r.cases.forEach(c => {
        s[c.toString()] = r;
      });
    } else if (r.plurality.indexOf(GrammarPlurality.PLURAL) >= 0) {
      r.cases.forEach(c => {
        p[c.toString()] = r;
      });
    }
  });

  const pl = exercise.exerciseCase.plurality;
  const c = exercise.exerciseCase.case;

  return <div className="slev-hint">
    <Typography color="error" variant="h5">
      {T`-и Declension of female nouns`}
    </Typography>

    <Hint columnTitles={headers} >
      {Object.entries(GrammarCase).map(([key, value]) => <TableRow key={key} >
        <TableCell align="right" sx={CSS_CAPITALIZE} >
          {T`${value}`}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.SINGULAR && c === key ? 'current' : ''}>
          {s[value].ending}
        </TableCell >

        <TableCell className={pl === GrammarPlurality.PLURAL && c === key ? 'current' : ''}>
          {p[value].ending}
        </TableCell >

      </TableRow >)}
    </Hint >

  </div >;
};

const SlevHint: React.FunctionComponent<{ exercise: CaseExercise }> = ({exercise}): React.ReactElement =>
  exercise.noun.iDeclension ? <SlevHintI exercise={exercise} /> : <SlevHintDefault exercise={exercise} />;

export default SlevHint;
