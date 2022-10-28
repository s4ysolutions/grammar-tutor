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


import {GrammarForm, GrammarPerson, GrammarPlurality, MainFormWord, Person, Verb, VerbsDb} from '../../index';

const staticDb: Record<MainFormWord, Person[]> = {
  'хтети': [
    {
      word: 'ћу',
      person: GrammarPerson.FIRST,
      plurality: GrammarPlurality.SINGULAR,
      form: GrammarForm.SHORT,
    },
    {
      word: 'хоћу',
      person: GrammarPerson.FIRST,
      plurality: GrammarPlurality.SINGULAR,
      form: GrammarForm.LONG,
    },
    {
      word: 'ћеш',
      person: GrammarPerson.SECOND,
      plurality: GrammarPlurality.SINGULAR,
      form: GrammarForm.SHORT,
    },
    {
      word: 'хоћеш',
      person: GrammarPerson.SECOND,
      plurality: GrammarPlurality.SINGULAR,
      form: GrammarForm.LONG,
    },
    {
      word: 'ће',
      person: GrammarPerson.THIRD,
      plurality: GrammarPlurality.SINGULAR,
      form: GrammarForm.SHORT,
    },
    {
      word: 'хоће',
      person: GrammarPerson.THIRD,
      plurality: GrammarPlurality.SINGULAR,
      form: GrammarForm.LONG,
    },
    {
      word: 'ћемо',
      person: GrammarPerson.FIRST,
      plurality: GrammarPlurality.PLURAL,
      form: GrammarForm.SHORT,
    },
    {
      word: 'хоћемо',
      person: GrammarPerson.FIRST,
      plurality: GrammarPlurality.PLURAL,
      form: GrammarForm.LONG,
    },
    {
      word: 'ћете',
      person: GrammarPerson.SECOND,
      plurality: GrammarPlurality.PLURAL,
      form: GrammarForm.SHORT,
    },
    {
      word: 'хоћете',
      person: GrammarPerson.SECOND,
      plurality: GrammarPlurality.PLURAL,
      form: GrammarForm.LONG,
    },
    {
      word: 'ће',
      person: GrammarPerson.THIRD,
      plurality: GrammarPlurality.PLURAL,
      form: GrammarForm.SHORT,
    },
    {
      word: 'хоће',
      person: GrammarPerson.THIRD,
      plurality: GrammarPlurality.PLURAL,
      form: GrammarForm.LONG,
    },
  ],
};

class StaticHtetiVerb implements Verb {
  mainForm: string;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  persons(): Promise<Person[]> {
    return Promise.resolve(staticDb[this.mainForm]);
  }
}

export class DefaultHtetiDb implements VerbsDb {
  private wordsSet: MainFormWord[] | null = null;

  get mainForms(): Promise<MainFormWord[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDb);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getVerbByMainForm(word: MainFormWord): Promise<Verb> {
    return Promise.resolve(new StaticHtetiVerb(word));
  }
}
