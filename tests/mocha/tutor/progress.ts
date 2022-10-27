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

/* eslint-disable no-magic-numbers */
import {LearningProgress, Lesson, LessonStatistics, Tutor} from '../../../src/tutor';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import {expect} from 'chai';
import {concat, first} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {DefaultDi} from '../../../src/di/default';
import log from '../../../src/log';

describe('Progress', () => {
  let progress: LearningProgress = null as LearningProgress;
  let tutor: Tutor = null as Tutor;

  beforeEach(() => {
    const di = new DefaultDi(memoryStoragePromiseFactory({}));
    progress = di.learningProgress;
    tutor = di.tutor;
  });

  it('Initial statistics Personal Pronouns', async () => {
    const statsPN = await progress.getLessonStatistics(Lesson.PERSONAL_PRONOUNS_DECLINATION);
    expect(statsPN).to.be.eql({total: 0, wrong: 0});
  });

  it('Initial statistics Interrogative Pronouns', async () => {
    const statsIP = await progress.getLessonStatistics(Lesson.CASES_INTERROGATIVES_DECLINATION);
    expect(statsIP).to.be.eql({total: 0, wrong: 0});
  });

  it('statistics Personal Pronouns', async () => {
    await progress.addCorrect(Lesson.PERSONAL_PRONOUNS_DECLINATION, 'word1');
    expect(await progress.getLessonStatistics(Lesson.PERSONAL_PRONOUNS_DECLINATION)).to.be.eql({total: 1, wrong: 0});
    await progress.addCorrect(Lesson.PERSONAL_PRONOUNS_DECLINATION, 'word1');
    expect(await progress.getLessonStatistics(Lesson.PERSONAL_PRONOUNS_DECLINATION)).to.be.eql({total: 2, wrong: 0});
    await progress.addWrong(Lesson.PERSONAL_PRONOUNS_DECLINATION, 'word1');
    expect(await progress.getLessonStatistics(Lesson.PERSONAL_PRONOUNS_DECLINATION)).to.be.eql({total: 3, wrong: 1});
    await progress.addWrong(Lesson.PERSONAL_PRONOUNS_DECLINATION, 'word2');
    expect(await progress.getLessonStatistics(Lesson.PERSONAL_PRONOUNS_DECLINATION)).to.be.eql({total: 4, wrong: 2});

    expect(await progress.getLessonStatistics(Lesson.CASES_INTERROGATIVES_DECLINATION)).to.be.eql({total: 0, wrong: 0});
  });

  it('statistics Interrogative Pronouns', async () => {
    await progress.addCorrect(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word1');
    expect(await progress.getLessonStatistics(Lesson.CASES_INTERROGATIVES_DECLINATION)).to.be.eql({total: 1, wrong: 0});
    await progress.addCorrect(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word1');
    expect(await progress.getLessonStatistics(Lesson.CASES_INTERROGATIVES_DECLINATION)).to.be.eql({total: 2, wrong: 0});
    await progress.addWrong(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word1');
    expect(await progress.getLessonStatistics(Lesson.CASES_INTERROGATIVES_DECLINATION)).to.be.eql({total: 3, wrong: 1});
    await progress.addWrong(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word2');
    expect(await progress.getLessonStatistics(Lesson.CASES_INTERROGATIVES_DECLINATION)).to.be.eql({total: 4, wrong: 2});

    expect(await progress.getLessonStatistics(Lesson.PERSONAL_PRONOUNS_DECLINATION)).to.be.eql({total: 0, wrong: 0});
  });

  it('observe lesson stats', async () => {
    const promiseLearningStatistics = new Promise<LessonStatistics>(rs => {
      progress.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });

    progress.addCorrect(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word1').then();
    const stats = await promiseLearningStatistics;
    expect(stats).to.be.eql({total: 1, wrong: 0});
  });

  it('observe switch lesson emits another stats', async () => {
    expect(tutor.currentLesson).to.be.eq(Lesson.PERSONAL_PRONOUNS_DECLINATION);
    await progress.addCorrect(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word0');
    await progress.addCorrect(Lesson.CASES_INTERROGATIVES_DECLINATION, 'word00');
    await progress.addWrong(Lesson.PERSONAL_PRONOUNS_DECLINATION, 'word1');

    const promiseLearningStatistics = new Promise<LessonStatistics>(rs => {
      progress.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });
    tutor.selectLesson(Lesson.CASES_INTERROGATIVES_DECLINATION).then();
    const stats = await promiseLearningStatistics;
    expect(stats).to.be.eql({total: 2, wrong: 0});

    const promiseLearningStatistics2 = new Promise<LessonStatistics>(rs => {
      progress.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });
    tutor.selectLesson(Lesson.PERSONAL_PRONOUNS_DECLINATION).then();
    const stats2 = await promiseLearningStatistics2;
    expect(stats2).to.be.eql({total: 1, wrong: 1});
  });

  it('reset', async () => {
    expect(tutor.currentLesson).to.be.eq(Lesson.PERSONAL_PRONOUNS_DECLINATION);
    await progress.addCorrect(tutor.currentLesson, 'word0');
    await progress.addCorrect(tutor.currentLesson, 'word00');

    const stat0 = await progress.getLessonStatistics(tutor.currentLesson);
    expect(stat0).to.be.eql({total: 2, wrong: 0});

    const promiseLearningStatistics = new Promise<LessonStatistics>(rs => {
      progress.observableLessonStatistics()
        .pipe(first())
        .subscribe(s => rs(s));
    });

    progress.reset().then();

    const stats = await promiseLearningStatistics;
    expect(stats).to.be.eql({total: 0, wrong: 0});
  });

  it('promise', async () => {
    expect(tutor.currentLesson).to.be.eq(Lesson.PERSONAL_PRONOUNS_DECLINATION);
    await progress.addCorrect(tutor.currentLesson, 'word0');
    await progress.addCorrect(tutor.currentLesson, 'word00');

    const stat0 = await progress.getLessonStatistics(tutor.currentLesson);
    expect(stat0).to.be.eql({total: 2, wrong: 0});

    const acc: LessonStatistics[] = [];

    await new Promise(rs => {
      fromPromise(progress.getLessonStatistics(tutor.currentLesson))
        .subscribe(
          stat => {
            acc.push(stat);
          },
          log.debug.bind(log),
          () => {
            expect(acc.length).to.be.eq(1);
            expect(acc[0]).to.be.eql({total: 2, wrong: 0});
            rs(0);
          },
        );
    });
  });

  // `concat fromPromise...` makes to hang
  it.skip('concat promise + stream', async () => {
    expect(tutor.currentLesson).to.be.eq(Lesson.PERSONAL_PRONOUNS_DECLINATION);
    await progress.addCorrect(tutor.currentLesson, 'word0');

    const stat0 = await progress.getLessonStatistics(tutor.currentLesson);
    expect(stat0).to.be.eql({total: 1, wrong: 0});

    const acc: LessonStatistics[] = [];

    await new Promise(rs => {
      concat(
        fromPromise(progress.getLessonStatistics(tutor.currentLesson)),
        progress.observableLessonStatistics(),
      ).subscribe(stat => {
        acc.push(stat);
        if (stat.total === 3) {
          expect(acc.length).to.be.eq(3);
          expect(acc[0]).to.be.eql({total: 1, wrong: 0});
          expect(acc[1]).to.be.eql({total: 2, wrong: 0});
          expect(acc[2]).to.be.eql({total: 3, wrong: 1});
          rs(0);
        }
      });
    });
    await progress.addCorrect(tutor.currentLesson, 'word0');
    await progress.addWrong(tutor.currentLesson, 'word0');
  });
});
