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
import {CasesInterrogativesDb, LearningProgress, NounsDb, Tutor, VerbsDb} from '../tutor';
import {DefaultRouter} from '../router/default';
import {Router} from '../router';
import {DefaultUiState} from '../ui-state/default';
import {UiState} from '../ui-state';
import {Di, DiFactory} from './index';
import {DefaultPersonalPronounsDb} from '../tutor/databases/declination/personal-pronouns';
import DefaultLesson from '../tutor/tutor/default-lesson';
import {KvPromiseLearningDb} from '../tutor/progress/kv-promise-progress-db';
import {DefaultTutor} from '../tutor/tutor/default-tutor';
import {KvPromise} from '../kv/promise';
import {DefaultCaseInterrogativesDb} from '../tutor/databases/declination/case-interrogatives';
import {DefaultInterrogativePronounsDb} from '../tutor/databases/declination/interrogative-pronouns';
import {DefaultBitiDb} from '../tutor/databases/conjugation/biti';
import {DefaultNounsDb} from '../tutor/databases/declination/nouns';
import {DefaultHtetiDb} from '../tutor/databases/conjugation/hteti';
import {DefaultVerbsDb} from '../tutor/databases/conjugation/verbs';
import {DefaultReflexivePronounsDb} from '../tutor/databases/declination/reflexive-pronouns';
import {DefaultPossessivePronounsDb} from '../tutor/databases/declination/possessive-pronouns';
import {DefaultMociDb} from '../tutor/databases/conjugation/moci';
import localStorageFactory from '../kv/sync/localStorage';

export class DefaultDi implements Di {

  private readonly _kvSync = localStorageFactory();

  private readonly _kvPromise: KvPromise;

  private readonly _personalPronounsDb: NounsDb;

  private readonly _reflexivePronounsDb: NounsDb;

  private readonly _possessivePronounsDb: NounsDb;

  private readonly _interrogativePronounsDb: NounsDb;

  private readonly _caseInterrogativesDb: CasesInterrogativesDb;

  private readonly _nounsDb: NounsDb;

  private readonly _bitiDb: VerbsDb;

  private readonly _htetiDb: VerbsDb;

  private readonly _mociDb: VerbsDb;

  private readonly _verbsDb: VerbsDb;

  private readonly _lesson = new DefaultLesson(this._kvSync);

  private readonly _learningProgress: LearningProgress;

  private readonly _tutor: Tutor;

  private readonly _router = new DefaultRouter(this._kvSync);

  private readonly _uiState = new DefaultUiState();

  constructor(kvPromise: KvPromise) {
    this._kvPromise = kvPromise;
    this._personalPronounsDb = new DefaultPersonalPronounsDb();
    this._reflexivePronounsDb = new DefaultReflexivePronounsDb();
    this._possessivePronounsDb = new DefaultPossessivePronounsDb();
    this._interrogativePronounsDb = new DefaultInterrogativePronounsDb();
    this._caseInterrogativesDb = new DefaultCaseInterrogativesDb();
    this._nounsDb = new DefaultNounsDb();
    this._bitiDb = new DefaultBitiDb();
    this._htetiDb = new DefaultHtetiDb();
    this._mociDb = new DefaultMociDb();
    this._verbsDb = new DefaultVerbsDb();
    this._learningProgress = new KvPromiseLearningDb(this._kvPromise, this._lesson.observableCurrentLesson());
    this._tutor = new DefaultTutor(
      this._personalPronounsDb,
      this._reflexivePronounsDb,
      this._possessivePronounsDb,
      this._interrogativePronounsDb,
      this._caseInterrogativesDb,
      this._nounsDb,
      this._bitiDb,
      this._htetiDb,
      this._mociDb,
      this._verbsDb,
      this._learningProgress,
      this._lesson,
    );
  }

  get learningProgress(): LearningProgress {
    return this._learningProgress;
  }

  get personalPronounsDb(): NounsDb {
    return this._personalPronounsDb;
  }

  get reflexivePronounsDb(): NounsDb {
    return this._reflexivePronounsDb;
  }

  get possessivePronounsDb(): NounsDb {
    return this._reflexivePronounsDb;
  }

  get interrogativePronounsDb(): NounsDb {
    return this._interrogativePronounsDb;
  }

  get caseInterrogativesDb(): CasesInterrogativesDb {
    return this._caseInterrogativesDb;
  }

  get router(): Router {
    return this._router;
  }

  get tutor(): Tutor {
    return this._tutor;
  }

  get uiState(): UiState {
    return this._uiState;
  }

}

const singletonDi = new DefaultDi(indexedDbFactory('srpska-gramatika'));

const diFactory: DiFactory = {
  di: singletonDi as Di,
};

export default diFactory;
