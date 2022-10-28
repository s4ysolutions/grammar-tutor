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

import {
  Case,
  GrammarAnimation,
  GrammarCase,
  GrammarGender,
  GrammarPlurality,
  MainFormWord,
  Noun,
  NounsDb,
} from '../../index';

const staticDb: Record<MainFormWord, {
  description?: string | number,
  gender: GrammarGender,
  animation: GrammarAnimation,
  singular: {
    nominative: string,
    genitive: string,
    dative: string,
    accusative: string,
    vocative: string,
    instrumental: string,
    locative: string,
  },
  plural: {
    nominative: string,
    genitive: string,
    dative: string,
    accusative: string,
    vocative: string,
    instrumental: string,
    locative: string,
  },
}> = {
  'хотел': {
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'хо̀тел',
      genitive: 'хотѐла',
      dative: 'хотелу',
      accusative: 'хотел',
      vocative: 'хотеле',
      instrumental: 'хотелом',
      locative: 'хотелу',
    },
    plural: {
      nominative: 'хотели',
      genitive: 'хотела',
      dative: 'хотелима',
      accusative: 'хотеле',
      vocative: 'хотели',
      instrumental: 'хотелима',
      locative: 'хотелима',
    },
  },
  'путник': {
    description: 'ки ➟ ци',
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'пу̑тнӣк',
      genitive: 'путника',
      dative: 'путнику',
      accusative: 'путника',
      vocative: 'пу̑тнӣче',
      instrumental: 'путником',
      locative: 'путнику',
    },
    plural: {
      nominative: 'пу̑тнӣци',
      genitive: 'путника',
      dative: 'путницима',
      accusative: 'путнике',
      vocative: 'путници',
      instrumental: 'путницима',
      locative: 'путницима',
    },
  },
  'море': {
    gender: GrammarGender.NEUTER,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'море',
      genitive: 'мора',
      dative: 'мору',
      accusative: 'море',
      vocative: 'море',
      instrumental: 'морем',
      locative: 'мору',
    },
    plural: {
      nominative: 'мора',
      genitive: 'мора',
      dative: 'морима',
      accusative: 'мора',
      vocative: 'мора',
      instrumental: 'морима',
      locative: 'морима',
    },
  },
};

class StaticNounEntry implements Noun {
  mainForm: string;

  description: string;

  private _cases: Case[] | null;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
    this.description = staticDb[this.mainForm].description?.toString();
    this._cases = null;
  }

  cases(): Promise<Case[]> {
    if (this._cases === null) {
      const entry = staticDb[this.mainForm];
      this._cases = [];
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.NOMINATIVE,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.nominative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.GENITIVE,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.genitive,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.DATIVE,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.dative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.ACCUSATIVE,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.accusative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.VOCATIVE,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.vocative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.INSTRUMENTAL,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.instrumental,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.LOCATIVE,
        plurality: GrammarPlurality.SINGULAR,
        word: entry.singular.locative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.NOMINATIVE,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.nominative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.GENITIVE,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.genitive,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.DATIVE,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.dative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.ACCUSATIVE,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.accusative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.VOCATIVE,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.vocative,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.INSTRUMENTAL,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.instrumental,
      });
      this._cases.push({
        animation: entry.animation,
        gender: entry.gender,
        case: GrammarCase.LOCATIVE,
        plurality: GrammarPlurality.PLURAL,
        word: entry.plural.locative,
      });
    }
    return Promise.resolve(this._cases);
  }
}

export class DefaultNounsDb implements NounsDb {
  private wordsSet: string[] | null = null;

  get mainForms(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticDb);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getNounByMainForm(word: string): Promise<Noun> {
    return Promise.resolve(new StaticNounEntry(word));
  }
}
