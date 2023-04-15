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
import {Container, IconButton} from '@mui/material';
import Variants from '../Variants';
import diFactory from '../../../../di/default';
import QuizIcon from '@mui/icons-material/Quiz';
import T from '../../../../l10n';
import Grid2 from '@mui/material/Unstable_Grid2';
import {ConjugationExercise, GrammarForm, GrammarPlurality, Lesson} from '../../../../tutor';
import MainForm from '../MainForm';
import PersonTitle from './PersonTitle';
import VerbHint from './VerbHint';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmarksLines as faLong} from '@fortawesome/free-solid-svg-icons';
import PersonIcon from './PersonIcon';
import Pronoun from './Pronoun';
import SlevVerbVariants from './SlevVerbVariants';

const {di} = diFactory;
const tutor = di.tutor;

let variantsKey = 1;

const VerbConjugation: React.FunctionComponent = (): React.ReactElement => {

  const [currentExercise, setCurrentExercise] = useState<ConjugationExercise>(null);

  useEffect(() => {
    tutor.nextConjugationExercise().then(setCurrentExercise);
  }, []);

  const [help, setHelp] = useState(false);
  const toggleHelp = () => setHelp(!help);

  const nextExercise = useCallback(
    () => tutor.nextConjugationExercise().then((nextEx) => {
      setCurrentExercise(nextEx);
    }),
    [setCurrentExercise],
  );

  const checkVariant = useCallback(
    (variant: string): Promise<boolean> => tutor.checkConjugationExercise(variant, currentExercise),
    [currentExercise],
  );

  const possibleVariant = useMemo(() =>
    currentExercise === null ? null : currentExercise.possibleVariants.shuffle(), [currentExercise]);


  return currentExercise ? <Container >
    <MainForm mainForm={currentExercise.mainForm} />

    {tutor.currentLesson !== Lesson.VERBS_CONJUGATION_FORMS && <React.Fragment>
      <PersonTitle exercisePerson={currentExercise.exercisePerson} >

        <PersonIcon />

        {currentExercise.exercisePerson.plurality === GrammarPlurality.PLURAL
          ? <PersonIcon plural />
          : null}

        {currentExercise.exercisePerson.form === GrammarForm.LONG
          ? <span>
&nbsp;
          </span> : null}

        {currentExercise.exercisePerson.form === GrammarForm.LONG
          ? <FontAwesomeIcon icon={faLong} /> : null}
      </PersonTitle>

      <Pronoun exercise={currentExercise} />
    </React.Fragment>}

    {tutor.currentLesson === Lesson.VERBS_CONJUGATION_FORMS &&
        <SlevVerbVariants
          currentExercise={currentExercise}
          key={currentExercise.exercisePerson.word + variantsKey++}
          nextExercise={nextExercise} />}

    {tutor.currentLesson !== Lesson.VERBS_CONJUGATION_FORMS &&
    <Variants
      checkVariant={checkVariant}
      correctVariant={currentExercise.exercisePerson.word}
      key={currentExercise.exercisePerson.word + variantsKey++}
      nextExercise={nextExercise}
      possibleVariants={possibleVariant} />}

    <Grid2 container justifyContent="right" >
      <IconButton aria-label={T`Hint`} color="primary" onClick={toggleHelp} >
        <QuizIcon />
      </IconButton >
    </Grid2 >

    {help ? <VerbHint exercise={currentExercise} /> : null}
  </Container >
    : null;
};

export default VerbConjugation;
