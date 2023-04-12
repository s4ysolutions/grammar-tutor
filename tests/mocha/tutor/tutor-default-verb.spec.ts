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

import {use as chaiUse, expect} from 'chai';
import chaiString from 'chai-string';
import {DefaultVerbsDb} from '../../../src/tutor/databases/conjugation/verbs';
import {DefaultTutor} from '../../../src/tutor/tutor/default-tutor';

chaiUse(chaiString);

describe('Tutor verbs', () => {

  it('availablePersonsForAllPluralities', async () => {
    const db = new DefaultVerbsDb();
    const verb = await db.getVerbByMainForm('брисати');
    const persons = DefaultTutor.availablePersonsForAllPluralities(await verb.persons());
    expect(persons.length).to.be.eq(10);
  });
});
