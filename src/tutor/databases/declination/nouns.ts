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

/* eslint-disable no-magic-numbers */
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

const rules: Record<number, string> = {
  10: 'nom: masc. ➟ soft:[цчћџљњшж]',
  15: 'nom: masc. ➟ hard',
  20: 'nom: neut. ➟ [ое]',
  30: 'nom: fem. ➟ [а]',
  35: 'nom: fem. ➟ consonant',
  40: 'nom: masc.pl. ➟ [i]',
  43: 'nom: masc.pl.short,hard ➟ [ови]',
  46: 'nom: masc.pl.short,soft ➟ [еви]',
  50: 'nom: neut.pl. ➟ [a]',
  60: 'nom: fem.pl ➟ [e]',
  70: 'nom: fem.+[consonant].pl ➟ [i]',

  100: 'gen: masc. ➟ [a]',
  110: 'gen: neut. ➟ [a]',
  120: 'gen: fem. ➟ [e]',
  130: 'gen: pl. ➟ [a]',

  200: 'dat: masc. ➟ [u]',
  210: 'dat: neut. ➟ [u]',
  220: 'dat: fem.+[-a] ➟ [i]',
  230: 'dat: fem.+[consonant] ➟ [i]',
  240: 'dat: masc.pl ➟ [imu]',
  250: 'dat: neut.pl ➟ [imu]',
  260: 'dat: fem.pl.+[-a] ➟ [ama]',
  270: 'dat: fem.pl.+[consonant] ➟ [ima]',

  300: 'acc: masc. inanim. ➟ nom.',
  310: 'acc: masc. anim. ➟ gen.',
  320: 'acc: neut. ➟ nom.',
  330: 'acc: fem.+[-a], ➟ [u]',
  340: 'acc: fem.+[consonant] ➟ nom.',
  350: 'acc: masc.pl. ➟ [e]',
  360: 'acc: neut.pl. ➟ nom.pl.',
  370: 'acc: fem.pl. ➟ nom.pl.',

  400: 'voc: masc.+hard ➟ [e]',
  410: 'voc: masc.+soft ➟ [u]',
  420: 'voc: neut. -',
  430: 'voc: fem.+[a] ➟ [o]',
  440: 'voc: fem.+[ca] ➟ [e]',
  450: 'voc: fem.+[consonant] ➟ [i]',
  460: 'voc: pl. -',

  500: 'loc: ➟ prep. + dat.',
  510: 'loc: adjective ➟ prep. + [оj]',

  610: 'instr: sing. ➟ [om]',
  620: 'instr: pl. ➟ prep. + dat',

  2000: 'к+и ➟ ци',
  2010: 'г+и ➟ зи',
};

const staticDb: Record<MainFormWord, {
  description?: string,
  rules?: number[],
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
    rules: [15, 40, 100, 130, 200, 240, 300, 350, 400, 500, 610, 620],
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
  'кишобран': {
    rules: [15, 40, 100, 130, 200, 240, 300, 350, 400, 500, 610, 620],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'кишобран',
      genitive: 'кишобрана',
      dative: 'кишобрану',
      accusative: 'кишобран',
      vocative: 'кишобране',
      instrumental: 'кишобраном',
      locative: 'кишобрану',
    },
    plural: {
      nominative: 'кишобрани',
      genitive: 'кишобрана',
      dative: 'кишобранима',
      accusative: 'кишобране',
      vocative: 'кишобрани',
      instrumental: 'кишобранима',
      locative: 'кишобранима',
    },
  },
  'господин': {
    rules: [15, 40, 100, 130, 200, 240, 310, 350, 400, 500, 610, 620],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'господин',
      genitive: 'господина',
      dative: 'господину',
      accusative: 'господина',
      vocative: 'господине',
      instrumental: 'господином',
      locative: 'господину',
    },
    plural: {
      nominative: 'господа',
      genitive: 'господе',
      dative: 'господи',
      accusative: 'господу',
      vocative: 'господо',
      instrumental: 'господом',
      locative: 'господи',
    },
  },
  'син': {
    rules: [15, 43, 100, 130, 200, 240, 310, 350, 400, 500, 610, 620],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'си̑н',
      genitive: 'си̑на',
      dative: 'си̑ну',
      accusative: 'си̑на',
      vocative: 'си̑не',
      instrumental: 'си̑ном',
      locative: 'си́ну',
    },
    plural: {
      nominative: 'си̏нови',
      genitive: 'си̏но̄ва̄',
      dative: 'си̏новима',
      accusative: 'си̏нове',
      vocative: 'си̏нови',
      instrumental: 'си̏новима',
      locative: 'си̏новима',
    },
  },
  'путник': {
    rules: [15, 40, 100, 130, 200, 240, 310, 350, 400, 500, 610, 620, 2000],
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
  'човек': {
    rules: [15, 40, 100, 130, 200, 240, 310, 350, 400, 500, 610, 620],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'чо̏век',
      genitive: 'чо̏века',
      dative: 'чо̏веку',
      accusative: 'чо̏века',
      vocative: 'чо̏вече',
      instrumental: 'чо̏веком',
      locative: 'чо̏веку',
    },
    plural: {
      nominative: 'љу̑ди',
      genitive: 'љу́дӣ',
      dative: 'љу́дима',
      accusative: 'љу̑де',
      vocative: 'љу̑ди',
      instrumental: 'љу́дима',
      locative: 'љу́дима',
    },
  },
  'ковчег': {
    rules: [15, 40, 100, 130, 200, 240, 300, 350, 400, 500, 610, 620, 2010],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'ко̀вчег',
      genitive: 'ковчега',
      dative: 'ковчегу',
      accusative: 'ковчег',
      vocative: 'ковчеже / ковчегу',
      instrumental: 'ковчегом',
      locative: 'ковчегу',
    },
    plural: {
      nominative: 'ко̀вчези',
      genitive: 'ко̏вче̄га̄',
      dative: 'ковчезима',
      accusative: 'ковчеге',
      vocative: 'ковчези',
      instrumental: 'ковчезима',
      locative: 'ковчезима',
    },
  },
  'пријатељ': {
    rules: [15, 40, 100, 130, 200, 240, 310, 350, 410, 500, 610, 620],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'при̏јатељ',
      genitive: 'при̏јатеља',
      dative: 'при̏јатељу',
      accusative: 'при̏јатеља',
      vocative: 'при̏јатељу',
      instrumental: 'при̏јатељем',
      locative: 'при̏јатељу',
    },
    plural: {
      nominative: 'при̏јатељи',
      genitive: 'при̏јатеља̄',
      dative: 'при̏јатељима',
      accusative: 'при̏јатеље',
      vocative: 'при̏јатељи',
      instrumental: 'при̏јатељима',
      locative: 'при̏јатељима',
    },
  },
  'полицајац': {
    rules: [15, 40, 100, 130, 200, 240, 310, 350, 400, 500, 610, 620],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'полица́јац',
      genitive: 'полица́јца',
      dative: 'полицајцу',
      accusative: 'полицајца',
      vocative: 'полицајче',
      instrumental: 'полицајцем',
      locative: 'полицајцу',
    },
    plural: {
      nominative: 'полица́јци',
      genitive: 'полѝца̄ја̄ца̄',
      dative: 'полицајцима',
      accusative: 'полицајце',
      vocative: 'полицајци',
      instrumental: 'полицајцима',
      locative: 'полицајцима',
    },
  },
  'море': {
    rules: [20, 50, 110, 130, 210, 250, 320, 360, 420, 460, 500, 610, 620],
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
  'пѐро': {
    rules: [20, 50, 110, 130, 210, 250, 320, 360, 420, 460, 500, 610, 620],
    gender: GrammarGender.NEUTER,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'перо',
      genitive: 'пера',
      dative: 'перу',
      accusative: 'перо',
      vocative: 'перо',
      instrumental: 'пером',
      locative: 'перу',
    },
    plural: {
      nominative: 'пера',
      genitive: 'пера',
      dative: 'перима',
      accusative: 'пера',
      vocative: 'пера',
      instrumental: 'перима',
      locative: 'перима',
    },
  },
  'село': {
    rules: [20, 50, 110, 130, 210, 250, 320, 360, 420, 460, 500, 610, 620],
    gender: GrammarGender.NEUTER,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'сѐло',
      genitive: 'сѐла',
      dative: 'сѐлу',
      accusative: 'сѐло',
      vocative: 'сѐло',
      instrumental: 'сѐлом',
      locative: 'сѐлу',
    },
    plural: {
      nominative: 'се̏ла',
      genitive: 'се̑ла̄',
      dative: 'се̏лима',
      accusative: 'се̏ла',
      vocative: 'се̏ла',
      instrumental: 'се̏лима',
      locative: 'се̏лима',
    },
  },
  'торба': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 430, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'то́рба',
      genitive: 'торбе',
      dative: 'торби',
      accusative: 'торбу',
      vocative: 'торбо',
      instrumental: 'торбом',
      locative: 'торби',
    },
    plural: {
      nominative: 'торбе',
      genitive: 'то́рба̄ / то́рбӣ',
      dative: 'торбама',
      accusative: 'торбе',
      vocative: 'торбе',
      instrumental: 'торбама',
      locative: 'торбама',
    },
  },
  'госпођа': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 430, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'госпођа',
      genitive: 'госпође',
      dative: 'госпођи',
      accusative: 'госпођу',
      vocative: 'госпођо',
      instrumental: 'госпођом',
      locative: 'госпођи',
    },
    plural: {
      nominative: 'госпође',
      genitive: 'го̏спо̄ђа̄',
      dative: 'госпођама',
      accusative: 'госпође',
      vocative: 'госпође',
      instrumental: 'госпођама',
      locative: 'госпођама',
    },
  },
  'улица': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 440, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'улица',
      genitive: 'улице',
      dative: 'улици',
      accusative: 'улицу',
      vocative: 'улице',
      instrumental: 'улицом',
      locative: 'улици',
    },
    plural: {
      nominative: 'улице',
      genitive: 'улица',
      dative: 'улицама',
      accusative: 'улице',
      vocative: 'улице',
      instrumental: 'улицама',
      locative: 'улицама',
    },
  },
  'жена': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 440, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'жѐна',
      genitive: 'жене',
      dative: 'жени',
      accusative: 'жену',
      vocative: 'же̏но',
      instrumental: 'женом',
      locative: 'жени',
    },
    plural: {
      nominative: 'жене',
      genitive: 'же́на̄',
      dative: 'женама',
      accusative: 'жене',
      vocative: 'жене',
      instrumental: 'женама',
      locative: 'женама',
    },
  },
  'Енглеска': {
    rules: [30, 70, 120, 130, 230, 270, 340, 370, 450, 460, 510, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'Ѐнгле̄ска̄',
      genitive: 'Енглеске',
      dative: 'Ѐнгле̄ско̄ј',
      accusative: 'Енглеску',
      vocative: 'Енглеска',
      instrumental: 'Енглеском',
      locative: 'Ѐнгле̄ско̄ј',
    },
    plural: {
      nominative: '-',
      genitive: '-',
      dative: '-',
      accusative: '-',
      vocative: '-',
      instrumental: '-',
      locative: '-',
    },
  },
  'мајка': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 430, 460, 500, 610, 620, 2000],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'ма̑јка',
      genitive: 'мајке',
      dative: 'мајци',
      accusative: 'мајку',
      vocative: 'мајко',
      instrumental: 'мајком',
      locative: 'мајци',
    },
    plural: {
      nominative: 'мајке',
      genitive: 'ма̑јкӣ / ма̑јка̄',
      dative: 'мајкама',
      accusative: 'мајке',
      vocative: 'мајке',
      instrumental: 'мајкама',
      locative: 'мајкама',
    },
  },
  'соба': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 430, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'со̏ба',
      genitive: 'собе',
      dative: 'соби',
      accusative: 'собу',
      vocative: 'собо',
      instrumental: 'соби',
      locative: 'собом',
    },
    plural: {
      nominative: 'собе',
      genitive: 'со̑ба̄',
      dative: 'собама',
      accusative: 'собе',
      vocative: 'собе',
      instrumental: 'собама',
      locative: 'собама',
    },
  },
  'девојка': {
    rules: [30, 60, 120, 130, 220, 260, 330, 370, 430, 460, 500, 610, 620, 2000],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'девојка',
      genitive: 'девојке',
      dative: 'девојци',
      accusative: 'девојку',
      vocative: 'девојко',
      instrumental: 'девојком',
      locative: 'девојци',
    },
    plural: {
      nominative: 'девојке',
      genitive: 'девојака',
      dative: 'девојкама',
      accusative: 'девојке',
      vocative: 'девојке',
      instrumental: 'девојкама',
      locative: 'девојкама',
    },
  },
  'ноћ': {
    rules: [35, 70, 120, 130, 230, 270, 340, 370, 450, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'но̑ћ',
      genitive: 'но̏ћи',
      dative: 'ноћи',
      accusative: 'ноћ',
      vocative: 'ноћи',
      instrumental: 'но̏ћи / но̏ћу',
      locative: 'ноћи',
    },
    plural: {
      nominative: 'ноћи',
      genitive: 'но̀ћӣ',
      dative: 'ноћима',
      accusative: 'ноћи',
      vocative: 'ноћи',
      instrumental: 'ноћима',
      locative: 'ноћима',
    },
  },
  'ствар': {
    rules: [35, 70, 120, 130, 230, 270, 340, 370, 450, 460, 500, 610, 620],
    gender: GrammarGender.FEMININE,
    animation: GrammarAnimation.INANIMATE,
    singular: {
      nominative: 'ства̑р',
      genitive: 'ствари',
      dative: 'ствари',
      accusative: 'ствар',
      vocative: 'ствари',
      instrumental: 'ствари',
      locative: 'ствари',
    },
    plural: {
      nominative: 'ствари',
      genitive: 'ства́рӣ',
      dative: 'стварима',
      accusative: 'ствари',
      vocative: 'ствари',
      instrumental: 'стварима',
      locative: 'стварима',
    },
  },
  'дечак': {
    rules: [35, 70, 120, 130, 230, 270, 340, 370, 450, 460, 500, 610, 620, 2000],
    gender: GrammarGender.MASCULINE,
    animation: GrammarAnimation.ANIMATE,
    singular: {
      nominative: 'дѐча̄к',
      genitive: 'деча́ка',
      dative: 'дечаку',
      accusative: 'дечака',
      vocative: 'де̏ча̄че',
      instrumental: 'дечаком',
      locative: 'дечаку',
    },
    plural: {
      nominative: 'деча́ци',
      genitive: 'дечака',
      dative: 'дечацима',
      accusative: 'дечаке',
      vocative: 'дечаци',
      instrumental: 'дечацима',
      locative: 'дечацима',
    },
  },
};

class StaticNounEntry implements Noun {
  mainForm: string;

  description: string;

  private _cases: Case[] | null;

  private _rules: string[] | null;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
    this.description = staticDb[this.mainForm].description?.toString();
    this._cases = null;
    this._rules = null;
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

  get rules(): string[] {
    if (this._rules === null) {
      const entry = staticDb[this.mainForm];
      this._rules = entry.rules.map(code => rules[code]);
    }
    return this._rules;
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
