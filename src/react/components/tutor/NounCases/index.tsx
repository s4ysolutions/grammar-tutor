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

import React, {useCallback, useMemo, useState} from 'react';
import {Container, IconButton} from '@mui/material';
import usePromise from '../../../hooks/usePromise';
import {NounCaseExercise} from '../../../../tutor';
import Noun from './Noun';
import Variants from './Variants';
import log from '../../../../log';
import Case from './Case';
import {getDi} from '../../../../di/default';
import Hint from './Hint';
import QuizIcon from '@mui/icons-material/Quiz';
import T from '../../../../l10n';
import Grid2 from '@mui/material/Unstable_Grid2';

const di = getDi();
const tutor = di.tutor;
const exerciseIssuer = tutor.nextPronounExersizeSelectWord.bind(tutor);

const NounCases: React.FunctionComponent = (): React.ReactElement => {
  log.render('NounCases');

  const [currentExercise, nextExercise] =
    usePromise<NounCaseExercise | null>(exerciseIssuer, null, 'NounCases');

  const [help, setHelp] = useState(false);

  const toggleHelp = useCallback(() => setHelp(!help), [help, setHelp]);

  const possibleVariant = useMemo(() =>
    currentExercise === null ? null : currentExercise.possibleVariants.shuffle(), [currentExercise]);
  return <Container >
    {currentExercise ? <React.Fragment >
      <Noun noun={currentExercise.mainForm} />

      <Case exerciseCase={currentExercise.exerciseCase} />

      <Variants
        exercise={currentExercise}
        nextExercise={nextExercise}
        possibleVariants={possibleVariant} />

      <Grid2 container justifyContent="right">
        <IconButton aria-label={T`Hint`} color="primary" onClick={toggleHelp}>
          <QuizIcon />
        </IconButton >
      </Grid2>

      {help ? <Hint exerciseCase={currentExercise.exerciseCase} word={currentExercise.mainForm} /> : null}
    </React.Fragment >
      : null}

  </Container >;
};

export default NounCases;
