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

import {
  GrammarCase,
  GrammarForm,
  GrammarGender,
  GrammarPlurality,
  LearningDB,
  NounEntry,
  NounsDB,
  Teacher,
} from './index';

export class DefaultTeacher implements Teacher {
  private readonly pronounsDB: NounsDB;

  private readonly learningDB: LearningDB;

  constructor(pronounsDB: NounsDB, learningDB: LearningDB) {
    this.pronounsDB = pronounsDB;
    this.learningDB = learningDB;
  }

  nextPronoun(): Promise<NounEntry> {
    return this.pronounsDB.words.then(wordsSet => {
      const statPromises: Promise<[string, number]>[] = wordsSet.map(word => this.learningDB.getWordStatistics(word).then(stat => [word, stat.weight]));
      return Promise.all(statPromises)
        .then(wordweights => {
          const weighted: string[] = wordweights.map(([word, weight]) => Array(weight).fill(word)).flat();
          const i = Math.floor(Math.random() * weighted.length);
          const word = weighted[i];
          return this.pronounsDB.getWordEntry(word);
        });
    });
  }

  checkPronoun(wordToCheck: string, grammarCase: GrammarCase, grammarPlurality: GrammarPlurality, grammaGender: GrammarGender, grammarForm?: GrammarForm): Promise<boolean> {
    return this.pronounsDB.getWordEntry(wordToCheck).then(entry =>
      entry.forms(grammarCase, grammarPlurality).then(cases => {
        if (cases.length === 0) {
          return false;
        }
        if (cases.length === 1) {
          return (cases[0].word === wordToCheck);
        }
        const filterd = cases.filter(c => {
          if (grammaGender && (grammaGender !== c.gender)) {
            return false;
          }
          if (grammarForm && (grammarForm !== c.form)) {
            return false;
          }
          return true;
        });
        if (filterd.length === 0) {
          return false;
        }
        if (filterd.length === 1) {
          return filterd[0].word === wordToCheck;
        }
        for (const f of filterd) {
          if (f.word === wordToCheck) {
            return true;
          }
        }
        return false;
      }));
  }
}
