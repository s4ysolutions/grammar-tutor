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
import {GrammarCase, GrammarGender, GrammarPlurality, Lesson, Tutor} from '../../../src/tutor';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import sinonApi, {SinonSandbox} from 'sinon';
import {DefaultDi} from '../../../src/di/default';
import {DefaultTutor} from '../../../src/tutor/tutor/default-tutor';

chaiUse(chaiString);

describe('Tutor Nouns', () => {
  let tutor: Tutor;
  let sinon: SinonSandbox;

  beforeEach(async () => {
    sinon = sinonApi.createSandbox();
    const di = new DefaultDi(memoryStoragePromiseFactory({}));
    tutor = di.tutor;
    await tutor.selectLesson(Lesson.NOUNS_DECLINATION);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('nextCaseExercise', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'hotel');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'хотелом');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.INSTRUMENTAL);
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.MASCULINE);
    expect(exercise.exerciseCase).to.not.has.property('form');

    expect(await tutor.checkCaseExercise('хотелом', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

  it('nextCaseExercise plural', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line prefer-arrow-callback
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake(function fake(arr) {
      return arr.map((x:{word: string}) => x.word);
    }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(1));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.PLURAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'путник');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'путницима');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.PLURAL);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.INSTRUMENTAL);
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.MASCULINE);
    expect(exercise.exerciseCase).to.not.has.property('form');

    expect(await tutor.checkCaseExercise('путницима', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

});
