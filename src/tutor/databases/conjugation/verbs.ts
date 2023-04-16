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

/* eslint-disable no-magic-numbers */
import {GrammarPerson, GrammarPlurality, MainFormWord, Person, Verb, VerbsDb} from '../../index';
import {SlevVerbPresentRuleId} from '../rules/slev-verbs';

export const svrsheni = 'свршени';
export const nesvrsheni = 'несвршени';
const rules: Record<number, string> = {
  10: '-ати: 1st ➟ [ам], 3rd ➟ [а] / [аjу]',
  20: '-ити, -aти, -ети: 1st ➟ [им], 3rd ➟ [и] / [e]',
  30: '-ати,...: 1st ➟ [eм], 3rd ➟ [e] / [ejу], [у]',
  40: '-овати, -ивати: 1st ➟ [yjeм], 3rd ➟ [yje] / [ejу], [yjу]',
  50: 'моћи',
  100: 'к, ц ➟ ч',
  110: 'г, з ➟ ж',
  120: 'х, с ➟ ш',
  200: svrsheni,
  210: nesvrsheni,
};

const staticDb: Record<MainFormWord, { description?: string, rules: number[], slevRule?: SlevVerbPresentRuleId, persons: Person[]}> = {
  'брисати': {
    rules: [30, 120],
    slevRule: SlevVerbPresentRuleId.EM_U,
    persons: [
      {
        word: 'бришем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'бришеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'брише',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'бришемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'бришете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'бришу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'видети': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'видим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'видиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'види',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'видимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'видите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'виде',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'волети': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'волим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'волиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'воли',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'волимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'волите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'воле',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'гледати': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'гледам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'гледаш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'гледа',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'гледамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'гледате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'гледају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'говорити': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'говорим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'говориш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'говори',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'говоримо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'говорите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'говоре',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'десити': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'десим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'десиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'деси',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'десимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'десите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'десе',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'дешавати': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'дешавам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'дешаваш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'дешава',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'дешавамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'дешавате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'дешавају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'доћи': {
    rules: [],
    slevRule: SlevVerbPresentRuleId.EM_U_CI,
    persons: [
      {
        word: 'дођем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'дођеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'дође',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'дођемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'дођете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'дођу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'звати': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'зовем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зовеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зове',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зовемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'зовете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'зову',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'знати': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'знам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'знаш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зна',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'знамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'знате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'знају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'живети': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'живим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'живиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'живи',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'живимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'живите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'живе',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'ићи': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_U_CI,
    persons: [
      {
        word: 'идем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'идеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'иде',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'идемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'идете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'иду',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'јахати': {
    rules: [30, 120],
    slevRule: SlevVerbPresentRuleId.EM_U,
    persons: [
      {
        word: 'јашем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'јашеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'јаше',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'јашемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'јашете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'јашу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'је̏сти': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'једем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'једеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'једе',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'једемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'једете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'једу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'казати': {
    rules: [30, 110],
    slevRule: SlevVerbPresentRuleId.EM_U,
    persons: [
      {
        word: 'кажем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'кажеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'каже',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'кажемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'кажете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'кажу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'купити': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'купим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'купиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'купи',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'купимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'купите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'купе',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'куповати': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_U_IVATI_OVATI,
    persons: [
      {
        word: 'купујем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'купујеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'купује',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'купујемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'купујете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'купују',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'лагати': {
    rules: [30, 110],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'лажем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'лажеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'лаже',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'лажемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'лажете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'лажу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'лежати': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'лежим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'лежиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'лежи',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'лежимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'лежите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'леже',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'лȅћи': {
    rules: [200],
    slevRule: SlevVerbPresentRuleId.EM_U_CI,
    persons: [
      {
        word: 'легнем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'легнеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'легне',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'легнемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'легнете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'легну',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'морати': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'морам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'мораш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'мора',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'морамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'морате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'морају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'остати': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_U,
    persons: [
      {
        word: 'останем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'останеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'остане',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'останемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'останете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'остану',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'оце́нити': {
    rules: [200],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'оценим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'оцениш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'оцени',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'оценимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'оцените',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'оцене',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'оцењи́вати': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.EM_U_IVATI_OVATI,
    persons: [
      {
        word: 'оцењујем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'оцењујеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'оцењује',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'оцењујемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'оцењујете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'оцењују',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'па̏дати': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'падам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'падаш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пада',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'падамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'падате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'падају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'па̏сти': {
    rules: [200],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'паднем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'паднеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'падне',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'паднемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'паднете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'падну',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'пе̏ћи': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.EM_U_CI,
    persons: [
      {
        word: 'печем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'печеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пече',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'печемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'печете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'пеку',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'писати': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_U,
    persons: [
      {
        word: 'пишем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пишеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пише',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пишемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'пишете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'пишу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'питати': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'питам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'питаш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пита',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'питамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'питате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'питају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'пити': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'пи̏је̄м',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пи̏је̄ш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пи̏је̄',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пи̏је̄мо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'пи̏је̄те',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'пи̏јӯ',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'постати': {
    rules: [30, 200],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'постанем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'постанеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'постане',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'постанемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'постанете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'постану',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'постојати': {
    rules: [10, 210],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'постојим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'постојиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'постоји',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'постојимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'постојите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'постоје',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'прати': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'перем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'переш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'пере',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'перемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'перете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'перу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'продавати': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.EM_U_AVATI,
    persons: [
      {
        word: 'продајем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'продајеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'продаје',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'продајемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'продајете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'продају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'продати': {
    rules: [200],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'продам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'продаш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'прода',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'продамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'продате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'продају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'путовати': {
    rules: [40],
    slevRule: SlevVerbPresentRuleId.EM_U_IVATI_OVATI,
    persons: [
      {
        word: 'путујем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'путујеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'путује',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'путујемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'путујете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'путују',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'разговарати': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'разговарам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разговараш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разговара',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разговарамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'разговарате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'разговарају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'разговорити': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'разговорим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разговориш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разговори',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разговоримо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'разговорите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'разговоре',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'разумети': {
    rules: [30],
    slevRule: SlevVerbPresentRuleId.EM_EJU,
    persons: [
      {
        word: 'разумем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разумеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разуме',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'разумемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'разумете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'разумеју',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'сећати се': {
    rules: [10, 210],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'сећам се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'сећаш се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'сећа се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'сећамо се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'сећате се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'сећају се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'сетити се': {
    rules: [20, 200],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'сетим се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'сетиш се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'сети се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'сетимо се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'сетите се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'сете се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'скакати': {
    rules: [30, 100],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'скачем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'скачеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'скаче',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'скачемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'скачете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'скачу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'смѐјати се': {
    rules: [],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'смејем се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'смејеш се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'смеје се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'смејемо се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'смејете се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'смеју се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'стварати': {
    rules: [10],
    slevRule: SlevVerbPresentRuleId.AM_AJU,
    persons: [
      {
        word: 'стварам',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'ствараш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'ствара',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'стварамо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'стварате',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'стварају',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'створити': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'створим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'створиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'створи',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'створимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'створите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'створе',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'тре̑сти': {
    rules: [],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'тресем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'тресеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'тресе',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'тресемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'тресете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'тресу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'трчати': {
    rules: [20],
    slevRule: SlevVerbPresentRuleId.IM_E,
    persons: [
      {
        word: 'трчим',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'трчиш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'трчи',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'трчимо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'трчите',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'трче',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'чу̏ти': {
    rules: [200, 210],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'чујем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'чујеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'чује',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'чујемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'чујете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'чују',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'утицати': {
    rules: [30, 100],
    slevRule: SlevVerbPresentRuleId.EM_U,
    persons: [
      {
        word: 'утичем',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'утичеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'утиче',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'утичемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'утичете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'утичу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
  'зва̏ти се': {
    rules: [210],
    slevRule: SlevVerbPresentRuleId.EM_U_TI,
    persons: [
      {
        word: 'зовем се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зовеш се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зове се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'зовемо се',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'зовете се',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'зову се',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
};

class StaticVerb implements Verb {
  mainForm: string;

  description?: string;

  slevRule?: SlevVerbPresentRuleId;

  private _rules: string[] | null;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
    const entry = staticDb[this.mainForm];
    this.description = entry.description;
    this.slevRule = entry.slevRule;
    this._rules = null;
  }

  persons(): Promise<Person[]> {
    return Promise.resolve(staticDb[this.mainForm].persons);
  }

  get rules(): string[] {
    if (this._rules === null) {
      const entry = staticDb[this.mainForm];
      this._rules = entry.rules.map(code => rules[code]);
    }
    return this._rules;
  }
}

export class DefaultVerbsDb implements VerbsDb {
  private wordsSet: MainFormWord[] | null = null;

  get mainForms(): Promise<MainFormWord[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDb);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getVerbByMainForm(word: MainFormWord): Promise<Verb> {
    return Promise.resolve(new StaticVerb(word));
  }
}
