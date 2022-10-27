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
import {fireEvent, render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import T from '../../../../l10n';
import memoryStoragePromiseFactory from '../../../../../tests/mocks/kv-promice/memoryStorage';
import MenuItemReset from '../menu-items/MenuItemReset';
import diFactory, {DefaultDi} from '../../../../di/default';
import {Di} from '../../../../di';
import {first} from 'rxjs';


describe('<MenuItemReset>', () => {

  beforeEach(() => {
    (diFactory as {di: Di}).di = new DefaultDi(memoryStoragePromiseFactory({}));
  });

  test('snapshot & observing', (done) => {
    const component = renderer.create(<MenuItemReset />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveProperty('props');

    diFactory.di.learningProgress.observableLessonStatistics()
      .pipe(first())
      .subscribe(statistics => {
        expect(statistics).toEqual({total: 0, wrong: 0});
        done();
      });
    renderer.act(() => {
      if ('props' in tree) {
        tree.props.onClick();
      }
    });

  });

  test('rendering & observing', (done) => {
    const { getByText } = render(<MenuItemReset />);
    const menuItem = getByText(T`Reset`);

    expect(menuItem).not.toBeNull();

    diFactory.di.learningProgress.observableLessonStatistics()
      .pipe(first())
      .subscribe(statistics => {
        expect(statistics).toEqual({total: 0, wrong: 0});
        done();
      });
    fireEvent.click(menuItem);
  });

});
