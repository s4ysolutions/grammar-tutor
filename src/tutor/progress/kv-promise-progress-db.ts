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

import {LearnedWordStaticsBean, LearnedWordStatistics, LearningProgress, Lesson, LessonStatistics} from '../index';
import {KvPromise} from '../../kv/promise';
import {DefaultLearnedWordStatistics} from './default-word-statistics';
import {Observable, Subject, concat, merge, mergeMap, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

const PREFIX = 'ldb@';
const PREFIX_LESSON_STATS = 'ldbs@';
const NEVER = new Date(0);

const FAKE_LESSON_ID = -10;
const FAKE_LESSON = FAKE_LESSON_ID as unknown as Lesson;

export class KvPromiseLearningDb implements LearningProgress {
  private readonly kv: KvPromise;

  private readonly lessonObservable: Observable<Lesson>;

  private readonly subjectLessonStatistics = new Subject<LessonStatistics>();

  constructor(kvPromise: KvPromise, lessonObservable: Observable<Lesson>) {
    this.kv = kvPromise;
    this.lessonObservable = lessonObservable;
  }

  private getStats(lesson: Lesson, word: string): Promise<LearnedWordStaticsBean> {
    return this.kv.get<LearnedWordStaticsBean | null>(`${PREFIX}${lesson.toString()}-${word}`, null)
      .then(s => s === null ? {shownCount: 0, wrongCount: 0, last: NEVER} : s);
  }

  private setStats(lesson: Lesson, word: string, bean: LearnedWordStaticsBean): Promise<void> {
    return this.kv.set<LearnedWordStaticsBean>(`${PREFIX}${lesson.toString()}-${word}`, bean);
  }

  private getLessonStats(lesson: Lesson): Promise<LessonStatistics> {
    return this.kv.get<LessonStatistics | null>(`${PREFIX_LESSON_STATS}${lesson.toString()}`, null)
      .then(s => s === null ? {total: 0, wrong: 0} : s);
  }

  private setLessonStats(lesson: Lesson, stat: LessonStatistics): Promise<void> {
    return this.kv.set<LessonStatistics>(`${PREFIX_LESSON_STATS}${lesson.toString()}`, stat)
      .then(() => {
        this.subjectLessonStatistics.next(stat);
      });
  }

  private async updateStats(lesson: Lesson, word: string, wrong: boolean): Promise<void> {
    const stats = await this.getWordStatistics(lesson, word);
    /* eslint-disable-next-line no-magic-numbers */
    const wrongCount = stats.wrongCount + (wrong ? 1 : stats.wrongCount > 0 ? -1 : 0);
    const promise1 = this.setStats(
      lesson, word,
      {
        shownCount: stats.shownCount + 1,
        wrongCount,
        last: new Date(),
      },
    );

    const lessonStats = await this.getLessonStats(lesson);
    const newLessonStats = {total: lessonStats.total + 1, wrong: lessonStats.wrong - stats.wrongCount + wrongCount};
    const promise2 = this.setLessonStats(lesson, newLessonStats);

    // noinspection ES6MissingAwait
    return Promise.all([promise1, promise2]) as unknown as Promise<void>;
  }

  getWordStatistics(lesson: Lesson, word: string): Promise<LearnedWordStatistics> {
    return this.getStats(lesson, word)
      // TODO: should be DI
      //       either factory passed to constructor
      //       or intermediate store interface
      .then(bean => DefaultLearnedWordStatistics.fromBean(bean));
  }

  addCorrect(lesson: Lesson, word: string): Promise<void> {
    return this.updateStats(lesson, word, false);
  }

  addWrong(lesson: Lesson, word: string): Promise<void> {
    return this.updateStats(lesson, word, true);
  }

  getLessonStatistics(lesson: Lesson): Promise<LessonStatistics> {
    return this.getLessonStats(lesson);
  }

  observableLessonStatistics(lesson?: Lesson): Observable<LessonStatistics> {
    if (lesson === undefined) {
      // dirty hack to wake up mergeMap
      return concat(of(FAKE_LESSON), this.lessonObservable)
        .pipe(mergeMap((l) =>
          merge(
            // to send new stat on switch lesson
            of(l).pipe(
              filter(ll => ll !== FAKE_LESSON),
              mergeMap(ll => fromPromise(this.getLessonStatistics(ll))),
            ),
            this.subjectLessonStatistics,
            // react on reset storag
            this.kv.observableReset().pipe(
              filter(reset => reset),
              map(() => ({total: 0, wrong: 0})),
            ),
          )));
    } // else
    return merge(
      this.subjectLessonStatistics,
      this.kv.observableReset().pipe(
        filter(reset => reset),
        map(() => ({total: 0, wrong: 0})),
      ),
    );
  }

  reset(): Promise<void> {
    return this.kv.reset();
  }
}
