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

export interface PronounCase {
  word: string,
  case: GrammarCase,
}

export interface NounCase extends PronounCase {
  plurality: GrammarPlurality,
  gender?: GrammarGender,
  form?: GrammarForm,
}

export interface InterrogativePronounCase extends PronounCase{
  word: string,
  animation?: GrammarAnimation,
}

export interface Noun {
  readonly mainForm: string;
  cases(): Promise<NounCase[]>;
}

export interface InterrogativePronoun {
  readonly mainForm: string;
  cases(): Promise<InterrogativePronounCase[]>;
}

export interface NounsDb {
  readonly words: Promise<string[]>

  getNoun(word: string): Promise<Noun>
}

export interface InterrogativePronounsDb {
  readonly words: Promise<string[]>

  getPronoun(word: string): Promise<InterrogativePronoun>
}

export interface CaseExercise {
  mainForm: string,
  possibleVariants: string[],
  correctAnswer: string;
}

export interface NounCaseExercise extends CaseExercise{
  exerciseCase: NounCase,
}

export interface InterrogativePronounCaseExercise extends CaseExercise{
  exerciseCase: InterrogativePronounCase,
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
  PersonalPronounsCases,
  InterrogativePronouns,
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
  observableLessonStatistics(lesson?: Lesson): Observable<LessonStatistics>
  reset(): Promise<void>
}

export interface LessonsDb {
  readonly currentLesson: Lesson
  selectLesson(lesson: Lesson): Promise<void>;
  observableCurrentLesson(): Observable<Lesson>
}

export interface Tutor {
  nextPersonalPronounExersizeSelectWord(): Promise<NounCaseExercise>
  nextInterrogativePronounExersizeSelectWord(): Promise<InterrogativePronounCaseExercise>
  checkNounCaseAnswer(answer: string, exercise: NounCaseExercise): Promise<boolean>;
  checkInterrogativePronounCaseAnswer(answer: string, exercise: InterrogativePronounCaseExercise): Promise<boolean>;
}
