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

import {from, startWith} from 'rxjs';
import {expect} from 'chai';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import log from '../../../src/log';

describe('RXJS', () => {
  it('just 1', (done) => {
    from([1]).subscribe(n => {
      expect(n).to.be.eq(1);
      done();
    });
  });

  it('from promise', (done) => {
    const acc: number[] = [];
    fromPromise(Promise.resolve(10)).subscribe(n => {
      acc.push(n);
    }, log.debug.bind(log), () => {
      expect(acc.length).to.be.eq(1);
      expect(acc[0]).to.be.eq(10);
      done();
    });
  });

  it('from 1,2,3', (done) => {
    const acc: number[] = [];
    from([1, 2, 3]).subscribe(n => {
      acc.push(n);
      if (n === 3) {
        expect(acc).to.be.eql([1, 2, 3]);
        done();
      }
    });
  });

  it('from 1,2,3 + startWith', (done) => {
    const acc: number[] = [];
    from([1, 2, 3]).pipe(startWith(-1))
      .subscribe(n => {
        acc.push(n);
        if (n === 3) {
          expect(acc).to.be.eql([-1, 1, 2, 3]);
          done();
        }
      });
  });
});
