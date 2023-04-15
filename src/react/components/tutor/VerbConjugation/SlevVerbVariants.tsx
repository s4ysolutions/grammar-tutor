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

import React, {useCallback} from 'react';
import Variants from '../Variants';
import diFactory from '../../../../di/default';
import {ConjugationExercise} from '../../../../tutor';
import {SlevVerbPresentRuleId, slevVerbRules, slevVerbRulesMap} from '../../../../tutor/databases/rules/slev-verbs';

const {di} = diFactory;
const tutor = di.tutor;

const variants = slevVerbRules.filter(r => r.id !== SlevVerbPresentRuleId.NONE).map(r => r.description);
const SlevVerbVariants: React.FunctionComponent<{
  currentExercise: ConjugationExercise
  nextExercise: () => void,
}> =
    ({currentExercise, nextExercise}): React.ReactElement => {

      const checkSlevVariant = useCallback(
        (variant: string): Promise<boolean> => tutor.checkConjugationSlevFormExercise(variant, currentExercise),
        [currentExercise],
      );


      return <Variants
        checkVariant={checkSlevVariant}
        correctVariant={slevVerbRulesMap[currentExercise.verb.slevRule].description}
        nextExercise={nextExercise}
        possibleVariants={variants}
      />;
    };

export default SlevVerbVariants;
