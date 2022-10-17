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

import {Observable, Subject} from 'rxjs';
import {Lesson, LessonsDb} from '../index';

export class DefaultLessonsDb implements LessonsDb {
  currentLesson: Lesson = Lesson.PersonalPronounsCases;

  private readonly subjectCurrentLesson = new Subject<Lesson>();

  observableCurrentLesson(): Observable<Lesson> {
    return this.subjectCurrentLesson;
  }

  selectLesson(lesson: Lesson): Promise<void> {
    this.currentLesson = lesson;
    this.subjectCurrentLesson.next(lesson);
    return Promise.resolve();
  }
}
