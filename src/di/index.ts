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

import {DefaultPronounsDB} from '../tutor/pronouns/default';
import indexedDbFactory from '../kv/promise/indexedDB';
import {DefaultTutor} from '../tutor/tutor/default';
import {Tutor} from '../tutor';
import {KvPromiseLearningDB} from '../tutor/learned/kv-promise-db';
import {DefaultRouter} from '../router/default';
import {Router} from '../router';

const singletonPromiseKV = indexedDbFactory('sluchaj-zamenica');
const singletonPronounsDB = new DefaultPronounsDB();
const singletonLearnedDB = new KvPromiseLearningDB(singletonPromiseKV);
const singletonTutor = new DefaultTutor(singletonPronounsDB, singletonLearnedDB);

const singletonRouter = new DefaultRouter();

export const getTutor = (): Tutor => singletonTutor;
export const getRouter = (): Router => singletonRouter;