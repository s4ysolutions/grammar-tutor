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

export enum GrammarGender {
  MASCULINE,
  FEMININE,
  NEUTER,
}

export enum GrammarForm {
  SHORT,
  LONG,
}

export enum GrammarPlurality {
  SINGULAR,
  PLURAL,
}

export enum GrammarCase {
  Nominative = 'Nom',
  Genitive = 'Gen',
  Accusative = 'Acc',
  Locative = 'Loc',
  Dative = 'Dat',
  Instrumental = 'Inst',
  Vocative = 'Voc',
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

export interface LearningDB {
  getWordStatistics(word: string): Promise<LearnedWordStatistics>
  addCorrect(word: string): Promise<void>
  addWrong(word: string): Promise<void>
}

export interface NounCaseExercise {
  mainForm: string,
  exerciseCase: NounCase,
  possibleVariants: string[],
}

export interface Tutor {
  nextPronounExersizeSelectWord(): Promise<NounCaseExercise>
  checkNounCaseAnswer(answer: string, question: NounCaseExercise): Promise<boolean>;
}
