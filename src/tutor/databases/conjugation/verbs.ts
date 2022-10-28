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


import {GrammarPerson, GrammarPlurality, MainFormWord, Person, Verb, VerbsDb} from '../../index';

const staticDb: Record<MainFormWord, { description?: string, persons: Person[]}> = {
  'морати': {
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
  'говорити': {
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
};

class StaticVerb implements Verb {
  mainForm: string;

  description?: string;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
    this.description = staticDb[this.mainForm].description;
  }

  persons(): Promise<Person[]> {
    return Promise.resolve(staticDb[this.mainForm].persons);
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
