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

import {Observable} from 'rxjs';

export enum GrammarGender {
  MASCULINE= 'Masculine',
  FEMININE = 'Feminine',
  NEUTER = 'Neuter',
}

export enum GrammarForm {
  LONG='Long',
  SHORT='Short',
}

export enum GrammarPlurality {
  SINGULAR='Singular',
  PLURAL='Plural',
}

export enum GrammarCase {
  NOMINATIVE = 'Nominative',
  GENITIVE = 'Genitive',
  DATIVE = 'Dative',
  ACCUSATIVE = 'Accusative',
  VOCATIVE = 'Vocative',
  LOCATIVE = 'Locative',
  INSTRUMENTAL = 'Instrumental',
}

export enum GrammarAnimation {
  ANIMATE = 'Animate',
  INANIMATE = 'Inanimate',
}

type MainFormWord = string
type CaseFormWord = string

export interface Case {
  word: CaseFormWord,
  case: GrammarCase,
  plurality?: GrammarPlurality,
  gender?: GrammarGender,
  form?: GrammarForm,
  animation?: GrammarAnimation,
}

export interface Noun {
  readonly mainForm: MainFormWord;
  cases(): Promise<Case[]>;
}

export interface NounsDb {
  readonly mainForms: Promise<MainFormWord[]>

  getNounByMainForm(word: MainFormWord): Promise<Noun>
}

export interface CasesInterrogativesDb extends NounsDb {
  getInterrogativeForCase(grammarCase: GrammarCase): Promise<Case[]>
}

export interface CaseExercise {
  mainForm: MainFormWord,
  possibleVariants: CaseFormWord[],
  correctAnswer: CaseFormWord;
  exerciseCase: Case,
  noun: Noun;
}

/**
 * The persisted properties of LearnedWordStatics
 * Seems to be a little hacky, and probably it is.
 */

export interface LearnedWordStaticsBean {
  readonly shownCount: number;
  readonly wrongCount: number;
  readonly last: Date;
}
/**
 * The calculated properties of LearnedWordStatics
 * @see LearnedWordStaticsBean for more
 */

export interface LearnedWordStatistics extends LearnedWordStaticsBean{
  weight: number;
}

export enum Lesson {
  PERSONAL_PRONOUNS_DECLINATION,
  INTERROGATIVE_PRONOUNS_DECLINATION,
  CASES_INTERROGATIVES_DECLINATION,
}

export interface LessonStatistics {
  readonly total: number
  readonly wrong: number
}

export interface LearningProgress {
  getWordStatistics(lesson: Lesson, word: string): Promise<LearnedWordStatistics>
  addCorrect(lesson: Lesson, word: string): Promise<void>
  addWrong(lesson: Lesson, word: string): Promise<void>
  getLessonStatistics(lesson: Lesson): Promise<LessonStatistics>
  observableLessonStatistics(lesson?: Lesson): Observable<LessonStatistics>
  reset(): Promise<void>
}

export interface Tutor {
  readonly currentLesson: Lesson
  selectLesson(lesson: Lesson): Promise<void>;
  observableCurrentLesson(): Observable<Lesson>
  nextCaseExercise(): Promise<CaseExercise>
  checkCaseExercise(answer: string, exercise: CaseExercise): Promise<boolean>;
}
