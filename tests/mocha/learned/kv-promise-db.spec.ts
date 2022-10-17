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

import {use as chaiUse, expect} from 'chai';
import chaiString from 'chai-string';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import {KvPromiseLearningDb} from '../../../src/tutor/learned/kv-promise-db';
import {LearnedWordStatistics, Lesson, LessonStatistics, LessonsDb} from '../../../src/tutor';
import {first} from 'rxjs';
import {DefaultLessonsDb} from '../../../src/tutor/lessons/default';

chaiUse(chaiString);

describe('Test rv-promise implementation of learned db', () => {
  const lessons: LessonsDb = new DefaultLessonsDb();

  it('Save and restore', async () => {
    const kv = await memoryStoragePromiseFactory();
    const db = new KvPromiseLearningDb(kv, lessons);

    const stat1 = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'non existing');
    expect(stat1).to.has.property('shownCount', 0);
    expect(stat1).to.has.property('wrongCount', 0);
    expect(stat1).to.has.property('last');
    expect(stat1.last.getTime()).to.be.eq(new Date(0).getTime());
    expect(stat1).to.has.property('weight', 10);

    const lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 0);
    expect(lessonStat).to.has.property('wrong', 0);
  });

  it('Reset', async () => {
    const kv = await memoryStoragePromiseFactory();
    const db = new KvPromiseLearningDb(kv, lessons);

    await db.addWrong(Lesson.PersonalPronounsCases, 'word1');
    const stat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(stat.total).to.be.eq(1);
    expect(stat.wrong).to.be.eq(1);

    const stateReset = await new Promise<LessonStatistics>(rs => {
      db.observableLessonStatistics(Lesson.PersonalPronounsCases)
        .pipe(first())
        .subscribe(statReset => {
          rs(statReset);
        });
      db.reset();
    });
    expect(stateReset.total).to.be.eq(0);
    expect(stateReset.wrong).to.be.eq(0);
  });

  it('statistics', async () => {
    const kv = await memoryStoragePromiseFactory();
    const db = new KvPromiseLearningDb(kv, lessons);

    let stat: LearnedWordStatistics;
    let lessonStat: LessonStatistics;
    let prevDate: number;

    prevDate = new Date().getTime();
    await db.addCorrect(Lesson.PersonalPronounsCases, 'word1');
    stat = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'word1');
    expect(stat).to.has.property('shownCount', 1);
    expect(stat).to.has.property('wrongCount', 0);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gte(prevDate);
    expect(stat).to.has.property('weight', 1);

    lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 1);
    expect(lessonStat).to.has.property('wrong', 0);

    prevDate = new Date().getTime();
    await db.addCorrect(Lesson.PersonalPronounsCases, 'word1');
    stat = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'word1');
    expect(stat).to.has.property('shownCount', 2);
    expect(stat).to.has.property('wrongCount', 0);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);

    lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 2);
    expect(lessonStat).to.has.property('wrong', 0);

    prevDate = new Date().getTime();
    await db.addWrong(Lesson.PersonalPronounsCases, 'word1');
    stat = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'word1');
    expect(stat).to.has.property('shownCount', 3);
    expect(stat).to.has.property('wrongCount', 1);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);

    lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 3);
    expect(lessonStat).to.has.property('wrong', 1);

    prevDate = new Date().getTime();
    await db.addWrong(Lesson.PersonalPronounsCases, 'word1');
    stat = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'word1');
    expect(stat).to.has.property('shownCount', 4);
    expect(stat).to.has.property('wrongCount', 2);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 2);

    lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 4);
    expect(lessonStat).to.has.property('wrong', 2);

    prevDate = new Date().getTime();
    await db.addWrong(Lesson.PersonalPronounsCases, 'word2');
    stat = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'word2');
    expect(stat).to.has.property('shownCount', 1);
    expect(stat).to.has.property('wrongCount', 1);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);

    lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 5);
    expect(lessonStat).to.has.property('wrong', 3);

    prevDate = new Date().getTime();
    await db.addCorrect(Lesson.PersonalPronounsCases, 'word2');
    stat = await db.getWordStatistics(Lesson.PersonalPronounsCases, 'word2');
    expect(stat).to.has.property('shownCount', 2);
    expect(stat).to.has.property('wrongCount', 0);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);

    lessonStat = await db.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(lessonStat).to.has.property('total', 6);
    expect(lessonStat).to.has.property('wrong', 2);
  });
});
