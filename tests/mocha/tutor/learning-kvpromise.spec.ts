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

import {DefaultLessonsDb} from '../../../src/tutor/lessons/default';
import {Lesson, LessonStatistics, LessonsDb} from '../../../src/tutor';
import {KvPromiseLearningDb} from '../../../src/tutor/learned/kv-promise-db';
import memoryStoragePromiseFactory, {MemoryStoragePromise} from '../../mocks/kv-promice/memoryStorage';
import {expect} from 'chai';
import {first} from 'rxjs';

describe('Learning', () => {
  let lessonDb: LessonsDb;
  let learningDb: KvPromiseLearningDb;
  let kvDb: MemoryStoragePromise;

  beforeEach(() => {
    lessonDb = new DefaultLessonsDb();
    kvDb = memoryStoragePromiseFactory({});
    learningDb = new KvPromiseLearningDb(kvDb, lessonDb);
  });

  it('Inital statistics Personal Pronouns', async () => {
    const statsPN = await learningDb.getLessonStatistics(Lesson.PersonalPronounsCases);
    expect(statsPN).to.be.eql({total: 0, wrong: 0});
  });

  it('Inital statistics Interrogative Pronouns', async () => {
    const statsIP = await learningDb.getLessonStatistics(Lesson.InterrogativePronouns);
    expect(statsIP).to.be.eql({total: 0, wrong: 0});
  });

  it('statistics Personal Pronouns', async () => {
    await learningDb.addCorrect(Lesson.PersonalPronounsCases, 'word1');
    expect(await learningDb.getLessonStatistics(Lesson.PersonalPronounsCases)).to.be.eql({total: 1, wrong: 0});
    await learningDb.addCorrect(Lesson.PersonalPronounsCases, 'word1');
    expect(await learningDb.getLessonStatistics(Lesson.PersonalPronounsCases)).to.be.eql({total: 2, wrong: 0});
    await learningDb.addWrong(Lesson.PersonalPronounsCases, 'word1');
    expect(await learningDb.getLessonStatistics(Lesson.PersonalPronounsCases)).to.be.eql({total: 3, wrong: 1});
    await learningDb.addWrong(Lesson.PersonalPronounsCases, 'word2');
    expect(await learningDb.getLessonStatistics(Lesson.PersonalPronounsCases)).to.be.eql({total: 4, wrong: 2});

    expect(await learningDb.getLessonStatistics(Lesson.InterrogativePronouns)).to.be.eql({total: 0, wrong: 0});
  });

  it('statistics Interrogative Pronouns', async () => {
    await learningDb.addCorrect(Lesson.InterrogativePronouns, 'word1');
    expect(await learningDb.getLessonStatistics(Lesson.InterrogativePronouns)).to.be.eql({total: 1, wrong: 0});
    await learningDb.addCorrect(Lesson.InterrogativePronouns, 'word1');
    expect(await learningDb.getLessonStatistics(Lesson.InterrogativePronouns)).to.be.eql({total: 2, wrong: 0});
    await learningDb.addWrong(Lesson.InterrogativePronouns, 'word1');
    expect(await learningDb.getLessonStatistics(Lesson.InterrogativePronouns)).to.be.eql({total: 3, wrong: 1});
    await learningDb.addWrong(Lesson.InterrogativePronouns, 'word2');
    expect(await learningDb.getLessonStatistics(Lesson.InterrogativePronouns)).to.be.eql({total: 4, wrong: 2});

    expect(await learningDb.getLessonStatistics(Lesson.PersonalPronounsCases)).to.be.eql({total: 0, wrong: 0});
  });

  it('observe lesson stats', async () => {
    const promiseLearningStatistics = new Promise<LessonStatistics>(rs => {
      learningDb.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });

    learningDb.addCorrect(Lesson.InterrogativePronouns, 'word1').then();
    const stats = await promiseLearningStatistics;
    expect(stats).to.be.eql({total: 1, wrong: 0});
  });

  it('observe switch lesson emits another stats', async () => {
    expect(lessonDb.currentLesson).to.be.eq(Lesson.PersonalPronounsCases);
    await learningDb.addCorrect(Lesson.InterrogativePronouns, 'word0');
    await learningDb.addCorrect(Lesson.InterrogativePronouns, 'word00');
    await learningDb.addWrong(Lesson.PersonalPronounsCases, 'word1');

    const promiseLearningStatistics = new Promise<LessonStatistics>(rs => {
      learningDb.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });
    lessonDb.selectLesson(Lesson.InterrogativePronouns).then();
    const stats = await promiseLearningStatistics;
    expect(stats).to.be.eql({total: 2, wrong: 0});

    const promiseLearningStatistics2 = new Promise<LessonStatistics>(rs => {
      learningDb.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });
    lessonDb.selectLesson(Lesson.PersonalPronounsCases).then();
    const stats2 = await promiseLearningStatistics2;
    expect(stats2).to.be.eql({total: 1, wrong: 1});
  });

  it('reset', async () => {
    expect(lessonDb.currentLesson).to.be.eq(Lesson.PersonalPronounsCases);
    await learningDb.addCorrect(lessonDb.currentLesson, 'word0');
    await learningDb.addCorrect(lessonDb.currentLesson, 'word00');

    const stat0 = await learningDb.getLessonStatistics(lessonDb.currentLesson);
    expect(stat0).to.be.eql({total: 2, wrong: 0});

    const promiseLearningStatistics = new Promise<LessonStatistics>(rs => {
      learningDb.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });

    learningDb.reset().then();

    const stats = await promiseLearningStatistics;
    expect(stats).to.be.eql({total: 0, wrong: 0});
  });
});
