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

import {Case, GrammarCase, GrammarGender, GrammarPlurality, Noun, NounsDb} from '../../index';
import T from '../../../l10n';

const staticDB: Record<string, Case[]> = {
  [T`чији?`]: [
    {
      word: 'чѝјӣ',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝја̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝје̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    // gen
    {
      word: 'чѝје̄г(а)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝје̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝје̄г(а)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative
    {
      word: 'чѝје̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјо̄ј',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝје̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accusative
    {
      word: 'чѝјӣ 🌱, чѝје̄г(а)🧍',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјӯ',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝје̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: 'чѝјӣм',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјо̄м',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝјӣм',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: 'чѝје̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјо̄ј',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝје̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    // nom, pl
    {
      word: 'чѝјӣ',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝје̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝја̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    // gen, pl
    {
      word: 'чѝјӣх',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјӣх',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝјӣх',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative,pl
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accusative, pl
    {
      word: 'чѝје̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝје̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝја̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr, pl
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc, pl
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'чѝјӣм, чѝјима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
  ],
};

class StaticPossessiveEntry implements Noun {
  mainForm: string;

  rules: [];

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  cases(): Promise<Case[]> {
    return Promise.resolve(staticDB[this.mainForm]);
  }
}

export class DefaultPossessivePronounsDb implements NounsDb {
  private wordsSet: string[] | null = null;

  get mainForms(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDB);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getNounByMainForm(word: string): Promise<Noun> {
    return Promise.resolve(new StaticPossessiveEntry(word));
  }
}
