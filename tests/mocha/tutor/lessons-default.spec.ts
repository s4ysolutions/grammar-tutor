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

import {expect} from 'chai';
import {Lesson} from '../../../src/tutor';
import {first} from 'rxjs';
import DefaultLesson from '../../../src/tutor/tutor/default-lesson';
import memoryStorage from '../../mocks/kv/memoryStorage';

describe('Lessons', () => {
  it('Default lesson should be Personal Pronouns', () => {
    const lessonsDb = new DefaultLesson(memoryStorage());
    expect(lessonsDb.currentLesson).to.be.eq(Lesson.NOUNS_DECLINATION);
  });

  it('Lesson cab be changed to Interrogative Pronoun and back to Personal Pronouns', () => {
    const lessonsDb = new DefaultLesson(memoryStorage());
    lessonsDb.selectLesson(Lesson.CASES_INTERROGATIVES_DECLINATION);
    expect(lessonsDb.currentLesson).to.be.eq(Lesson.CASES_INTERROGATIVES_DECLINATION);
  });

  it('Observe change current Lesson', async () => {
    const lessonsDb = new DefaultLesson(memoryStorage());

    const observedLessonPromise = new Promise(rs => {
      lessonsDb.observableCurrentLesson().pipe(first())
        .subscribe(lesson => {
          rs(lesson);
        });
    });
    lessonsDb.selectLesson(Lesson.CASES_INTERROGATIVES_DECLINATION).then();
    const observedLesson = await observedLessonPromise;
    expect(lessonsDb.currentLesson).to.be.eq(Lesson.CASES_INTERROGATIVES_DECLINATION);
    expect(observedLesson).to.be.eq(Lesson.CASES_INTERROGATIVES_DECLINATION);
  });
});
