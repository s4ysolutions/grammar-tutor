/*
 * Copyright 2023 by s4y.solutions
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

import {SlevVerbPresentRuleId, slevVerbRules} from '../../../src/tutor/databases/rules/slev-verbs';
import chai, {expect} from 'chai';
import assertArrays from 'chai-arrays';
chai.use(assertArrays);

describe('Slev rules', () => {
  it('array of verb ids', () => {
    const slevVerbRulesWithKeys = Object.entries(slevVerbRules)
      .filter(entry => entry[0] !== SlevVerbPresentRuleId.NONE.toString())
      .map(entry => ({...entry[1], id: entry[0] as keyof typeof SlevVerbPresentRuleId}));

    expect(slevVerbRulesWithKeys).to.be.ofSize(Object.entries(slevVerbRules).length - 1);
  });

  it('array of verb rules ids', () => {
    const slevVerbIds = Object.entries(SlevVerbPresentRuleId);
    // .filter(entry => entry[0] !== SlevVerbPresentRuleId.NONE.toString());

    expect(slevVerbIds).to.be.ofSize(Object.entries(slevVerbRules).length * 2);
  });
});
