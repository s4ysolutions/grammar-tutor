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
import {GrammarForm, GrammarPerson, GrammarPlurality, Lesson, Tutor} from '../../../src/tutor';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import sinonApi, {SinonSandbox} from 'sinon';
import {DefaultDi} from '../../../src/di/default';
import {DefaultTutor} from '../../../src/tutor/tutor/default-tutor';

chaiUse(chaiString);

describe('Tutor verb Biti', () => {
  let tutor: Tutor;
  let sinon: SinonSandbox;

  beforeEach(async () => {
    sinon = sinonApi.createSandbox();
    const di = new DefaultDi(memoryStoragePromiseFactory({}));
    tutor = di.tutor;
    await tutor.selectLesson(Lesson.BITI_CONJUGATION);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('nextConjugationExercise', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPerson', sinon.fake.returns(GrammarPerson.FIRST));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));

    const exercise = await tutor.nextConjugationExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'би̏ти');
    expect(exercise).to.has.property('exercisePerson');
    expect(exercise.exercisePerson).to.has.property('word', 'јесам');
    expect(exercise.exercisePerson).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exercisePerson).to.has.property('person', GrammarPerson.FIRST);
    expect(exercise.exercisePerson).to.has.property('form', GrammarForm.LONG);

    expect(await tutor.checkConjugationExercise('јесам', exercise)).to.be.true;
    expect(await tutor.checkConjugationExercise('nnn', exercise)).to.be.false;
  });

});
