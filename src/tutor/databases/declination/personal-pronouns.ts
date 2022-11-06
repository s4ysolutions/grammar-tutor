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

import {Case, GrammarCase, GrammarForm, GrammarGender, GrammarPlurality, Noun, NounsDb} from '../../index';

const staticDB: Record<string, Case[]> = {
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
      word: 'ме̏не',
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
      word: 'ме̏ни',
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
      word: 'ме̏не',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'мно̑м, мно́ме',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'ме̏ни',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
    },
    // plural
    {
      word: 'ми̑',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
    },
    {
      word: 'нас',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'на̑с',
      form: GrammarForm.LONG,
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
      word: 'на̏ма',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'нас',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'на̑с',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'ми̑',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.VOCATIVE,
    },
    {
      word: 'на̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'на̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
    },
  ],
  'ти': [
    // singular
    {
      word: 'ти̑',
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
      word: 'те̏бе',
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
      word: 'те̏би',
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
      word: 'те̏бе',
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
      word: 'то̏бо̄м',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'те̏би',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
    },
    // plural
    {
      word: 'ви̑',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
    },
    {
      word: 'вас',
      form: GrammarForm.SHORT,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
    },
    {
      word: 'ва̑с',
      form: GrammarForm.LONG,
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
      word: 'ва̏ма',
      form: GrammarForm.LONG,
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
    },
    {
      word: 'ва̑с',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
    },
    {
      word: 'ви̑',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.VOCATIVE,
    },
    {
      word: 'ва̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
    },
    {
      word: 'ва̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
    },
  ],
  'он, она, оно': [
    {
      word: 'о̑н',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'о̀на',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'о̀но',
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
      word: 'ње̏га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ње̑',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ње̏га',
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
      word: 'ње̏му',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њо̑ј',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ње̏му',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // accusative
    {
      word: 'га,њ',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ју, је, њу',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'га,њ',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'ње̏га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њу̑',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ње̏га',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: 'њи̑м, њи́ме',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њо̑м, њо́ме',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њи̑м, њи́ме',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: 'ње̏м, ње̏му',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њо̑ј',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ње̏м, ње̏му',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'о̀ни',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'о̀не',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'о̀на',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'их',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'их',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'их',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'њи̑х',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њи̑х',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њи̑х',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // dative
    {
      word: 'им',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'им',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'им',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // accusative
    {
      word: 'их',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'их',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'их',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.SHORT,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'њи̑х',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њи̑х',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њи̑х',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      form: GrammarForm.LONG,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'њи̏ма',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
  ],
};

class StaticPersonalPronounEntry implements Noun {
  mainForm: string;

  rules: [];

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  cases(): Promise<Case[]> {
    return Promise.resolve(staticDB[this.mainForm]);
  }
}

export class DefaultPersonalPronounsDb implements NounsDb {
  private wordsSet: string[] | null = null;

  get mainForms(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDB);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getNounByMainForm(word: string): Promise<Noun> {
    return Promise.resolve(new StaticPersonalPronounEntry(word));
  }
}
