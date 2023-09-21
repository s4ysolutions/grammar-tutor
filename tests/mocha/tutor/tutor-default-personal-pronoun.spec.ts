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
  GrammarGender,
  GrammarPlurality,
  Lesson,
  Tutor,
} from '../../../src/tutor';
import memoryStoragePromiseFactory from '../../mocks/kv-promice/memoryStorage';
import sinonApi, {SinonSandbox} from 'sinon';
import {DefaultTutor} from '../../../src/tutor/tutor/default-tutor';
import memoryStorage from '../../mocks/kv/memoryStorage';
import DefaultDi from '../../../src/di/default';

chaiUse(chaiString);

describe('Tutor Personal Pronouns', () => {
  let tutor: Tutor;
  let sinon: SinonSandbox;

  beforeEach(async () => {
    sinon = sinonApi.createSandbox();
    const di = new DefaultDi(memoryStorage({}), memoryStoragePromiseFactory({}));
    tutor = di.tutor;
    await tutor.selectLesson(Lesson.PERSONAL_PRONOUNS_DECLINATION);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('nextPersonalPronounExerciseSelectWord without forms and genders', async () => {
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
    expect(exercise).to.has.property('mainForm', 'ја');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'мно̑м, мно́ме');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.INSTRUMENTAL);
    expect(exercise.exerciseCase).to.not.has.property('gender');
    expect(exercise.exerciseCase).to.not.has.property('form');

    expect(await tutor.checkCaseExercise('мно̑м, мно́ме', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

  it('nextPronounQuestion with form and without gender', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.GENITIVE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.LONG));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'ја');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'ме̏не');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.GENITIVE);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.LONG);
    expect(exercise.exerciseCase).to.not.has.property('gender');

    expect(await tutor.checkCaseExercise('ме̏не', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

  it('nextPronounQuestion with gender and no form', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(2));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.INSTRUMENTAL));
    // this random must be ignored because "on" is alway MASCULINE
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomGender', sinon.fake.returns(GrammarGender.FEMININE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['ја', 'ти', 'он', 'она', 'оно']));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'он');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'њи̑м, њи́ме');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.INSTRUMENTAL);
    expect(exercise.exerciseCase).to.not.has.property('form');
    // requested FEMAIL is ignored because "on" is alway MASCULINE
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.MASCULINE);

    expect(await tutor.checkCaseExercise('њи̑м, њи́ме', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });

  it('nextPronounQuestion with form and gender', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'random', sinon.fake.returns(0));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomPlurality', sinon.fake.returns(GrammarPlurality.SINGULAR));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomCase', sinon.fake.returns(GrammarCase.GENITIVE));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomForm', sinon.fake.returns(GrammarForm.SHORT));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'randomAnimation', sinon.fake.returns(null));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sinon.replace(DefaultTutor, 'getWeightedArray', sinon.fake.returns(['он']));

    const exercise = await tutor.nextCaseExercise();
    expect(exercise).is.not.null;
    expect(exercise).to.has.property('mainForm', 'он');
    expect(exercise).to.has.property('exerciseCase');
    expect(exercise.exerciseCase).to.has.property('word', 'га');
    expect(exercise.exerciseCase).to.has.property('plurality', GrammarPlurality.SINGULAR);
    expect(exercise.exerciseCase).to.has.property('case', GrammarCase.GENITIVE);
    expect(exercise.exerciseCase).to.has.property('form', GrammarForm.SHORT);
    expect(exercise.exerciseCase).to.has.property('gender', GrammarGender.MASCULINE);
    expect(exercise.exerciseCase).to.not.has.property('animation', GrammarAnimation.ANIMATE);

    expect(await tutor.checkCaseExercise('га', exercise)).to.be.true;
    expect(await tutor.checkCaseExercise('nnn', exercise)).to.be.false;
  });
});
