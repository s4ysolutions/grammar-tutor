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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Container, IconButton, TableCell, TableRow, Typography, useTheme} from '@mui/material';
import Variants from '../Variants';
import log from '../../../../log';
import Case from '../Case';
import {getDi} from '../../../../di/default';
import Hint from '../Hint';
import QuizIcon from '@mui/icons-material/Quiz';
import T from '../../../../l10n';
import Grid2 from '@mui/material/Unstable_Grid2';
import {Case, CaseExercise, GrammarCase, GrammarForm, GrammarGender, GrammarPlurality} from '../../../../tutor';
import MainForm from '../MainForm';
import {CSS_CAPITALIZE} from '../constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faXmarksLines as faLong,
  faPerson as faMan,
  faPersonDress as faWoman,
} from '@fortawesome/free-solid-svg-icons';

const di = getDi();
const tutor = di.tutor;
const nounsDB = di.personPronounsDb;
const interrogativePronounsDb = di.interrogativePronounsDb;

const caseTitle = (exerciseCase: Case) => {
  const caseName = T`${exerciseCase.case}`;
  const casePlurality = T`${exerciseCase.plurality}`;
  if (!exerciseCase.gender && !exerciseCase.form) {
    return `${caseName}, ${casePlurality}`;
  }
  if (exerciseCase.gender && exerciseCase.form) {
    const formName = T`${exerciseCase.form}`;
    const genderName = T`${exerciseCase.gender}`;
    return `${caseName}, ${casePlurality}, ${genderName}, ${formName}`;
  }

  if (exerciseCase.gender) {
    const genderName = T`${exerciseCase.gender}`;
    return `${caseName}, ${casePlurality}, ${genderName}`;
  }

  const formName = T`${exerciseCase.form}`;
  return `${caseName}, ${casePlurality}, ${formName}`;
};

const caseIcon = (exerciseCase: Case) => {
  if (exerciseCase.gender === GrammarGender.NEUTER) {
    return faCloud;
  } else if (exerciseCase.gender === GrammarGender.FEMININE) {
    return faWoman;
  }
  return faMan;
};

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

const hintTitles = [T`${GrammarPlurality.SINGULAR}`, T`${GrammarPlurality.PLURAL}`];

export const CSS_SHIFT_LEFT = {position: 'relative', marginLeft: -10, opacity: 0.7} as React.CSSProperties;

const NounCases: React.FunctionComponent = (): React.ReactElement => {
  log.render('NounCases');

  const [currentExercise, setCurrentExercise] = useState<CaseExercise>(null);
  useEffect(() => {
    tutor.nextCaseExercise().then(setCurrentExercise);
  }, []);

  const [cases, setCases] = useState<Case[] | null>(null);

  const updateCases = useCallback((exercise: CaseExercise) =>
    nounsDB.getNounByMainForm(exercise.mainForm)
      .then(noun => noun.cases())
      // TODO: add setting to filter
      .then(cs => {
        setCases(cs === null ? [] : cs.filter(c => c.gender === exercise.exerciseCase.gender));
      }), []);

  const [help, setHelp] = useState(false);

  const toggleHelp = useCallback(() => {
    const nextHelp = !help;
    setHelp(nextHelp);
    if (nextHelp && cases === null) {
      updateCases(currentExercise).then();
    }
  }, [help, cases, updateCases, currentExercise]);

  const nextExercise = useCallback(
    () => tutor.nextCaseExercise().then((nextEx) => {
      setCurrentExercise(nextEx);
      if (help) {
        updateCases(nextEx).then();
      } else {
        setCases(null);
      }
    }),
    [help, updateCases],
  );

  const checkVariant = useCallback(
    (variant: string): Promise<boolean> => tutor.checkCaseExercise(variant, currentExercise),
    [currentExercise],
  );

  const possibleVariant = useMemo(() =>
    currentExercise === null ? null : currentExercise.possibleVariants.shuffle(), [currentExercise]);

  const [interrogative, setInterrogative] = useState<string[] | null>(null);

  useEffect(() => {
    if (currentExercise === null) {
      setInterrogative(null);
    } else {
      interrogativePronounsDb.getCasesForGrammarCase(currentExercise.exerciseCase.case)
        .then(cs => setInterrogative(cs.length === 0 ? null : cs.map(c => c.word)));
    }
  }, [currentExercise]);

  const theme = useTheme();
  const sx = useMemo(() => ({
    mt: theme.spacing(1),
  }), [theme]);

  return currentExercise ? <Container >
    <MainForm mainForm={currentExercise.mainForm} />

    <Case caseTitle={caseTitle(currentExercise.exerciseCase)} >

      <FontAwesomeIcon icon={caseIcon(currentExercise.exerciseCase)} />

      {currentExercise.exerciseCase.plurality === GrammarPlurality.PLURAL
        ? <FontAwesomeIcon icon={caseIcon(currentExercise.exerciseCase)} style={CSS_SHIFT_LEFT} />
        : null}

      {currentExercise.exerciseCase.form === GrammarForm.LONG
        ? <span>
&nbsp;
        </span> : null}

      {currentExercise.exerciseCase.form === GrammarForm.LONG
        ? <FontAwesomeIcon icon={faLong} /> : null}
    </Case >

    {interrogative
      ? <Typography align="center" sx={sx} variant="h6">
        {interrogative.join('; ')}
?
      </Typography>
      : null}

    <Variants
      checkVariant={checkVariant}
      correctVariant={currentExercise.exerciseCase.word}
      key={currentExercise.exerciseCase.word}
      nextExercise={nextExercise}
      possibleVariants={possibleVariant} />

    <Grid2 container justifyContent="right" >
      <IconButton aria-label={T`Hint`} color="primary" onClick={toggleHelp} >
        <QuizIcon />
      </IconButton >
    </Grid2 >

    {help ? <Hint columnTitles={hintTitles} >
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
    </Hint > : null}
  </Container >
    : null;
};

export default NounCases;
