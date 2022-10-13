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

import {GrammarCase, GrammarForm, GrammarPlurality, Noun, NounCase, NounsDB} from '../index';

const staticPronouns: Record<string, NounCase[]> = {
  'ја': [
    // singular
    {
      word: 'ја',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Nominative,
    },
    {
      word: 'ме',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Genitive,
    },
    {
      word: 'мене',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Genitive,
    },
    {
      word: 'ми',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Dative,
    },
    {
      word: 'мени',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Dative,
    },
    {
      word: 'ме',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Accusative,
    },
    {
      word: 'мене',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Accusative,
    },
    {
      word: 'мном',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Instrumental,
    },
    {
      word: 'мени',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Locative,
    },
    // plural
    {
      word: 'ми',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Nominative,
    },
    {
      word: 'нас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Genitive,
    },
    {
      word: 'нам',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Dative,
    },
    {
      word: 'нама',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Dative,
    },
    {
      word: 'нас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Accusative,
    },
    {
      word: 'нама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Instrumental,
    },
    {
      word: 'нама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Locative,
    },
  ],
  'ти': [
    // singular
    {
      word: 'ти',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Nominative,
    },
    {
      word: 'те',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Genitive,
    },
    {
      word: 'тебе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Genitive,
    },
    {
      word: 'ти',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Dative,
    },
    {
      word: 'тебе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Dative,
    },
    {
      word: 'те',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Accusative,
    },
    {
      word: 'тебе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Accusative,
    },
    {
      word: 'ти',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Vocative,
    },
    {
      word: 'тобом',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Instrumental,
    },
    {
      word: 'тебе',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.Locative,
    },
    // plural
    {
      word: 'ви',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Nominative,
    },
    {
      word: 'вас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Genitive,
    },
    {
      word: 'вам',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Dative,
    },
    {
      word: 'вама',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Dative,
    },
    {
      word: 'вас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Accusative,
    },
    {
      word: 'ви',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Vocative,
    },
    {
      word: 'вама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Instrumental,
    },
    {
      word: 'вама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.Locative,
    },
  ],
};

class StaticPronounEntry implements Noun {
  mainForm: string;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  cases(): Promise<NounCase[]> {
    return Promise.resolve(staticPronouns[this.mainForm]);
  }
}

export class DefaultPronounsDB implements NounsDB {
  private wordsSet: string[] | null = null;

  get words(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticPronouns);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getNoun(word: string): Promise<Noun> {
    return Promise.resolve(new StaticPronounEntry(word));
  }

}
