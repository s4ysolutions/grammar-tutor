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
  GrammarAnimation,
  GrammarCase,
  InterrogativePronoun,
  InterrogativePronounCase,
  InterrogativePronounsDb,
} from '../index';

const staticPronouns: Record<string, InterrogativePronounCase[]> = {
  'Упитне заменице': [
    {
      word: 'ко̏',
      case: GrammarCase.NOMINATIVE,
      animation: GrammarAnimation.ANIMATE,
    },
    {
      word: 'шта̏',
      case: GrammarCase.NOMINATIVE,
      animation: GrammarAnimation.INANIMATE,
    },
    {
      word: 'ко̀га',
      case: GrammarCase.GENITIVE,
      animation: GrammarAnimation.ANIMATE,
    },
    {
      word: 'чѐга',
      case: GrammarCase.GENITIVE,
      animation: GrammarAnimation.INANIMATE,
    },
    {
      word: 'ко̀му, ко̀ме',
      case: GrammarCase.DATIVE,
      animation: GrammarAnimation.ANIMATE,
    },
    {
      word: 'чѐму',
      case: GrammarCase.DATIVE,
      animation: GrammarAnimation.INANIMATE,
    },
    {
      word: 'ко̀га, ку̀да',
      case: GrammarCase.ACCUSATIVE,
      animation: GrammarAnimation.ANIMATE,
    },
    {
      word: 'шта̏, ку̀да',
      case: GrammarCase.ACCUSATIVE,
      animation: GrammarAnimation.INANIMATE,
    },
    {
      word: 'ки́ме',
      case: GrammarCase.INSTRUMENTAL,
      animation: GrammarAnimation.ANIMATE,
    },
    {
      word: 'чи́ме',
      case: GrammarCase.INSTRUMENTAL,
      animation: GrammarAnimation.INANIMATE,
    },
    {
      word: 'о ко̀ме, где̏',
      case: GrammarCase.LOCATIVE,
      animation: GrammarAnimation.ANIMATE,
    },
    {
      word: 'о чѐму, где̏',
      case: GrammarCase.LOCATIVE,
      animation: GrammarAnimation.INANIMATE,
    },
  ],
};

class StaticInterrogativePronounEntry implements InterrogativePronoun {
  mainForm: string;

  constructor(mainForm: string) {
    this.mainForm = mainForm;
  }

  cases(): Promise<InterrogativePronounCase[]> {
    return Promise.resolve(staticPronouns[this.mainForm]);
  }
}

export class DefaultInterrogativePronounsDb implements InterrogativePronounsDb {
  private wordsSet: string[] | null = null;

  get words(): Promise<string[]> {
    if (this.wordsSet === null) {
      this.wordsSet = Object.keys(staticPronouns);
    }
    return Promise.resolve(this.wordsSet);
  }

  // eslint-disable-next-line class-methods-use-this
  getPronoun(word: string): Promise<InterrogativePronoun> {
    return Promise.resolve(new StaticInterrogativePronounEntry(word));
  }

}
