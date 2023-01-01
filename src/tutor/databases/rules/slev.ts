/*
 * Copyright 2023 by s4y.solutions
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

// https://slev.life/a/serbian/A4-serbian-cases-chart.pdf
import {GrammarAnimation, GrammarCase, GrammarGender, GrammarPlurality, MainFormWord} from '../../index';
import T from '../../../l10n';

enum SlevNote {
  Note1 = 1,
  Note2 = Note1 + 1,
  Note3 = Note2 + 1,
  Note4 = Note3 + 1,
}

export const slevNotes: Record<SlevNote, string> = {
  [SlevNote.Note1]: T`Used with trailing soft consonants:ц,ћ,ч,ђ,џ,j,љ,њ,ш,ж, except male names.`,
  [SlevNote.Note2]: T`Used with masculine monosyllabic nouns only.`,
  [SlevNote.Note3]: T`Don’t change ending for some female names (mostly long names).`,
  [SlevNote.Note4]: T`Female names ending on -ца`,
};

interface SlevReplacement {
  from: string,
  to: string,
}

export interface SlevRule {
  ending: string,
  notes?: SlevNote[],
  genders: GrammarGender[],
  plurality: GrammarPlurality[],
  animation?: GrammarAnimation,
  exceptions?: MainFormWord[]
  replacements?: SlevReplacement[]
}

interface SlevCaseRule {
  description: string,
  rules: SlevRule[],
  prepositions?: string[]
}

const rulesLocativAndDativSingular: SlevRule[] = [
  {
    ending: 'у',
    genders: [GrammarGender.MASCULINE, GrammarGender.NEUTER],
    plurality: [GrammarPlurality.SINGULAR],
  },
  {
    ending: 'и',
    genders: [GrammarGender.FEMININE],
    plurality: [GrammarPlurality.SINGULAR],
    replacements: [
      {
        from: 'ка',
        to: 'ци',
      },
      {
        from: 'га',
        to: 'жи',
      },
      {
        from: 'ха',
        to: 'ши',
      },
    ],
  },
];

const rulesLocativAndDativPlural: SlevRule[] = [
  {
    ending: 'има',
    genders: [GrammarGender.MASCULINE, GrammarGender.NEUTER],
    plurality: [GrammarPlurality.PLURAL],
    replacements: [
      {
        from: 'ка',
        to: 'цима',
      },
      {
        from: 'га',
        to: 'жима',
      },
      {
        from: 'ха',
        to: 'шима',
      },
    ],
  },
  {
    ending: 'овима',
    genders: [GrammarGender.MASCULINE, GrammarGender.NEUTER],
    plurality: [GrammarPlurality.PLURAL],
    notes: [SlevNote.Note2],
  },
  {
    ending: 'евима',
    genders: [GrammarGender.MASCULINE, GrammarGender.NEUTER],
    plurality: [GrammarPlurality.PLURAL],
    notes: [SlevNote.Note1, SlevNote.Note2],
  },
  {
    ending: 'ама',
    genders: [GrammarGender.FEMININE],
    plurality: [GrammarPlurality.PLURAL],
  },
];

const rulesLocativAndDativ: SlevRule[] = [].concat(rulesLocativAndDativSingular).concat(rulesLocativAndDativPlural);

export const nounsSlevRules: Record<GrammarCase, SlevCaseRule> = {
  Nominative: {
    description: T`Names of things.`,
    rules: [
      {
        ending: 'ø',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: 'а',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: 'о',
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: 'е',
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note1],
      },
      {
        ending: 'и',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        exceptions: ['брат', 'човек', 'пас', 'сто', 'господин'],
        replacements: [
          {
            from: 'к',
            to: 'ци',
          },
          {
            from: 'г',
            to: 'зи',
          },
          {
            from: 'х',
            to: 'ши',
          },
          {
            from: 'ан',
            to: 'ни',
          },
          {
            from: 'ак',
            to: 'ци',
          },
          {
            from: 'ац',
            to: 'ци',
          },
          {
            from: 'ар',
            to: 'ри',
          },
        ],
      },
      {
        ending: 'ови',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note2],
        exceptions: ['пут', 'sir', 'дан', 'конj', 'мрав', 'зуб', 'сат'],
      },
      {
        ending: 'еви',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note1, SlevNote.Note2],
      },
      {
        ending: 'е',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.PLURAL],
      },
      {
        ending: 'а',
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.PLURAL],
        exceptions: ['дете', 'дрво', 'име', 'посао', 'раме', 'време'],
      },
    ],
  },
  Accusative: {
    description: T`Direct object. Also with motion verbs.`,
    rules: [
      {
        ending: `ø, (${T`nominative`})`,
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.SINGULAR],
        animation: GrammarAnimation.INANIMATE,
      },
      {
        ending: `а, (${T`genitive`})`,
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.SINGULAR],
        animation: GrammarAnimation.ANIMATE,
      },
      {
        ending: 'u',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: `о, (${T`nominative`})`,
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: `е, (${T`nominative`})`,
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note1],
      },
      {
        ending: 'е',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
      },
      {
        ending: 'ове',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note2],
      },
      {
        ending: 'еве',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note1, SlevNote.Note2],
      },
      {
        ending: `е, (${T`nominative`})`,
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.PLURAL],
      },
      {
        ending: `а, (${T`nominative`})`,
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.PLURAL],
      },
    ],
    prepositions: [
      T`за — for (recipient, goal)`,
      T`кроз — through`,
      T`у — to (with closed space), on (day of week)`,
      T`на — to (with open space or event)`,
      T`по — for (intention, goal)`,
      T`уз — with (for good combinations), up`,
      T`низ — down`,
    ],
  },
  Genitive: {
    description: T`Object relation, quantity, time, possessive.`,
    rules: [
      {
        ending: 'а',
        genders: [GrammarGender.MASCULINE, GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: 'е',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: 'а',
        genders: [GrammarGender.MASCULINE, GrammarGender.FEMININE, GrammarGender.NEUTER],
        plurality: [GrammarPlurality.PLURAL],
        exceptions: ['човек', 'месец', 'сат', 'гост', 'око', 'ухо', 'нога', 'рука'],
      },
      {
        ending: 'ова',
        genders: [GrammarGender.MASCULINE, GrammarGender.FEMININE, GrammarGender.NEUTER],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note2],
      },
      {
        ending: 'ева',
        genders: [GrammarGender.MASCULINE, GrammarGender.FEMININE, GrammarGender.NEUTER],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note1, SlevNote.Note2],
      },
    ],
    prepositions: [
      T`ближу — near`,
      T`поред — next to`,
      T`лево од — left of`,
      T`испред — in front of`,
      T`испод — below, under`,
      T`између — between`,
      T`пре — before`,
      T`без — without`,
      T`код — at (home)`,
      T`током — during`,
      T`до — to, until`,
      T`од — from (someone/thing/where) — reverse of “до`,
      T`из — from, out of (ex: city) — reverse of “y”`,
      T`са — from (off) — reverse of “на”`,
      T`далеко од — far from`,
      T`преко — across, via`,
      T`десно од — right of`,
      T`иза — behind`,
      T`изнад — above, over`,
      T`око — around`,
      T`после — after`,
      T`осим — except`,
      T`ван — out of`,
      T`због — because of`,
    ],
  },
  Dative: {
    description: T`Toward, to, for.`,
    rules: rulesLocativAndDativ,
    prepositions: [
      T`према`,
      T`ка, к (movement only)`,
      T`упркос`,
    ],
  },
  Locative: {
    description: T`Where? About whom or what?`,
    rules: rulesLocativAndDativ,
    prepositions: [
      T`у — in, in (month of year)`,
      T`на — on, at, in (language)`,
      T`по — all over, all around, according to`,
      T`о — about`,
    ],
  },
  Instrumental: {
    description: T`With or by what? Indefinite recurrences.`,
    rules: ([
      {
        ending: 'ом',
        genders: [GrammarGender.MASCULINE, GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: 'ем',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note1],
      },
      {
        ending: 'ом',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
      },
    ] as SlevRule[]).concat(rulesLocativAndDativPlural),
    prepositions: [
      T`са, с — with`,
      T`Don’t include “са” for tools and transport.`,
    ],
  },
  Vocative: {
    description: T`Calling/addressing someone.`,
    rules: [
      {
        ending: 'е',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.SINGULAR],
        replacements: [
          {
            from: 'к',
            to: 'че',
          },
          {
            from: 'г',
            to: 'же',
          },
          {
            from: 'х',
            to: 'ше',
          },
        ],
      },
      {
        ending: 'у',
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note1],
      },
      {
        ending: 'о',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note3],
      },
      {
        ending: 'е',
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note4],
      },
      {
        ending: `о,(${T`nominative`})`,
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
      },
      {
        ending: `е,(${T`nominative`})`,
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.SINGULAR],
        notes: [SlevNote.Note1],
      },
      {
        ending: `и(${T`nominative`})`,
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
      },
      {
        ending: `ови(${T`nominative`})`,
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note2],
      },
      {
        ending: `еви(${T`nominative`})`,
        genders: [GrammarGender.MASCULINE],
        plurality: [GrammarPlurality.PLURAL],
        notes: [SlevNote.Note1, SlevNote.Note2],
      },
      {
        ending: `е(${T`nominative`})`,
        genders: [GrammarGender.FEMININE],
        plurality: [GrammarPlurality.PLURAL],
      },
      {
        ending: `а(${T`nominative`})`,
        genders: [GrammarGender.NEUTER],
        plurality: [GrammarPlurality.PLURAL],
      },
    ],
  },
};

let exceptionsCache: Record<string, true> | null = null;

export const isSlevException = (mainForm: MainFormWord): boolean => {
  if (exceptionsCache === null) {
    exceptionsCache = {};
    Object.values(nounsSlevRules).map(rule => rule.rules.map(r => r.exceptions || []))
      // eslint-disable-next-line no-magic-numbers
      .flat(3)
      .forEach(e => {
        exceptionsCache[e] = true;
      });

  }
  return Boolean(exceptionsCache[mainForm]);
};


export interface IDeclensionSlevRule {
  ending: string,
  cases: GrammarCase[],
  plurality: GrammarPlurality
}

export const iDeclensionSlevRules: IDeclensionSlevRule[] = [
  {
    ending: 'ø',
    plurality: GrammarPlurality.SINGULAR,
    cases: [GrammarCase.NOMINATIVE, GrammarCase.ACCUSATIVE],
  },
  {
    ending: 'и',
    plurality: GrammarPlurality.SINGULAR,
    cases: [GrammarCase.GENITIVE, GrammarCase.LOCATIVE, GrammarCase.DATIVE, GrammarCase.INSTRUMENTAL, GrammarCase.VOCATIVE],
  },
  {
    ending: 'и',
    plurality: GrammarPlurality.PLURAL,
    cases: [GrammarCase.NOMINATIVE, GrammarCase.ACCUSATIVE, GrammarCase.GENITIVE, GrammarCase.VOCATIVE],
  },
  {
    ending: 'има',
    plurality: GrammarPlurality.PLURAL,
    cases: [GrammarCase.LOCATIVE, GrammarCase.DATIVE, GrammarCase.INSTRUMENTAL],
  },
];
