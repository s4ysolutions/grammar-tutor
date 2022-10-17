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
import chaiArray from 'chai-arrays';
import {DefaultPersonalPronounsDb} from '../../../src/tutor/pronouns-personal/default';
import {GrammarCase, GrammarForm, GrammarPlurality} from '../../../src/tutor';

chaiUse(chaiArray);

describe('Test static data implementation of pronouns db', () => {
  it('Words has jа', async () => {
    const db = new DefaultPersonalPronounsDb();
    const words = await db.words;
    expect(words).to.be.array;
    expect(words).to.be.eql(['ја', 'ти', 'он, она, оно']);
  });
  it('jа attributes', async () => {
    const word = 'ја';
    const db = new DefaultPersonalPronounsDb();
    const entry = await db.getNoun(word);
    expect(entry).has.property('mainForm', word);
    expect(entry).has.property('cases');
    const forms = (await entry.cases())
      .filter(c => c.case === GrammarCase.NOMINATIVE && c.plurality === GrammarPlurality.SINGULAR);
    // noinspection BadExpressionStatementJS
    expect(forms).to.be.array;
    expect(forms).to.be.ofSize(1);
    const yaForm = forms[0];
    expect(yaForm).has.property('word', 'ја');
    expect(yaForm).has.property('case', GrammarCase.NOMINATIVE);
    expect(yaForm).has.property('plurality', GrammarPlurality.SINGULAR);
    expect(yaForm).has.not.property('form');
    expect(yaForm).has.not.property('gender');
  });
  it('mi(gen) attributes', async () => {
    const word = 'ти';
    const db = new DefaultPersonalPronounsDb();
    const entry = await db.getNoun(word);
    expect(entry).has.property('mainForm', word);
    expect(entry).has.property('cases');
    const forms = (await entry.cases())
      .filter(c => c.case === GrammarCase.GENITIVE && c.plurality === GrammarPlurality.SINGULAR);
    expect(forms).to.be.array;
    expect(forms).to.be.ofSize(2);
    const yaFormShort = forms[0];
    expect(yaFormShort).has.property('word', 'те');
    expect(yaFormShort).has.property('case', GrammarCase.GENITIVE);
    expect(yaFormShort).has.property('plurality', GrammarPlurality.SINGULAR);
    expect(yaFormShort).has.property('form', GrammarForm.SHORT);
    expect(yaFormShort).has.not.property('gender', GrammarForm);
    const yaFormLong = forms[1];
    expect(yaFormLong).has.property('word', 'те̏бе');
    expect(yaFormLong).has.property('case', GrammarCase.GENITIVE);
    expect(yaFormLong).has.property('plurality', GrammarPlurality.SINGULAR);
    expect(yaFormLong).has.property('form', GrammarForm.LONG);
    expect(yaFormLong).has.not.property('gender', GrammarForm);
  });
});
