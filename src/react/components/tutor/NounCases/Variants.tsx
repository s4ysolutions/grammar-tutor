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

import {useTheme} from '@mui/material';
import React, {memo, useCallback, useMemo, useState} from 'react';
import Variant, {Status} from './Variant';
import log from '../../../../log';
import {NounCaseExercise} from '../../../../tutor';
import Grid2 from '@mui/material/Unstable_Grid2';
import {getDi} from '../../../../di/default';

const topSpace = 2;
const tutor = getDi().tutor;

const DELAY_WRONG = 1000;
const DELAY_CORRECT = 500;

const Variants: React.FunctionComponent<{ exercise: NounCaseExercise, possibleVariants: string[], nextExercise: () => void }> =
  ({exercise, possibleVariants, nextExercise}): React.ReactElement => {
    log.render(`Variants ${exercise.mainForm}`);

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
    }), [theme]);

    const [correct, setCorrect] = useState<string | null>(null);
    const [wrong, setWrong] = useState<string | null>(null);
    const [hint, setHint] = useState<string | null>(null);

    const handleClick = useCallback((variant: string): void => {
      tutor.checkNounCaseAnswer(variant, exercise).then((result) => {
        if (result) {
          setCorrect(variant);
          setWrong(null);
          setHint(null);
          setTimeout(nextExercise, DELAY_CORRECT);
        } else {
          setCorrect(null);
          setWrong(variant);
          setHint(exercise.exerciseCase.word);
          setTimeout(nextExercise, DELAY_WRONG);
        }
      });
    }, [exercise, nextExercise]);

    return <Grid2 container justifyContent="center" sx={sx}>
      { possibleVariants.map(variant => <Variant
        key={variant}
        onClick={handleClick}
        status={variant === correct ? Status.CORRECT : variant === wrong ? Status.WRONG : variant === hint ? Status.HINT : Status.NONE}
        variant={variant} />)}
    </Grid2 >;
  };

export default memo(Variants);
