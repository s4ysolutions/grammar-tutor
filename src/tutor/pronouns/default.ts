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

import {GrammarCase, GrammarForm, GrammarGender, GrammarPlurality, Noun, NounCase, NounsDB} from '../index';

const staticPronouns: Record<string, NounCase[]> = {
  'ја': [
    // singular
    {
      word: 'ја',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
    },
    {
      word: 'ме',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'мене',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'ми',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'мени',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'ме',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'мене',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'мном',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'мени',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
    },
    // plural
    {
      word: 'ми',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
    },
    {
      word: 'нас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'нам',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'нама',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'нас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'нама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'нама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
    },
  ],
  'ти': [
    // singular
    {
      word: 'ти',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
    },
    {
      word: 'те',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'тебе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'ти',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'тебе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'те',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'тебе',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'ти',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.VOCATIVE,
    },
    {
      word: 'тобом',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'тебе',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
    },
    // plural
    {
      word: 'ви',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
    },
    {
      word: 'вас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'вам',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'вама',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'вас',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'ви',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.VOCATIVE,
    },
    {
      word: 'вама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'вама',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
    },
  ],
  'он, она, оно': [
    {
      word: 'он',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'она',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'оно',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'је',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'њега',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ње',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њега',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // dative
    {
      word: 'му',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'јој',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'му',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'њему',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њој',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њему',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // accuszativ
    {
      word: 'га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ју, је',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'њега',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њу',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њега',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: 'њим',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њом',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њим',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: 'њему',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њој',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њему',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
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

export class DefaultPronounsDb implements NounsDB {
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
