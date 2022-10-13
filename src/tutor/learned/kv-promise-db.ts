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

import {LearnedWordStaticsBean, LearnedWordStatistics, LearningDB} from '../index';
import {KvPromise} from '../../kv/promise';
import {DefaultLearnedWordStatistics} from './default-statistics';

const PREFIX = 'ldb@';
const NEVER = new Date(0);

export class KvPromiseLearningDB implements LearningDB {
  private readonly kv: KvPromise;

  constructor(kvPromise: KvPromise) {
    this.kv = kvPromise;
  }

  private getStats(word: string): Promise<LearnedWordStaticsBean> {
    return this.kv.get<LearnedWordStaticsBean | null>(`${PREFIX}${word}`, null)
      .then(s => s === null ? {shownCount: 0, wrongCount: 0, last: NEVER} : s);
  }

  private setStats(word: string, bean: LearnedWordStaticsBean): Promise<void> {
    return this.kv.set<LearnedWordStaticsBean>(`${PREFIX}${word}`, bean);
  }

  private updateStats(word: string, wrongInc: number): Promise<void> {
    return this.getWordStatistics(word).then(stats =>
      this.setStats(
        word,
        {
          shownCount: stats.shownCount + 1,
          wrongCount: stats.wrongCount + wrongInc,
          last: new Date(),
        },
      ));
  }

  getWordStatistics(word: string): Promise<LearnedWordStatistics> {
    return this.getStats(word)
      .then(bean => DefaultLearnedWordStatistics.fromBean(bean));
  }

  addCorrect(word: string): Promise<void> {
    return this.updateStats(word, 0);
  }

  addWrong(word: string): Promise<void> {
    return this.updateStats(word, 1);
  }
}
