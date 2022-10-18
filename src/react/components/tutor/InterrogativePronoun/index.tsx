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
import {Container, IconButton, TableCell, TableRow} from '@mui/material';
import log from '../../../../log';
import {getDi} from '../../../../di/default';
import QuizIcon from '@mui/icons-material/Quiz';
import T from '../../../../l10n';
import Grid2 from '@mui/material/Unstable_Grid2';
import {
  GrammarAnimation,
  GrammarCase,
  InterrogativePronounCase,
  InterrogativePronounCaseExercise,
} from '../../../../tutor';
import MainForm from '../MainForm';
import Case from '../Case';
import Variants from '../Variants';
import Hint from '../Hint';
import {CSS_CAPITALIZE} from '../constants';

const di = getDi();
const tutor = di.tutor;
const interrogativePronounsDb = di.interrogativePronounsDb;

const caseTitle = (exerciseCase: InterrogativePronounCase) => {
  const caseName = T`${exerciseCase.case}`;

  if (exerciseCase.animation) {
    const animationName = T`${exerciseCase.animation}`;
    return `${animationName}, ${caseName}`;
  }

  return `${caseName}`;
};

const getCase = (cases: InterrogativePronounCase[], caseKey: string, p: GrammarAnimation): string => {
  const c = GrammarCase[caseKey as keyof typeof GrammarCase];
  return cases.filter(e => e.animation === p && e.case === c).map(e => e.word)
    .join(' | ');
};

const hintTitles = [T`${GrammarAnimation.ANIMATE}`, T`${GrammarAnimation.INANIMATE}`];

const InterrogativePronoun: React.FunctionComponent = (): React.ReactElement => {
  log.render('InterrogativePronoun');

  const [currentExercise, setCurrentExercise] = useState<InterrogativePronounCaseExercise>(null);
  useEffect(() => {
    tutor.nextInterrogativePronounExersizeSelectWord().then(setCurrentExercise);
  }, []);

  const nextExercise = () => tutor.nextInterrogativePronounExersizeSelectWord().then(setCurrentExercise);

  const checkVariant = useCallback(
    (variant: string): Promise<boolean> => tutor.checkInterrogativePronounCaseAnswer(variant, currentExercise),
    [currentExercise],
  );

  const [cases, setCases] = useState<InterrogativePronounCase[] | null>(null);

  const [help, setHelp] = useState(false);

  const toggleHelp = useCallback(() => {
    const nextHelp = !help;
    setHelp(!help);
    if (nextHelp && cases === null) {
      interrogativePronounsDb.getPronoun(currentExercise.mainForm)
        .then(noun => noun.cases())
        // TODO: add setting to filter
        .then(cs =>
          setCases(cs === null ? [] : cs));
    }
  }, [help, cases, setHelp, currentExercise?.mainForm, setCases]);

  const possibleVariant = useMemo(() =>
    currentExercise === null ? null : currentExercise.possibleVariants.shuffle(), [currentExercise]);

  return currentExercise ? <Container >
    <MainForm mainForm={currentExercise.mainForm} />

    <Case caseTitle={caseTitle(currentExercise.exerciseCase)} />

    <Variants
      checkVariant={checkVariant}
      correctVariant={currentExercise.exerciseCase.word}
      nextExercise={nextExercise}
      possibleVariants={possibleVariant} />

    <Grid2 container justifyContent="right">
      <IconButton aria-label={T`Hint`} color="primary" onClick={toggleHelp}>
        <QuizIcon />
      </IconButton >
    </Grid2>

    {help ? <Hint columnTitles={hintTitles} >
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
    </Hint> : null}
  </Container >
    : null;
};

export default InterrogativePronoun;
