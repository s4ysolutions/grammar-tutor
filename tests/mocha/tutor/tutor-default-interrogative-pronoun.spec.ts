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
import {
  GrammarAnimation,
  GrammarCase,
  GrammarForm,
  GrammarPlurality,
  Lesson,
  Tutor,
} from '../../../src/tutor';
import sinonApi, {SinonSandbox} from 'sinon';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import {DefaultTutor} from '../../../src/tutor/tutor/default-tutor';
import {DefaultInterrogativePronounsDb} from '../../../src/tutor/databases/declination/interrogative-pronouns';
import DefaultDi from '../../../src/di/default';
import {initDi} from '../../../src/di';
import memoryStorage from '../../mocks/kv/memoryStorage';

chaiUse(chaiString);

describe('Tutor Interrogative Pronouns', () => {
  let tutor: Tutor = null as Tutor;
  let sinon: SinonSandbox;

  beforeEach(async () => {
    sinon = sinonApi.createSandbox();
    const di = new DefaultDi(memoryStorage({}), memoryStoragePromiseFactory({}));
    initDi(di);
    tutor = di.tutor;
    await tutor.selectLesson(Lesson.INTERROGATIVE_PRONOUNS_DECLINATION);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('ко,што should have a case', async () => {
    const db = new DefaultInterrogativePronounsDb();
    const word = 'ко,што';
    const entry = await db.getNounByMainForm(word);
    const cases = await entry.cases();
    const c = await DefaultTutor.caseForInterrogativePronounTestWrapper(cases, GrammarCase.GENITIVE, GrammarPlurality.SINGULAR, GrammarAnimation.ANIMATE, GrammarForm.SHORT);
    expect(c).has.property('animation', GrammarAnimation.ANIMATE);
    expect(c).has.property('case', GrammarCase.GENITIVE);
    expect(c).has.property('form', GrammarForm.SHORT);
    expect(c).has.property('plurality', GrammarPlurality.SINGULAR);
    expect(c).has.property('word', 'ко̏г');
  });

  it('ко,што should provide excercise', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.PLURAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.GENITIVE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // sinon.replace(DefaultTutor, 'randomGender', sinon.fake.returns(GrammarGender.FEMININE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomAnimation', sinon.fake.returns(GrammarAnimation.ANIMATE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ко,што']));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ко,што');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'ко̀га');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.PLURAL);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.GENITIVE);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.LONG);
    expect(exercise.exerciseCase).to.not.has.property('gender');
    expect(exercise.exerciseCase).to.has.property('animation', GrammarAnimation.ANIMATE);

    expect(await tutor.checkCaseExercise('ко̀га', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

  it('ко,што should provide excercise for Plural Nominative Inanimate Short', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.PLURAL));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.NOMINATIVE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.SHORT));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // sinon.replace(DefaultTutor, 'availableGendersForPluralityAndCase', sinon.fake.returns([]));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomAnimation', sinon.fake.returns(GrammarAnimation.INANIMATE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ко,што']));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ко,што');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'што̏, шта̏');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.PLURAL);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.NOMINATIVE);
    expect(exercise.exerciseCase).to.not.has.property('form');
    expect(exercise.exerciseCase).to.not.has.property('gender');
    expect(exercise.exerciseCase).to.has.property('animation', GrammarAnimation.INANIMATE);

    expect(await tutor.checkCaseExercise('што̏, шта̏', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });
});
