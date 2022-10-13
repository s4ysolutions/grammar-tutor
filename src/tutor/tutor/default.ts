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
  NounCaseExercise,
  NounsDB,
  Tutor,
} from '../index';


export class DefaultTutor implements Tutor {
  private readonly pronounsDB: NounsDB;

  private readonly learningDB: LearningDB;

  constructor(pronounsDB: NounsDB, learningDB: LearningDB) {
    this.pronounsDB = pronounsDB;
    this.learningDB = learningDB;
  }

  private static random = (upTo: number): number => Math.floor(Math.random() * upTo);

  private static randomPlurality =
    (pluralities: GrammarPlurality[]): GrammarPlurality | null =>
      pluralities.length > 0
        ? pluralities[DefaultTutor.random(pluralities.length)]
        : null;

  private static randomCase =
    (cases: GrammarCase[]): GrammarCase =>
      cases.length > 0
        ? cases[DefaultTutor.random(cases.length)]
        : null;

  private static randomGender =
    (genders: GrammarGender[]): GrammarGender =>
      genders.length > 0
        ? genders[DefaultTutor.random(genders.length)]
        : null;

  private static randomForm =
    (forms: GrammarForm[]): GrammarForm =>
      forms.length > 0
        ? forms[DefaultTutor.random(forms.length)]
        : null;

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

  private static caseFor(
    nounCases: NounCase[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
    grammarGender?: GrammarGender,
    grammarForm?: GrammarForm,
  ): NounCase | null {
    const cases = nounCases
      .filter((nounCase: NounCase) => nounCase.case === grammarCase && nounCase.plurality === grammarPlurality);

    if (cases.length === 0) {
      return null;
    }
    if (cases.length === 1) {
      return cases[0];
    }

    const filtered = cases.filter(c => {
      if (grammarGender !== c.gender) {
        return false;
      }
      // noinspection RedundantIfStatementJS
      if (grammarForm !== c.form) {
        return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      return null;
    }

    if (filtered.length === 1) {
      return filtered[0];
    }

    throw Error(`Too many variants (${filtered.join(',')}) for ${grammarPlurality}, ${grammarCase}, ${grammarGender}, ${grammarForm}`);
  }

  private static getWeightedArray =
    (wordWeights: Array<{word: string, weight: number}>):string[] => wordWeights.map(({word, weight}) => Array(weight).fill(word)).flat();

  async nextPronounExersizeSelectWord(): Promise<NounCaseExercise> {
    const wordsSet = await this.pronounsDB.words;
    const statPromises: Promise<{word: string, weight: number}>[] =
      wordsSet.map(word => this.learningDB.getWordStatistics(word).then(stat => ({word, weight: stat.weight})));
    const wordWeights = await Promise.all(statPromises);

    const weighted: string[] = DefaultTutor.getWeightedArray(wordWeights);
    const i = DefaultTutor.random(weighted.length);
    const word = weighted[i];

    const noun: Noun = await this.pronounsDB.getNoun(word);

    const cases: NounCase[] = await noun.cases();

    const possibleVariants = Array.from<string>(cases.reduce((set: Set<string>, nounCase: NounCase) => {
      set.add(nounCase.word);
      return set;
    }, new Set()).keys());

    const availablePluralities = DefaultTutor.availablePluratlities(cases);
    const grammarPlurality: GrammarPlurality = DefaultTutor.randomPlurality(availablePluralities);

    const availableCases = DefaultTutor.availableCasesForPlurality(cases, grammarPlurality);
    const grammarCase: GrammarCase = DefaultTutor.randomCase(availableCases);

    const availableGenders = DefaultTutor.availableGendersForPluralityAndCase(cases, grammarPlurality, grammarCase);


    if (availableGenders.length === 0) {
      const availableForms = DefaultTutor.availableFormsForPluralityAndCase(cases, grammarPlurality, grammarCase);
      if (availableForms.length === 0) {
        const exerciseCase = DefaultTutor.caseFor(cases, grammarPlurality, grammarCase);
        return {
          mainForm: noun.mainForm,
          exerciseCase,
          possibleVariants,
        };
      }
      const grammarForm: GrammarForm = DefaultTutor.randomForm(availableForms);
      const exerciseCase = DefaultTutor.caseFor(cases, grammarPlurality, grammarCase, null, grammarForm);
      return {
        mainForm: noun.mainForm,
        exerciseCase,
        possibleVariants,
      };

    }
    const grammarGender: GrammarGender = DefaultTutor.randomGender(availableGenders);
    const availableForms =
      DefaultTutor.availableFormsForPluralityAndCaseAndGender(cases, grammarPlurality, grammarCase, grammarGender);
    if (availableForms.length === 0) {
      const exerciseCase = DefaultTutor.caseFor(cases, grammarPlurality, grammarCase, grammarGender);
      return {
        mainForm: noun.mainForm,
        exerciseCase,
        possibleVariants,
      };
    }
    const grammarForm: GrammarForm = DefaultTutor.randomForm(availableForms);
    const exerciseCase = DefaultTutor.caseFor(cases, grammarPlurality, grammarCase, grammarGender, grammarForm);
    return {
      mainForm: noun.mainForm,
      exerciseCase,
      possibleVariants,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  checkNounCaseAnswer(answer: string, question: NounCaseExercise): Promise<boolean> {
    return Promise.resolve(answer === question.exerciseCase.word);
  }
}
