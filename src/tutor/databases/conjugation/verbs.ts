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

const rules: Record<number, string> = {
  10: '-ати: 1st ➟ [ам], 3rd ➟ [а] / [аjу]',
  20: '-ити, -aти, -ети: 1st ➟ [им], 3rd ➟ [и] / [e]',
  30: '-ати,...: 1st ➟ [eм], 3rd ➟ [e] / [ejу], [у]',
  40: '-овати, -ивати: 1st ➟ [yjeм], 3rd ➟ [yje] / [ejу], [yjу]',
  50: 'моћи',
  100: 'к, ц ➟ ч',
  110: 'г, з ➟ ж',
  120: 'х, с ➟ ш',
};

const staticDb: Record<MainFormWord, { description?: string, rules: number[], persons: Person[]}> = {
  'морати': {
    rules: [10],
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
  'гледати': {
    rules: [10],
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
  'разумети': {
    rules: [30],
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
  'звати': {
    rules: [30],
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
  'живети': {
    rules: [20],
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
  'трчати': {
    rules: [20],
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
  'лежати': {
    rules: [20],
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
  'волети': {
    rules: [20],
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
  'писати': {
    rules: [30],
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
  'скакати': {
    rules: [30, 100],
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
  'утицати': {
    rules: [30, 100],
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
  'лагати': {
    rules: [30, 110],
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
  'казати': {
    rules: [30, 110],
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
  'јахати': {
    rules: [30, 120],
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
  'брисати': {
    rules: [30, 120],
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
  'путовати': {
    rules: [40],
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
  'ићи': {
    rules: [30],
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
  'доћи': {
    rules: [30],
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
  'пити': {
    rules: [30],
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
  'продавати': {
    rules: [30],
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
  'прати': {
    rules: [30],
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
  'моћи': {
    rules: [],
    persons: [
      {
        word: 'могу',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'можеш',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'може',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.SINGULAR,
      },
      {
        word: 'можемо',
        person: GrammarPerson.FIRST,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'можете',
        person: GrammarPerson.SECOND,
        plurality: GrammarPlurality.PLURAL,
      },
      {
        word: 'могу',
        person: GrammarPerson.THIRD,
        plurality: GrammarPlurality.PLURAL,
      },
    ],
  },
};

class StaticVerb implements Verb {
  mainForm: string;

  description?: string;

  private _rules: string[] | null;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
    this.description = staticDb[this.mainForm].description;
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
