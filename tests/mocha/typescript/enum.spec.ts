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

import '../../../src/array/shuffle';
import {expect} from 'chai';
import {GrammarCase, GrammarForm} from '../../../src/tutor';

describe('iterate enum', () => {
  it('Object.values(enum)', () => {
    const values = Object.values(GrammarCase);
    expect(values).has.property('length', 7);
    expect(values[0]).to.be.eq('Nominative');
  });
  it('Object.entries(enum)', () => {
    const values = Object.entries(GrammarCase);
    expect(values).has.property('length', 7);
    expect(values[0]).to.be.eql(['NOMINATIVE', 'Nominative']);
  });
  it('enum[key]', () => {
    const values = Object.entries(GrammarCase);
    expect(values).has.property('length', 7);
    const key = values[0][0] as keyof typeof GrammarCase;
    expect(GrammarCase[key]).to.be.eq(GrammarCase.NOMINATIVE);
  });
  it('enum sorting', () => {
    expect(GrammarForm.LONG < GrammarForm.SHORT).to.be.true;
    expect(GrammarForm.LONG > GrammarForm.SHORT).to.be.false;
  });

  it('enum element to boolean', () => {
    expect(!GrammarForm.LONG).to.be.false;
    expect(Boolean(GrammarForm.LONG)).to.be.true;
    expect(!GrammarForm.SHORT).to.be.false;
    expect(Boolean(GrammarForm.SHORT)).to.be.true;
  });
});
