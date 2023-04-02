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

const staticDb: Record<MainFormWord, Person[]> = {
  'моћи': [
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
};

class StaticMociVerb implements Verb {
  mainForm: string;

  rules: [];

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  persons(): Promise<Person[]> {
    return Promise.resolve(staticDb[this.mainForm]);
  }
}

export class DefaultMociDb implements VerbsDb {
  private wordsSet: MainFormWord[] | null = null;

  get mainForms(): Promise<MainFormWord[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDb);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getVerbByMainForm(word: MainFormWord): Promise<Verb> {
    return Promise.resolve(new StaticMociVerb(word));
  }
}
