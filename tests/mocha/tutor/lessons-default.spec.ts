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
import {expect} from 'chai';
import {Lesson} from '../../../src/tutor';
import {first} from 'rxjs';

describe('Lessons', () => {
  it('Default lesson should be Personal Pronouns', () => {
    const lessonsDb = new DefaultLessonsDb();
    expect(lessonsDb.currentLesson).to.be.eq(Lesson.PersonalPronounsCases);
  });

  it('Lesson cab be changed to Interrogative Pronoun and back to Personal Pronouns', () => {
    const lessonsDb = new DefaultLessonsDb();
    lessonsDb.selectLesson(Lesson.InterrogativePronouns);
    expect(lessonsDb.currentLesson).to.be.eq(Lesson.InterrogativePronouns);
  });

  it('Observe change current Lesson', async () => {
    const lessonsDb = new DefaultLessonsDb();

    const observedLessonPromise = new Promise(rs => {
      lessonsDb.observableCurrentLesson().pipe(first())
        .subscribe(lesson => {
          rs(lesson);
        });
    });
    lessonsDb.selectLesson(Lesson.InterrogativePronouns);
    const observedLesson = await observedLessonPromise;
    expect(lessonsDb.currentLesson).to.be.eq(Lesson.InterrogativePronouns);
    expect(observedLesson).to.be.eq(Lesson.InterrogativePronouns);
  });
});
