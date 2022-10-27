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

const staticDB: Record<string, Case[]> = {
  'Which?': [
    {
      word: 'ко̀јӣ',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀ја̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀је̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    {
      word: 'ко̀је̄г(а)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀је̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀је̄г(а)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative
    {
      word: 'ко̀је̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јо̄ј',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀је̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accuszativ
    {
      word: 'ко̀јӣ 🌱, ко̀је̄г(а)🧍',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јӯ',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀је̄',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: 'ко̀јӣм',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јо̄м',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀јӣм',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: 'ко̀је̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јо̄ј',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀је̄м(у)',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    // nom, pl
    {
      word: 'ко̀јӣ',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀је̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀ја̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    // gen, pl
    {
      word: 'ко̀јӣх',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јӣх',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀јӣх',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative,pl
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accuszativ, pl
    {
      word: 'ко̀је̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀је̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀ја̄',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr, pl
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc, pl
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'ко̀јӣм, ко̀јима',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
  ],
  'What kind?': [
    {
      word: 'какав',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каква',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'какво',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    // gen
    {
      word: 'каква',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'какве',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каква',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative
    {
      word: 'какву',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквој',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'какву',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accuszativ
    {
      word: 'какав 🌱, каква🧍',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'какву',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'какво',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr
    {
      word: 'каквим',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквом',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каквим',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc
    {
      word: 'какву',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквој',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'какву',
      plurality: GrammarPlurality.SINGULAR,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
    // nom, pl
    {
      word: 'какви',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'какве',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каква',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.NOMINATIVE,
      gender: GrammarGender.NEUTER,
    },
    // gen, pl
    {
      word: 'каквих',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквих',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каквих',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.GENITIVE,
      gender: GrammarGender.NEUTER,
    },
    // dative,pl
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.DATIVE,
      gender: GrammarGender.NEUTER,
    },
    // accuszativ, pl
    {
      word: 'какве',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'какве',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каква',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.ACCUSATIVE,
      gender: GrammarGender.NEUTER,
    },
    // instr, pl
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.INSTRUMENTAL,
      gender: GrammarGender.NEUTER,
    },
    // loc, pl
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.MASCULINE,
    },
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.FEMININE,
    },
    {
      word: 'каквим(а)',
      plurality: GrammarPlurality.PLURAL,
      case: GrammarCase.LOCATIVE,
      gender: GrammarGender.NEUTER,
    },
  ],
  'Whose?': [
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
    // accuszativ
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
    // accuszativ, pl
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

class StaticInterrogativesEntry implements Noun {
  mainForm: string;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  cases(): Promise<Case[]> {
    return Promise.resolve(staticDB[this.mainForm]);
  }
}

export class DefaultInterrogativesDb implements NounsDb {
  private wordsSet: string[] | null = null;

  get mainForms(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDB);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getNounByMainForm(word: string): Promise<Noun> {
    return Promise.resolve(new StaticInterrogativesEntry(word));
  }
}
