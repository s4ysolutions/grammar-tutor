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
import {Case, GrammarAnimation, GrammarGender, GrammarPlurality} from '../../../tutor';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloud, faPerson as faMan, faTree, faPersonDress as faWoman} from '@fortawesome/free-solid-svg-icons';

export const CSS_SHIFT_LEFT = {position: 'relative', marginLeft: -10, opacity: 0.7} as React.CSSProperties;

const CaseIcon: React.FunctionComponent<{exerciseCase: Case, plural?: boolean}> = ({exerciseCase, plural}): React.ReactElement | null => {
  const style = plural ? CSS_SHIFT_LEFT : {};
  // has gender return man/woman/cloud
  if (exerciseCase.gender === GrammarGender.NEUTER) {
    return <FontAwesomeIcon icon={faCloud} style={style} />;
  } else if (exerciseCase.gender === GrammarGender.FEMININE) {
    return <FontAwesomeIcon icon={faWoman} style={style} />;
  } else if (exerciseCase.gender === GrammarGender.MASCULINE) {
    return <FontAwesomeIcon icon={faMan} style={style} />;
  }
  // has plurality return man/tree
  if (exerciseCase.plurality === GrammarPlurality.PLURAL || exerciseCase.plurality === GrammarPlurality.SINGULAR) {
    if (exerciseCase.animation === GrammarAnimation.INANIMATE) {
      return <FontAwesomeIcon icon={faTree} style={style} />;
    }
    return <FontAwesomeIcon icon={faMan} style={style} />;
  }
  // has animation return man/tree
  if (exerciseCase.animation === GrammarAnimation.ANIMATE) {
    return <FontAwesomeIcon icon={faMan} style={style} />;
  }
  if (exerciseCase.animation === GrammarAnimation.INANIMATE) {
    return <FontAwesomeIcon icon={faTree} style={style} />;
  }
  return null;
};

export default CaseIcon;
