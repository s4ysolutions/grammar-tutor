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

export interface NounCase {
  word: string,
  case: GrammarCase,
  plurality: GrammarPlurality,
  gender?: GrammarGender,
  form?: GrammarForm,
}

export interface Noun {
  readonly mainForm: string;
  cases(): Promise<NounCase[]>;
}

export interface NounsDB {
  readonly words: Promise<string[]>

  getNoun(word: string): Promise<Noun>
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
  PronounCases,
}

export interface LessonStatistics {
  readonly total: number
  readonly wrong: number
}

export interface LearningDb {
  getWordStatistics(lesson: Lesson, word: string): Promise<LearnedWordStatistics>
  addCorrect(lesson: Lesson, word: string): Promise<void>
  addWrong(lesson: Lesson, word: string): Promise<void>
  getLessonStatistics(lesson: Lesson): Promise<LessonStatistics>
  observableLessonStatistics(lesson: Lesson): Observable<LessonStatistics>
  reset(): Promise<void>
}

export interface NounCaseExercise {
  mainForm: string,
  exerciseCase: NounCase,
  possibleVariants: string[],
}

export interface Tutor {
  readonly currentLesson: Lesson
  observableCurrentLesson(): Observable<Lesson>
  nextPronounExersizeSelectWord(): Promise<NounCaseExercise>
  checkNounCaseAnswer(answer: string, exercise: NounCaseExercise): Promise<boolean>;
}
