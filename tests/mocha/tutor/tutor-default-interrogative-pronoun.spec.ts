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
import {GrammarAnimation, GrammarCase, Lesson, Tutor} from '../../../src/tutor';
import sinonApi, {SinonSandbox} from 'sinon';
import {DefaultDi} from '../../../src/di/default';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import {DefaultTutor} from '../../../src/tutor/tutor/default-tutor';

chaiUse(chaiString);

describe('Tutor Interrogative Pronouns', () => {
  let tutor: Tutor = null as Tutor;
  let sinon: SinonSandbox;

  beforeEach(async () => {
    sinon = sinonApi.createSandbox();
    const di = new DefaultDi(memoryStoragePromiseFactory({}));
    tutor = di.tutor;
    await tutor.selectLesson(Lesson.CASES_INTERROGATIVES_DECLINATION);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('nextInterrogativePronounExerciseSelectWord', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomAnimation', sinon.fake.returns(GrammarAnimation.ANIMATE));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'Упитне заменице');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'ки́ме');
    expect(exercise.exerciseCase).to.has.property('animation', GrammarAnimation.ANIMATE);

    expect(await tutor.checkCaseExercise('ки́ме', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

  it('one case should not cause endless loop', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomAnimation', sinon.fake.returns(GrammarAnimation.ANIMATE));

    const exercise1 = await tutor.nextCaseExercise();
    expect(exercise1).is.not.null;
    expect(exercise1).to.has.property('mainForm', 'Упитне заменице');

    const exercise2 = await tutor.nextCaseExercise();
    expect(exercise2).is.not.null;
    expect(exercise2).to.has.property('mainForm', 'Упитне заменице');
  });

  it('one case should not call random', async () => {
    const randomFake = sinon.fake();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', randomFake);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomAnimation', sinon.fake.returns(GrammarAnimation.ANIMATE));

    await tutor.nextCaseExercise();
    expect(randomFake.called).to.be.false;

    await tutor.nextCaseExercise();
    expect(randomFake.called).to.be.false;
  });
});
