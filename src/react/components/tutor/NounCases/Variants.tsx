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

import {Container, useTheme} from '@mui/material';
import React, {useMemo} from 'react';
import Variant from './Variant';
import log from '../../../../log';

const topSpace = 2;

const Variants: React.FunctionComponent<{ variants: string[], onSelect: (variant: string) => void }> =
  ({variants, onSelect}): React.ReactElement => {
    log.render('Variants');

    const theme = useTheme();
    const sx = useMemo(() => ({
      mt: theme.spacing(topSpace),
    }), [theme]);

    return <Container sx={sx}>
      {variants.shuffle().map(variant => <Variant
        key={variant}
        onClick={() => onSelect(variant)}
        variant={variant} />)}
    </Container >;
  };

export default Variants;
