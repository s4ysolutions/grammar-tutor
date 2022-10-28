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

import React, {ReactNode} from 'react';
import T from '../../../../l10n';
import {Case} from '../../../../tutor';
import ExerciseTitle from '../ExerciseTitle';

const getTitle = (exerciseCase: Case): string => {
  const res: string[] = [T`${exerciseCase.case}`];
  if (exerciseCase.plurality !== undefined) {
    res.push(T`${exerciseCase.plurality}`);
  }
  if (exerciseCase.gender !== undefined) {
    res.push(T`${exerciseCase.gender}`);
  }
  if (exerciseCase.animation !== undefined) {
    res.push(T`${exerciseCase.animation}`);
  }
  if (exerciseCase.form !== undefined) {
    res.push(T`${exerciseCase.form}`);
  }

  return res.join(', ');
};

const CaseTitle: React.FunctionComponent<{exerciseCase: Case, children?: ReactNode[] | ReactNode}> =
  ({exerciseCase, children}): React.ReactElement =>
    <ExerciseTitle title={getTitle(exerciseCase)}>
      {children}
    </ExerciseTitle>;

export default CaseTitle;
