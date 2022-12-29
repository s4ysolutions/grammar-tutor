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
  Case,
  CaseExercise,
  CasesInterrogativesDb,
  ConjugationExercise,
  GrammarAnimation,
  GrammarCase,
  GrammarForm,
  GrammarGender,
  GrammarPerson,
  GrammarPlurality,
  LearningProgress,
  Lesson,
  Noun,
  NounsDb,
  Person,
  Tutor,
  VerbsDb,
  WithPlurality,
} from '../index';
import DefaultLesson from './default-lesson';
import {Observable} from 'rxjs';

export class DefaultTutor implements Tutor {
  private readonly personalPronounsDb: NounsDb;

  private readonly reflexivePronounsDb: NounsDb;

  private readonly possessivePronounsDb: NounsDb;

  private readonly interrogativesDb: NounsDb;

  private readonly casesInterrogativesPronounsDb: CasesInterrogativesDb;

  private readonly nounsDb: NounsDb;

  private readonly bitiDb: VerbsDb;

  private readonly htetiDb: VerbsDb;

  private readonly verbsDb: VerbsDb;

  private readonly learningDb: LearningProgress;

  private readonly lesson: DefaultLesson;

  constructor(
    personalPronounsDB: NounsDb,
    reflexivePronounsDB: NounsDb,
    possessivePronounsDB: NounsDb,
    interrogativesDB: NounsDb,
    casesInterrogativePronounsDB: CasesInterrogativesDb,
    nounsDB: NounsDb,
    bitiDB: VerbsDb,
    htetiDB: VerbsDb,
    verbsDB: VerbsDb,
    learningDB: LearningProgress,
    lesson: DefaultLesson,
  ) {
    this.personalPronounsDb = personalPronounsDB;
    this.reflexivePronounsDb = reflexivePronounsDB;
    this.possessivePronounsDb = possessivePronounsDB;
    this.casesInterrogativesPronounsDb = casesInterrogativePronounsDB;
    this.interrogativesDb = interrogativesDB;
    this.nounsDb = nounsDB;
    this.bitiDb = bitiDB;
    this.htetiDb = htetiDB;
    this.verbsDb = verbsDB;
    this.learningDb = learningDB;
    this.lesson = lesson;
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

  private static randomPerson =
    (persons: GrammarPerson[]): GrammarPerson | null =>
      persons.length > 0
        ? persons[DefaultTutor.random(persons.length)]
        : null;

  private static availableGrammarCases(cases: Case[]): GrammarCase[] {
    return Array.from<GrammarCase>(cases
      .reduce((set: Set<GrammarCase>, pronounCase: Case) => {
        set.add(pronounCase.case);
        return set;
      }, new Set()));
  }

  private static availablePluralities(cases: WithPlurality[]): GrammarPlurality[] {
    return Array.from<GrammarPlurality>(cases
      .reduce((set: Set<GrammarPlurality>, nounCase: Case) => {
        set.add(nounCase.plurality);
        return set;
      }, new Set()));
  }

  private static availableAnimations(cases: Case[]): GrammarAnimation[] {
    return Array.from<GrammarAnimation>(cases
      .reduce((set: Set<GrammarAnimation>, pronounCase: Case) => {
        set.add(pronounCase.animation);
        return set;
      }, new Set()));
  }

  private static availableCasesForPlurality(
    cases: Case[],
    grammarPlurality: GrammarPlurality,
  ): GrammarCase[] {
    return Array.from<GrammarCase>(cases
      .filter(noun => noun.plurality === grammarPlurality && !(grammarPlurality === GrammarPlurality.SINGULAR && noun.case === GrammarCase.NOMINATIVE))
      .reduce((set: Set<GrammarCase>, nounCase: Case) => {
        set.add(nounCase.case);
        return set;
      }, new Set()));
  }

  private static availableGendersForPluralityAndCase(
    cases: Case[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
  ): GrammarGender[] {
    return Array.from<GrammarGender>(cases
      .filter(noun => noun.plurality === grammarPlurality && noun.case === grammarCase)
      .reduce((set: Set<GrammarGender>, nounCase: Case) => {
        set.add(nounCase.gender);
        return set;
      }, new Set()));
  }

  private static availableFormsForPluralityAndCase(
    cases: Case[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
  ): GrammarForm[] {
    return Array.from<GrammarForm>(cases
      .filter(noun => noun.plurality === grammarPlurality && noun.case === grammarCase)
      .reduce((set: Set<GrammarForm>, nounCase: Case) => {
        set.add(nounCase.form);
        return set;
      }, new Set()));
  }

  private static availableFormsForPluralityAndCaseAndGender(
    cases: Case[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
    grammarGender: GrammarGender,
  ): GrammarForm[] {
    return Array.from<GrammarForm>(cases
      .filter(noun => noun.plurality === grammarPlurality && noun.case === grammarCase && noun.gender === grammarGender)
      .reduce((set: Set<GrammarForm>, nounCase: Case) => {
        set.add(nounCase.form);
        return set;
      }, new Set()));
  }

  private static availablePersonsForPlurality(
    persons: Person[],
    grammarPlurality: GrammarPlurality,
  ): GrammarPerson[] {
    return Array.from<GrammarPerson>(persons
      .filter(verb => verb.plurality === grammarPlurality)
      .reduce((set: Set<GrammarPerson>, verbPerson: Person) => {
        set.add(verbPerson.person);
        return set;
      }, new Set()));
  }

  private static availableFormsForPluralityAndPerson(
    persons: Person[],
    grammarPlurality: GrammarPlurality,
    grammarPerson: GrammarPerson,
  ): GrammarForm[] {
    return Array.from<GrammarForm>(persons
      .filter(verb => verb.plurality === grammarPlurality && verb.person === grammarPerson)
      .reduce((set: Set<GrammarForm>, verbPerson: Person) => {
        set.add(verbPerson.form);
        return set;
      }, new Set()));
  }

  private static caseForNoun(
    nounCases: Case[],
    grammarPlurality: GrammarPlurality,
    grammarCase: GrammarCase,
    grammarGender?: GrammarGender,
    grammarForm?: GrammarForm,
  ): Case | null {
    const cases = nounCases
      .filter((nounCase: Case) => nounCase.case === grammarCase && nounCase.plurality === grammarPlurality);

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
    pronounCases: Case[],
    grammarCase: GrammarCase,
    grammarAnimation: GrammarAnimation,
  ): Case | null {
    const cases = pronounCases
      .filter((pronounCase: Case) => pronounCase.case === grammarCase);

    if (cases.length === 0) {
      return null;
    }
    if (cases.length === 1) {
      return cases[0]; // assumes the source is correct
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

  private static personForVerb(
    verbPersons: Person[],
    grammarPerson?: GrammarPerson,
    grammarPlurality?: GrammarPlurality,
    grammarForm?: GrammarForm,
  ): Person | null {
    const persons = verbPersons
      .filter((verbPerson: Person) =>
        (grammarPerson === undefined || verbPerson.person === grammarPerson) &&
        (grammarPlurality === undefined || verbPerson.plurality === grammarPlurality) &&
        (grammarForm === undefined || verbPerson.form === grammarForm));

    if (persons.length === 0) {
      return null;
    }

    if (persons.length === 1) {
      return persons[0]; // assumes the source is correct
    }

    throw Error(`Too many variants (${persons.join(',')}) for ${grammarPerson}, ${grammarPlurality}, ${grammarForm}`);
  }

  private static getWeightedArray =
    (wordWeights: Array<{ word: string, weight: number }>): string[] => wordWeights.map(({
      word,
      weight,
    }) => Array(weight).fill(word)).flat();

  private prevWord: string | null = null; // avoid the same word

  private async nextMainForm(wordsSet: string[]): Promise<string> {
    let word: string;
    if (wordsSet.length === 1) {
      word = wordsSet[0];
    } else {
      const statPromises: Promise<{ word: string, weight: number }>[] =
        // TODO: hardcode lesson?
        wordsSet.map(w => this.learningDb.getWordStatistics(this.currentLesson, w).then(stat => ({
          word: w,
          weight: stat.weight,
        })));
      const wordWeights = await Promise.all(statPromises);

      const weighted: string[] = DefaultTutor.getWeightedArray(wordWeights);
      do {
        const i = DefaultTutor.random(weighted.length);
        word = weighted[i];
      } while (word === this.prevWord);
    }
    this.prevWord = word;
    return word;
  }

  private static async nextCaseWithPluralExercise(noun: Noun): Promise<CaseExercise> {
    const cases: Case[] = await noun.cases();

    const possibleVariants = Array.from<string>(cases.reduce((set: Set<string>, nounCase: Case) => {
      set.add(nounCase.word);
      return set;
    }, new Set()).keys());

    const availablePluralities = DefaultTutor.availablePluralities(cases);
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
          noun,
        };
      }
      const grammarForm: GrammarForm = DefaultTutor.randomForm(availableForms);
      const exerciseCase = DefaultTutor.caseForNoun(cases, grammarPlurality, grammarCase, undefined, grammarForm);
      return {
        mainForm: noun.mainForm,
        exerciseCase,
        possibleVariants,
        correctAnswer: exerciseCase.word,
        noun,
      };

    }
    const grammarGender: GrammarGender = DefaultTutor.randomGender(availableGenders);
    const availableForms =
      DefaultTutor.availableFormsForPluralityAndCaseAndGender(cases, grammarPlurality, grammarCase, grammarGender);

    const grammarForm: GrammarForm = availableForms.length === 0 ? undefined : DefaultTutor.randomForm(availableForms);

    const exerciseCase = DefaultTutor.caseForNoun(cases, grammarPlurality, grammarCase, grammarGender, grammarForm);
    return {
      mainForm: noun.mainForm,
      exerciseCase,
      possibleVariants,
      correctAnswer: exerciseCase.word,
      noun,
    };
  }

  private static async nextCaseWithAnimationExercise(noun: Noun): Promise<CaseExercise> {

    const cases: Case[] = await noun.cases();

    const possibleVariants = Array.from<string>(cases.reduce((set: Set<string>, pronounCase: Case) => {
      set.add(pronounCase.word);
      return set;
    }, new Set()).keys());

    const availableCases = DefaultTutor.availableGrammarCases(cases);
    const grammarCase: GrammarCase = DefaultTutor.randomCase(availableCases);

    const availableAnimations = DefaultTutor.availableAnimations(cases);
    const grammarAnimation: GrammarAnimation = DefaultTutor.randomAnimation(availableAnimations);

    const exerciseCase = DefaultTutor.caseForInterrogativePronoun(cases, grammarCase, grammarAnimation);
    return {
      mainForm: noun.mainForm,
      exerciseCase,
      possibleVariants,
      correctAnswer: exerciseCase.word,
      noun,
    };
  }

  async nextCaseExercise(): Promise<CaseExercise> {
    if (this.currentLesson === Lesson.CASES_INTERROGATIVES_DECLINATION) {
      const availableMainForms = await this.casesInterrogativesPronounsDb.mainForms;
      const randomMainForm = await this.nextMainForm(availableMainForms);
      const noun: Noun = await this.casesInterrogativesPronounsDb.getNounByMainForm(randomMainForm);
      return DefaultTutor.nextCaseWithAnimationExercise(noun);
    }
    const db: NounsDb | null =
      this.currentLesson === Lesson.PERSONAL_PRONOUNS_DECLINATION
        ? this.personalPronounsDb
        : this.currentLesson === Lesson.REFLEXIVE_PRONOUNS_DECLINATION
          ? await this.reflexivePronounsDb
          : this.currentLesson === Lesson.POSSESSIVE_PRONOUNS_DECLINATION
            ? await this.possessivePronounsDb
            : this.currentLesson === Lesson.INTERROGATIVE_PRONOUNS_DECLINATION
              ? await this.interrogativesDb
              : this.currentLesson === Lesson.NOUNS_DECLINATION
                ? await this.nounsDb
                : null;

    if (db === null) {
      throw Error(`Invalid lesson ${this.currentLesson}`);
    }
    const availableMainForms = await db.mainForms;
    const randomMainForm = await this.nextMainForm(availableMainForms);
    const noun = await db.getNounByMainForm(randomMainForm);
    return DefaultTutor.nextCaseWithPluralExercise(noun);
  }

  async nextConjugationExercise(): Promise<ConjugationExercise> {
    const db: VerbsDb | null =
      this.currentLesson === Lesson.BITI_CONJUGATION
        ? this.bitiDb
        : this.currentLesson === Lesson.HTETI_CONJUGATION
          ? this.htetiDb
          : this.currentLesson === Lesson.VERBS_CONJUGATION
            ? this.verbsDb
            : null;

    if (db === null) {
      throw Error(`Invalid lesson ${this.currentLesson}`);
    }
    const availableMainForms = await db.mainForms;
    const randomMainForm = await this.nextMainForm(availableMainForms);
    const verb = await db.getVerbByMainForm(randomMainForm);

    const persons: Person[] = await verb.persons();

    const possibleVariants = Array.from<string>(persons.reduce((set: Set<string>, person: Person) => {
      set.add(person.word);
      return set;
    }, new Set()).keys());

    const availablePluralities = DefaultTutor.availablePluralities(persons);
    const grammarPlurality: GrammarPlurality = DefaultTutor.randomPlurality(availablePluralities);

    const availablePersons = DefaultTutor.availablePersonsForPlurality(persons, grammarPlurality);
    const grammarPerson: GrammarPerson = DefaultTutor.randomPerson(availablePersons);

    const availableForms =
      DefaultTutor.availableFormsForPluralityAndPerson(persons, grammarPlurality, grammarPerson);

    const grammarForm = (availableForms.length === 0 ? undefined : DefaultTutor.randomForm(availableForms));
    const exercisePerson = DefaultTutor.personForVerb(persons, grammarPerson, grammarPlurality, grammarForm);

    return {
      mainForm: verb.mainForm,
      exercisePerson,
      possibleVariants,
      correctAnswer: exercisePerson.word,
      verb,
    };
  }

  private updateLearning(correct: boolean, key: string): Promise<boolean> {
    const promise = correct
      ? this.learningDb.addCorrect(this.currentLesson, key)
      : this.learningDb.addWrong(this.currentLesson, key);
    return promise.then(() => correct);
  }

  private checkCaseAnswer(answer: string, exercise: CaseExercise): Promise<boolean> {
    return this.updateLearning(answer === exercise.correctAnswer, answer);
  }

  // question should be internal state?
  // eslint-disable-next-line class-methods-use-this
  checkCaseExercise(answer: string, exercise: CaseExercise): Promise<boolean> {
    return this.checkCaseAnswer(answer, exercise);
  }

  checkConjugationExercise(answer: string, exercise: ConjugationExercise): Promise<boolean> {
    return this.updateLearning(answer === exercise.correctAnswer, answer);
  }

  get currentLesson() {
    return this.lesson.currentLesson;
  }

  observableCurrentLesson(): Observable<Lesson> {
    return this.lesson.observableCurrentLesson();
  }

  selectLesson(lesson: Lesson): Promise<Lesson> {
    return this.lesson.selectLesson(lesson);
  }
}
