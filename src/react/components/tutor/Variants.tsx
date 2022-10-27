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
import React, {memo, useMemo, useState} from 'react';
import Variant, {Status} from './Variant';
import Grid2 from '@mui/material/Unstable_Grid2';

const topSpace = 2;
export const DELAY_WRONG = 1500;
export const DELAY_CORRECT = 500;


const Variants: React.FunctionComponent<{
  checkVariant: (variant: string) => Promise<boolean>,
  nextExercise: () => void,
  correctVariant: string,
  possibleVariants: string[]
}> =
  ({checkVariant, possibleVariants, nextExercise, correctVariant}): React.ReactElement => {

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
    }), [theme]);

    const [correct, setCorrect] = useState<string | null>(null);
    const [wrong, setWrong] = useState<string | null>(null);
    const [hint, setHint] = useState<string | null>(null);

    const handleClick = (variant: string): void => {
      checkVariant(variant).then(result => {
        if (result) {
          setCorrect(variant);
          setWrong(null);
          setHint(null);
          setTimeout(nextExercise, DELAY_CORRECT);
        } else {
          setCorrect(null);
          setWrong(variant);
          setHint(correctVariant);
          setTimeout(nextExercise, DELAY_WRONG);
        }
      });
    };
    // handleAttempt(variant, setCorrect, setWrong, setHint).then() as unknown as void;

    return <Grid2 container justifyContent="center" sx={sx}>
      { possibleVariants.map(variant => <Variant
        key={variant}
        onClick={handleClick}
        status={variant === correct ? Status.CORRECT : variant === wrong ? Status.WRONG : variant === hint ? Status.HINT : Status.NONE}
        variant={variant} />)}
    </Grid2 >;
  };

export default memo(Variants);
