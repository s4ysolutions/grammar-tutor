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

import React from 'react';
import diFactory, {DefaultDi} from '../../../../di/default';
import {Di} from '../../../../di';
import memoryStoragePromiseFactory from '../../../../../tests/mocks/kv-promice/memoryStorage';
import renderer from 'react-test-renderer';
import CaseIcon from '../CaseIcon';
import {Case, GrammarAnimation, GrammarCase, GrammarGender, GrammarPlurality} from '../../../../tutor';

describe('<CaseIcon>', () => {

  beforeEach(() => {
    (diFactory as { di: Di }).di = new DefaultDi(memoryStoragePromiseFactory({}));
  });

  describe('Empty', () => {
    test('no props should return null', () => {
      const c: Case = {
        case: GrammarCase.NOMINATIVE,
        word: 'foo',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).toBeNull();
      // expect(tree).toMatchSnapshot();
      // expect(tree).toHaveProperty('props');
    });
  });

  describe('Nouns with animation (case interrogatives)', () => {
    test('animate should return person', () => {
      const c: Case = {
        animation: GrammarAnimation.ANIMATE,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person');
    });

    test('inanimate should return tree', () => {
      const c: Case = {
        animation: GrammarAnimation.INANIMATE,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'tree');
    });
  });

  describe('Nouns with plurality only (personal pronouns 1st and 2nd)', () => {
    test('singular should return person', () => {
      const c: Case = {
        plurality: GrammarPlurality.SINGULAR,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person');
    });

    test('plural should return person', () => {
      const c: Case = {
        plurality: GrammarPlurality.PLURAL,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person');
    });
  });

  describe('Nouns with plurality and gender (nouns, personal pronouns 3d)', () => {
    test('singular masculine should return person', () => {
      const c: Case = {
        gender: GrammarGender.MASCULINE,
        plurality: GrammarPlurality.SINGULAR,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person');
    });

    test('plural masculine should return person', () => {
      const c: Case = {
        gender: GrammarGender.MASCULINE,
        plurality: GrammarPlurality.PLURAL,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person');
    });

    test('singular feminine should return person-dress', () => {
      const c: Case = {
        gender: GrammarGender.FEMININE,
        plurality: GrammarPlurality.SINGULAR,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person-dress');
    });

    test('plural feminine should return person-dress', () => {
      const c: Case = {
        gender: GrammarGender.FEMININE,
        plurality: GrammarPlurality.PLURAL,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'person-dress');
    });

    test('singular neuter should return cloud', () => {
      const c: Case = {
        gender: GrammarGender.NEUTER,
        plurality: GrammarPlurality.SINGULAR,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'cloud');
    });

    test('plural neuter should return cloud', () => {
      const c: Case = {
        gender: GrammarGender.NEUTER,
        plurality: GrammarPlurality.PLURAL,
        case: GrammarCase.NOMINATIVE,
        word: '',
      };
      const component = renderer.create(<CaseIcon exerciseCase={c} />);
      const tree = component.toJSON();
      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
      expect(tree).toHaveProperty('props.data-icon', 'cloud');
    });
  });
});
