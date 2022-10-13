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

import React from 'react';
import {Container, Typography} from '@mui/material';
import T from '../../../../l10n';
import {getTutor} from '../../../../di';
import usePromise from '../../../hooks/usePromise';
import {Noun} from '../../../../tutor';

const tutor = getTutor();

const Cases: React.FunctionComponent = (): React.ReactElement => {
  const [currentNoun, nextNoun] = usePromise<Noun | null>(tutor.nextPronoun(), null)
  <Container >

  </Container >;
}

export default Cases;