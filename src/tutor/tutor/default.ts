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

// noinspection RedundantIfStatementJS

import {
  GrammarCase,
  GrammarForm,
  GrammarGender,
  GrammarPlurality,
  LearningDB,
  Noun,
  NounCase,
  NounCaseQuestion,
  NounsDB,
  Tutor,
} from '../index';

const tutorRandom = (upTo: number): number => Math.floor(Math.random() * upTo);

export class DefaultTutor implements Tutor {
  private readonly pronounsDB: NounsDB;

  private readonly learningDB: LearningDB;

  constructor(pronounsDB: NounsDB, learningDB: LearningDB) {
    this.pronounsDB = pronounsDB;
    this.learningDB = learningDB;
  }

  private static availablePluratlities(cases: NounCase[]): GrammarPlurality[] {
    return Array.from<GrammarPlurality>(cases
      .reduce((set: Set<GrammarPlurality>, nounCase: NounCase) => {
        set.add(nounCase.plurality);
        return set;
      }, new Set()));
  }

  private static availableCasesForPlurality(
    cases: NounCase[],
    grammarPlurality: GrammarPlurality,
  ): GrammarCase[] {
    return Array.from<GrammarCase>(cases
      .filter(noun => noun.plurality === grammarPlurality)
      .reduce((set: Set<GrammarCase>, nounCase: NounCase) => {
        set.add(nounCase.case);
        return set;
      }, new Set()));
  }

  private static availableGendersForPluralityAndCase(
    cases: NounCase[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
  ): GrammarGender[] {
    return Array.from<GrammarGender>(cases
      .filter(noun => noun.plurality === grammarPlurality && noun.case === grammarCase)
      .reduce((set: Set<GrammarGender>, nounCase: NounCase) => {
        set.add(nounCase.gender);
        return set;
      }, new Set()));
  }

  private static availableFormsForPluralityAndCase(
    cases: NounCase[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
  ): GrammarForm[] {
    return Array.from<GrammarForm>(cases
      .filter(noun => noun.plurality === grammarPlurality && noun.case === grammarCase)
      .reduce((set: Set<GrammarForm>, nounCase: NounCase) => {
        set.add(nounCase.form);
        return set;
      }, new Set()));
  }

  private static availableFormsForPluralityAndCaseAndGender(
    cases: NounCase[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
    grammarGender: GrammarGender,
  ): GrammarForm[] {
    return Array.from<GrammarForm>(cases
      .filter(noun => noun.plurality === grammarPlurality && noun.case === grammarCase && noun.gender === grammarGender)
      .reduce((set: Set<GrammarForm>, nounCase: NounCase) => {
        set.add(nounCase.form);
        return set;
      }, new Set()));
  }

  async nextPronounQuestion(): Promise<NounCaseQuestion> {
    const wordsSet = await this.pronounsDB.words;
    const statPromises: Promise<[string, number]>[] = wordsSet.map(word => this.learningDB.getWordStatistics(word).then(stat => [word, stat.weight]));
    const wordweights = await Promise.all(statPromises);

    const weighted: string[] = wordweights.map(([word, weight]) => Array(weight).fill(word)).flat();
    const i = tutorRandom(weighted.length);
    const word = weighted[i];

    const noun: Noun = await this.pronounsDB.getNoun(word);

    const cases: NounCase[] = await noun.cases();

    const availablePluralities = DefaultTutor.availablePluratlities(cases);
    const grammarPlurality: GrammarPlurality = cases[tutorRandom(availablePluralities.length)].plurality;

    const availableCases = DefaultTutor.availableCasesForPlurality(cases, grammarPlurality);
    const grammarCase: GrammarCase = cases[tutorRandom(availableCases.length)].case;

    const availableGenders = DefaultTutor.availableGendersForPluralityAndCase(cases, grammarPlurality, grammarCase);

    if (availableGenders.length === 0) {
      const availableForms = DefaultTutor.availableFormsForPluralityAndCase(cases, grammarPlurality, grammarCase);
      if (availableForms.length === 0) {
        return {
          mainForm: noun.mainForm,
          grammarCase,
          grammarPlurality,
        };
      }
      const grammarForm: GrammarForm = cases[tutorRandom(availableForms.length)].form;
      return {
        mainForm: noun.mainForm,
        grammarCase,
        grammarPlurality,
        grammarForm,
      };

    }
    const grammarGender: GrammarGender = cases[tutorRandom(availableGenders.length)].gender;
    const availableForms =
      DefaultTutor.availableFormsForPluralityAndCaseAndGender(cases, grammarPlurality, grammarCase, grammarGender);
    if (availableForms.length === 0) {
      return {
        mainForm: noun.mainForm,
        grammarCase,
        grammarPlurality,
        grammarGender,
      };
    }
    const grammarForm: GrammarForm = cases[tutorRandom(availableForms.length)].form;
    return {
      mainForm: noun.mainForm,
      grammarCase,
      grammarPlurality,
      grammarGender,
      grammarForm,
    };
  }

  async checkNounCaseAnswer(answer: string, question: NounCaseQuestion): Promise<boolean> {
    const {grammarPlurality, grammarCase, grammarGender, grammarForm} = question;

    const noun: Noun = await this.pronounsDB.getNoun(answer);
    const cases: NounCase[] = (await noun.cases())
      .filter((nounCase: NounCase) => nounCase.case === grammarCase && nounCase.plurality === grammarPlurality);

    if (cases.length === 0) {
      return false;
    }
    if (cases.length === 1) {
      return (cases[0].word === answer);
    }


    const filtered = cases.filter(c => {
      if (grammarGender && (grammarGender !== c.gender)) {
        return false;
      }
      // noinspection RedundantIfStatementJS
      if (grammarForm && (grammarForm !== c.form)) {
        return false;
      }
      return true;
    });
    if (filtered.length === 0) {
      return false;
    }
    if (filtered.length === 1) {
      return filtered[0].word === answer;
    }
    for (const f of filtered) {
      if (f.word === answer) {
        return true;
      }
    }
    return false;
  }
}
