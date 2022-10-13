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

import {LearnedWordStaticsBean, LearnedWordStatistics} from '../index';

const MAX_WEIGHT = 10;
const DAY_MILLISECONDS = 86400000;

export class DefaultLearnedWordStatistics implements LearnedWordStatistics {
  shownCount: number;

  wrongCount: number;

  last: Date;

  constructor(shownTimes: number, wrongTimes: number, last: Date) {
    this.shownCount = shownTimes;
    this.wrongCount = wrongTimes;
    this.last = last;
  }

  static fromBean(learnedWordStatistics: LearnedWordStaticsBean): DefaultLearnedWordStatistics {
    return new DefaultLearnedWordStatistics(
      learnedWordStatistics.shownCount,
      learnedWordStatistics.wrongCount,
      learnedWordStatistics.last,
    );
  }

  get weight(): number {
    if (this.shownCount === 0) {
      return MAX_WEIGHT;
    }
    if (this.wrongCount === 0) {
      const daysAgo = ((new Date().getTime()) - this.last.getTime()) / DAY_MILLISECONDS;
      return daysAgo > MAX_WEIGHT ? MAX_WEIGHT : daysAgo;
    }
    return this.wrongCount > MAX_WEIGHT ? MAX_WEIGHT : this.wrongCount;
  }
}
