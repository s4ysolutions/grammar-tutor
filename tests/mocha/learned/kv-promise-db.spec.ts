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
import {KvPromiseLearningDB} from '../../../src/tutor/learned/kv-promise-db';
import {LearnedWordStatistics} from '../../../src/tutor';

chaiUse(chaiString);

describe('Test rv-promise implementation of learned db', () => {
  it('Save and restore', async () => {
    const kv = await memoryStoragePromiseFactory();
    const db = new KvPromiseLearningDB(kv);

    const stat1 = await db.getWordStatistics('non existing');
    expect(stat1).to.has.property('shownCount', 0);
    expect(stat1).to.has.property('wrongCount', 0);
    expect(stat1).to.has.property('last');
    expect(stat1.last.getTime()).to.be.eq(new Date(0).getTime());
    expect(stat1).to.has.property('weight', 10);
  });

  it('statistics', async () => {
    const kv = await memoryStoragePromiseFactory();
    const db = new KvPromiseLearningDB(kv);

    let stat: LearnedWordStatistics;
    let prevDate: number;

    prevDate = new Date().getTime();
    await db.addCorrect('word1');
    stat = await db.getWordStatistics('word1');
    expect(stat).to.has.property('shownCount', 1);
    expect(stat).to.has.property('wrongCount', 0);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gte(prevDate);
    expect(stat).to.has.property('weight', 1);

    prevDate = new Date().getTime();
    await db.addCorrect('word1');
    stat = await db.getWordStatistics('word1');
    expect(stat).to.has.property('shownCount', 2);
    expect(stat).to.has.property('wrongCount', 0);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);

    prevDate = new Date().getTime();
    await db.addWrong('word1');
    stat = await db.getWordStatistics('word1');
    expect(stat).to.has.property('shownCount', 3);
    expect(stat).to.has.property('wrongCount', 1);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);

    prevDate = new Date().getTime();
    await db.addWrong('word1');
    stat = await db.getWordStatistics('word1');
    expect(stat).to.has.property('shownCount', 4);
    expect(stat).to.has.property('wrongCount', 2);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 2);

    prevDate = new Date().getTime();
    await db.addWrong('word2');
    stat = await db.getWordStatistics('word2');
    expect(stat).to.has.property('shownCount', 1);
    expect(stat).to.has.property('wrongCount', 1);
    expect(stat).to.has.property('last');
    expect(stat.last.getTime()).to.be.gt(prevDate);
    expect(stat).to.has.property('weight', 1);
  });
});
