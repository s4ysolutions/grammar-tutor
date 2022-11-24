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

import {Case, GrammarCase, GrammarForm, GrammarPlurality, Noun, NounsDb} from '../../index';

const staticDB: Record<string, Case[]> = {
  'себе': [
    {
      word: 'се',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'се̏бе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'си',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'се̏бе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'се',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'се̏бе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'со̏бо̄м',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'се̏би',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
    },
    // plural
    {
      word: 'се̏бе',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'се̏би',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'се̏бе',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'со̏бом',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'се̏би',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
    },
  ],
};

class StaticReflexivePronounEntry implements Noun {
  mainForm: string;

  rules: [];

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  cases(): Promise<Case[]> {
    return Promise.resolve(staticDB[this.mainForm]);
  }
}

export class DefaultReflexivePronounsDb implements NounsDb {
  private wordsSet: string[] | null = null;

  get mainForms(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDB);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getNounByMainForm(word: string): Promise<Noun> {
    return Promise.resolve(new StaticReflexivePronounEntry(word));
  }
}
