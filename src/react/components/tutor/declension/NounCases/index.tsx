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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Container, IconButton} from '@mui/material';
import Variants from '../../Variants';
import CaseTitle from '../CaseTitle';
import diFactory from '../../../../../di/default';
import QuizIcon from '@mui/icons-material/Quiz';
import T from '../../../../../l10n';
import Grid2 from '@mui/material/Unstable_Grid2';
import {CaseExercise, GrammarForm, GrammarPlurality} from '../../../../../tutor';
import MainForm from '../../MainForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmarksLines as faLong} from '@fortawesome/free-solid-svg-icons';
import CaseIcon from '../CaseIcon';
import Interrogative from '../Interrogative';
// import SlevDescription from '../SlevDescription';
import NounHint from './NounHint';
import Description from '../../Description';
import SlevPreps from '../SlevPreps';

const {di} = diFactory;
const tutor = di.tutor;

let variantsKey = 1;

const NounCases: React.FunctionComponent = (): React.ReactElement => {

  const [currentExercise, setCurrentExercise] = useState<CaseExercise>(null);
  useEffect(() => {
    tutor.nextCaseExercise().then(setCurrentExercise);
  }, []);


  const [help, setHelp] = useState(false);
  const toggleHelp = () => setHelp(!help);

  const nextExercise = useCallback(
    () => tutor.nextCaseExercise().then((nextEx) => {
      setCurrentExercise(nextEx);
    }),
    [setCurrentExercise],
  );

  const checkVariant = useCallback(
    (variant: string): Promise<boolean> => tutor.checkCaseExercise(variant, currentExercise),
    [currentExercise],
  );

  const possibleVariant = useMemo(() =>
    currentExercise === null ? null : currentExercise.possibleVariants.shuffle(), [currentExercise]);


  return currentExercise ? <Container >
    <MainForm mainForm={currentExercise.mainForm} />

    <CaseTitle exerciseCase={currentExercise.exerciseCase} >

      <CaseIcon exerciseCase={currentExercise.exerciseCase} />

      {currentExercise.exerciseCase.plurality === GrammarPlurality.PLURAL
        ? <CaseIcon exerciseCase={currentExercise.exerciseCase} plural />
        : null}

      {currentExercise.exerciseCase.form === GrammarForm.LONG
        ? <span >
&nbsp;
        </span > : null}

      {currentExercise.exerciseCase.form === GrammarForm.LONG
        ? <FontAwesomeIcon icon={faLong} /> : null}
    </CaseTitle >

    <Interrogative exercise={currentExercise} />

    <Variants
      checkVariant={checkVariant}
      correctVariant={currentExercise.exerciseCase.word}
      key={currentExercise.exerciseCase.word + variantsKey++}
      nextExercise={nextExercise}
      possibleVariants={possibleVariant} />

    {currentExercise.noun.description ? <Description withDescription={currentExercise.noun} /> : null}

    <Grid2 container justifyContent="right" >
      <IconButton aria-label={T`Hint`} color="primary" onClick={toggleHelp} >
        <QuizIcon />
      </IconButton >
    </Grid2 >

    {help ? <NounHint exercise={currentExercise} /> : null}

    <SlevPreps exercise={currentExercise} />
  </Container >
    : null;
};

export default NounCases;
