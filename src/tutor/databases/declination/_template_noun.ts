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

import {Case, GrammarCase, GrammarGender, GrammarPlurality, MainFormWord} from '../../index';

const staticNouns: Record<MainFormWord, Case[]> = {
  'template': [
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accusative
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    // nom, pl
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    // gen, pl
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative,pl
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accusative, pl
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr, pl
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc, pl
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
  ],
  'masculine': [
    {
      word: 'hotel',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.VOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.VOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
  ],
  'neuter': [
    {
      word: 'hotel',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.VOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.VOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    {
      word: '',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
  ],
};

export default staticNouns;
