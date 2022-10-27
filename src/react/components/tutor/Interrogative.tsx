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

import React, {useEffect, useMemo, useState} from 'react';
import {CaseExercise} from '../../../tutor';
import diFactory from '../../../di/default';
import {Typography, useTheme} from '@mui/material';

const {di} = diFactory;
const interrogativePronounsDb = di.caseInterrogativesDb;

const Interrogative: React.FunctionComponent<{exercise: CaseExercise | null}> =
  ({exercise}): React.ReactElement | null => {
    const [interrogative, setInterrogative] = useState<string[] | null>(null);

    useEffect(() => {
      if (exercise === null) {
        setInterrogative(null);
      } else {
        interrogativePronounsDb.getInterrogativeForCase(exercise.exerciseCase.case)
          .then(cs => setInterrogative(cs.length === 0 ? null : cs.map(c => c.word)));
      }
    }, [exercise]);

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(1),
    }), [theme]);

    return interrogative
      ? <Typography align="center" sx={sx} variant="h6">
        {interrogative.join('; ')}
      </Typography>
      : null;
  };

export default Interrogative;
