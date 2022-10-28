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

import React, {useMemo} from 'react';
import {Typography, useTheme} from '@mui/material';
import {ConjugationExercise, GrammarPerson, GrammarPlurality, Person} from '../../../../tutor';

const getPronoun = (exercisePerson: Person): string => {
  if (exercisePerson.person === GrammarPerson.FIRST) {
    if (exercisePerson.plurality === GrammarPlurality.SINGULAR) {
      return 'ја';
    }
    return 'ми̑';

  }
  if (exercisePerson.person === GrammarPerson.SECOND) {
    if (exercisePerson.plurality === GrammarPlurality.SINGULAR) {
      return 'ти̑';
    }
    return 'ви̑';

  }
  if (exercisePerson.person === GrammarPerson.THIRD) {
    if (exercisePerson.plurality === GrammarPlurality.SINGULAR) {
      return 'о̑н, о̀на, о̀но';
    }
    return 'о̀ни, о̀не, о̀на';
  }

  return '';
};

const Pronoun: React.FunctionComponent<{exercise: ConjugationExercise | null}> =
  ({exercise}): React.ReactElement | null => {

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(1),
    }), [theme]);

    return <Typography align="center" sx={sx} variant="h4">
      {getPronoun(exercise.exercisePerson)}
    </Typography>;
  };

export default Pronoun;
