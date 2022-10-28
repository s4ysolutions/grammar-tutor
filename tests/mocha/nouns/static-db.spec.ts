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

// noinspection BadExpressionStatementJS

import {use as chaiUse, expect} from 'chai';
import chaiArray from 'chai-arrays';
import {DefaultNounsDb} from '../../../src/tutor/databases/declination/nouns';
import {GrammarCase, GrammarGender, GrammarPlurality} from '../../../src/tutor';

chaiUse(chaiArray);

describe('Test static data implementation of nouns db', () => {
  it('db integrity', async () => {
    const db = new DefaultNounsDb();
    const mainForms = await db.mainForms;
    for (const mainForm of mainForms) {
      // eslint-disable-next-line no-await-in-loop
      const entry = await db.getNounByMainForm(mainForm);
      expect(entry).to.not.be.null;
      expect(entry).has.property('mainForm', mainForm);
      expect(entry).has.property('cases');
      // eslint-disable-next-line no-await-in-loop
      const cases = await entry.cases();
      const plurals = cases.filter(f => f.plurality === GrammarPlurality.PLURAL);
      expect(plurals.length).to.be.eq(7);
      const singulars = cases.filter(f => f.plurality === GrammarPlurality.SINGULAR);
      expect(singulars.length).to.be.eq(7);

      const pcase: Set<GrammarCase> = plurals.reduce((acc, current) => {
        acc.add(current.case);
        return acc;
      }, new Set<GrammarCase>());
      expect(Array.from(pcase).sort()).to.be.eql([
        'Accusative',
        'Dative',
        'Genitive',
        'Instrumental',
        'Locative',
        'Nominative',
        'Vocative',
      ]);

      const scase: Set<GrammarCase> = singulars.reduce((acc, current) => {
        acc.add(current.case);
        return acc;
      }, new Set<GrammarCase>());
      expect(Array.from(scase).sort()).to.be.eql([
        'Accusative',
        'Dative',
        'Genitive',
        'Instrumental',
        'Locative',
        'Nominative',
        'Vocative',
      ]);

      const genders: Set<GrammarGender> = singulars.reduce((acc, current) => {
        acc.add(current.gender);
        return acc;
      }, new Set<GrammarGender>());
      expect(Array.from(genders).length).to.be.eq(1);
      expect(genders.has(undefined)).to.be.false;
      expect(genders.has(cases[0].gender)).to.be.true;
    }
  });
});
