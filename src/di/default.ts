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

import indexedDbFactory from '../kv/promise/indexedDB';
import {CasesInterrogativesPronounsDb, LearningProgress, NounsDb, Tutor} from '../tutor';
import {DefaultRouter} from '../router/default';
import {Router} from '../router';
import {DefaultUiState} from '../ui-state/default';
import {UiState} from '../ui-state';
import {Di} from './index';
import {DefaultPersonalPronounsDb} from '../tutor/databases/case/personal-pronouns';
import {DefaultInterrogativesDb} from '../tutor/databases/case/interrogatives';
import DefaultLesson from '../tutor/tutor/default-lesson';
import {KvPromiseLearningDb} from '../tutor/progress/kv-promise-progress-db';
import {DefaultCasesInterrogativesDb} from '../tutor/databases/case/cases-interrogatives';
import {DefaultTutor} from '../tutor/tutor/default-tutor';
import {KvPromise} from '../kv/promise';

export class DefaultDi implements Di {
  private readonly _kvPromise: KvPromise;

  private readonly _personalPronounsDb: NounsDb;

  private readonly _interrogativesPronounsDb: NounsDb;

  private readonly _casesInterrogativesDb: CasesInterrogativesPronounsDb;

  private readonly _lesson = new DefaultLesson();

  private readonly _learningProgress: LearningProgress;

  private readonly _tutor: Tutor;

  private readonly _router = new DefaultRouter();

  private readonly _uiState = new DefaultUiState();

  constructor(kvPromise: KvPromise) {
    this._kvPromise = kvPromise;
    this._personalPronounsDb = new DefaultPersonalPronounsDb();
    this._interrogativesPronounsDb = new DefaultInterrogativesDb();
    this._casesInterrogativesDb = new DefaultCasesInterrogativesDb();
    this._learningProgress = new KvPromiseLearningDb(this._kvPromise, this._lesson.observableCurrentLesson());
    this._tutor = new DefaultTutor(
      this._personalPronounsDb,
      this._interrogativesPronounsDb,
      this._casesInterrogativesDb,
      this._learningProgress,
      this._lesson,
    );
  }

  get learningProgress (): LearningProgress {
    return this._learningProgress;
  }

  get personPronounsDb (): NounsDb {
    return this._personalPronounsDb;
  }

  get interrogativesDb (): NounsDb {
    return this._interrogativesPronounsDb;
  }

  get interrogativePronounsDb (): CasesInterrogativesPronounsDb {
    return this._casesInterrogativesDb;
  }

  get router (): Router {
    return this._router;
  }

  get tutor (): Tutor {
    return this._tutor;
  }

  get uiState (): UiState {
    return this._uiState;
  }
}

const singletonDi = new DefaultDi(indexedDbFactory('srpska-gramatika'));

export const getDi = (): Di => singletonDi;
