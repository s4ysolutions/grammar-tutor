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
  CaseExercise,
  GrammarAnimation,
  GrammarCase,
  GrammarForm,
  GrammarGender,
  GrammarPlurality,
  InterrogativePronoun,
  InterrogativePronounCase,
  InterrogativePronounCaseExercise,
  InterrogativePronounsDb,
  LearningDb,
  LessonsDb,
  Noun,
  NounCase,
  NounCaseExercise,
  NounsDb,
  PronounCase,
  Tutor,
} from '../index';
import log from '../../log';


export class DefaultTutor implements Tutor {
  private readonly personalPronounsDB: NounsDb;

  private readonly interrogativePronounsDB: InterrogativePronounsDb;

  private readonly learningDB: LearningDb;

  private readonly lessons: LessonsDb;

  constructor(personalPronounsDB: NounsDb, interrogativePronounsDB: InterrogativePronounsDb, learningDB: LearningDb, lessons: LessonsDb) {
    this.personalPronounsDB = personalPronounsDB;
    this.interrogativePronounsDB = interrogativePronounsDB;
    this.learningDB = learningDB;
    this.lessons = lessons;
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

  private static randomAnimation =
    (animations: GrammarAnimation[]): GrammarAnimation =>
      animations.length > 0
        ? animations[DefaultTutor.random(animations.length)]
        : null;

  private static availableCases(cases: PronounCase[]): GrammarCase[] {
    return Array.from<GrammarCase>(cases
      .reduce((set: Set<GrammarCase>, pronounCase: PronounCase) => {
        set.add(pronounCase.case);
        return set;
      }, new Set()));
  }

  private static availablePluratlities(cases: NounCase[]): GrammarPlurality[] {
    return Array.from<GrammarPlurality>(cases
      .reduce((set: Set<GrammarPlurality>, nounCase: NounCase) => {
        set.add(nounCase.plurality);
        return set;
      }, new Set()));
  }

  private static availableAnimaitons(cases: InterrogativePronounCase[]): GrammarAnimation[] {
    return Array.from<GrammarAnimation>(cases
      .reduce((set: Set<GrammarAnimation>, pronounCase: InterrogativePronounCase) => {
        set.add(pronounCase.animation);
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

  private static caseForNoun(
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

  private static caseForInterrogativePronoun(
    pronounCases: InterrogativePronounCase[],
    grammarCase: GrammarCase,
    grammarAnimation: GrammarAnimation,
  ): InterrogativePronounCase | null {

    const cases = pronounCases
      .filter((pronounCase: InterrogativePronounCase) => pronounCase.case === grammarCase);

    if (cases.length === 0) {
      return null;
    }
    if (cases.length === 1) {
      return cases[0];
    }

    const filtered = cases.filter(c => grammarAnimation === c.animation);

    if (filtered.length === 0) {
      return null;
    }

    if (filtered.length === 1) {
      return filtered[0];
    }

    throw Error(`Too many variants (${filtered.join(',')}) for ${grammarCase}, ${grammarAnimation}`);
  }

  private static getWeightedArray =
    (wordWeights: Array<{word: string, weight: number}>):string[] => wordWeights.map(({word, weight}) => Array(weight).fill(word)).flat();

  private prevWord: string | null = null;

  private async nextWord(): Promise<string> {
    log.d(`tutor nextWord enter prevWord=${this.prevWord}`);
    const wordsSet = await this.personalPronounsDB.words;
    const statPromises: Promise<{word: string, weight: number}>[] =
      // TODO: hardcode lesson?
      wordsSet.map(word => this.learningDB.getWordStatistics(this.lessons.currentLesson, word).then(stat => ({word, weight: stat.weight})));
    const wordWeights = await Promise.all(statPromises);

    const weighted: string[] = DefaultTutor.getWeightedArray(wordWeights);

    let word: string;
    if (weighted.length === 1) {
      word = weighted[0];
    } else {
      log.d(`tutor nextWord loop start prevWord=${this.prevWord}`);
      do {
        const i = DefaultTutor.random(weighted.length);
        word = weighted[i];
        log.d(`tutor nextWord get word=${word} (${i})`);
      } while (word === this.prevWord);
      log.d(`tutor nextWord loop end with word=${word}`);
    }
    this.prevWord = word;
    log.d(`tutor nextWord exit ${word}`);
    return word;
  }

  async nextPersonalPronounExersizeSelectWord(): Promise<NounCaseExercise> {
    const word = await this.nextWord();

    const noun: Noun = await this.personalPronounsDB.getNoun(word);

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
        const exerciseCase = DefaultTutor.caseForNoun(cases, grammarPlurality, grammarCase);
        return {
          mainForm: noun.mainForm,
          exerciseCase,
          possibleVariants,
          correctAnswer: exerciseCase.word,
        };
      }
      const grammarForm: GrammarForm = DefaultTutor.randomForm(availableForms);
      const exerciseCase = DefaultTutor.caseForNoun(cases, grammarPlurality, grammarCase, null, grammarForm);
      return {
        mainForm: noun.mainForm,
        exerciseCase,
        possibleVariants,
        correctAnswer: exerciseCase.word,
      };

    }
    const grammarGender: GrammarGender = DefaultTutor.randomGender(availableGenders);
    const availableForms =
      DefaultTutor.availableFormsForPluralityAndCaseAndGender(cases, grammarPlurality, grammarCase, grammarGender);
    if (availableForms.length === 0) {
      const exerciseCase = DefaultTutor.caseForNoun(cases, grammarPlurality, grammarCase, grammarGender);
      return {
        mainForm: noun.mainForm,
        exerciseCase,
        possibleVariants,
        correctAnswer: exerciseCase.word,
      };
    }
    const grammarForm: GrammarForm = DefaultTutor.randomForm(availableForms);
    const exerciseCase = DefaultTutor.caseForNoun(cases, grammarPlurality, grammarCase, grammarGender, grammarForm);
    return {
      mainForm: noun.mainForm,
      exerciseCase,
      possibleVariants,
      correctAnswer: exerciseCase.word,
    };
  }

  async nextInterrogativePronounExersizeSelectWord(): Promise<InterrogativePronounCaseExercise> {
    const word = await this.nextWord();

    const pronoun: InterrogativePronoun = await this.interrogativePronounsDB.getPronoun(word);

    const cases: InterrogativePronounCase[] = await pronoun.cases();

    const possibleVariants = Array.from<string>(cases.reduce((set: Set<string>, pronounCase: InterrogativePronounCase) => {
      set.add(pronounCase.word);
      return set;
    }, new Set()).keys());

    const availableCases = DefaultTutor.availableCases(cases);
    const grammarCase: GrammarCase = DefaultTutor.randomCase(availableCases);

    const availableAnimations = DefaultTutor.availableAnimaitons(cases);
    const grammarAnimation: GrammarAnimation = DefaultTutor.randomAnimation(availableAnimations);

    const exerciseCase = DefaultTutor.caseForInterrogativePronoun(cases, grammarCase, grammarAnimation);
    return {
      mainForm: pronoun.mainForm,
      exerciseCase,
      possibleVariants,
      correctAnswer: exerciseCase.word,
    };
  }

  private checkCaseAnswer(answer: string, exercise: CaseExercise): Promise<boolean> {
    const correct = answer === exercise.correctAnswer;
    // TODO: hardcode lesson?
    const promise = correct
      ? this.learningDB.addCorrect(this.lessons.currentLesson, answer)
      : this.learningDB.addWrong(this.lessons.currentLesson, answer);
    return promise.then(() => correct);
  }

  // question should be internal state?
  // eslint-disable-next-line class-methods-use-this
  checkNounCaseAnswer(answer: string, exercise: NounCaseExercise): Promise<boolean> {
    return this.checkCaseAnswer(answer, exercise);
  }

  checkPronounCaseAnswer(answer: string, exercise: InterrogativePronounCaseExercise): Promise<boolean> {
    return this.checkCaseAnswer(answer, exercise);
  }
}
