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

import {expect} from 'chai';
import {Subject, concat, merge, of} from 'rxjs';

describe('RXJS of', () => {
  it('concat+of', (done) => {
    const s = new Subject<number>();
    const acc: number[] = [];
    concat(of(1, 2), s).subscribe(n => {
      if (n === 0) {
        expect(acc).to.be.eql([1, 2, 3, 4]);
        done();
      }
      acc.push(n);
    });
    s.next(3);
    s.next(4);
    s.next(0);
  });
  it('concat+promise', (done) => {
    const s = new Subject<number>();
    const acc: number[] = [];
    // concat(from(Promise.resolve(1)), of(2, 3, 4, 0)).subscribe(n => {
    // concat(of(1), s).subscribe(
    // concat(from(Promise.resolve(1)), s).subscribe(
    concat(Promise.resolve(1), s).subscribe(
      n => {
        console.log(n);
        if (n === 0) {
          expect(acc).to.be.eql([1, 2, 3, 4]);
        }
        acc.push(n);
      },
      (err) => console.log('ERR', err),
      () => {
        console.log('done');
        done();
      },
    );
    s.next(2);
    s.next(3);
    s.next(4);
    s.next(0);
    s.complete();
  });
  it('merge', (done) => {
    const s1 = new Subject<number>();
    const s2 = new Subject<number>();
    const acc: number[] = [];
    merge(s1, s2).subscribe(n => {
      if (n === 0) {
        expect(acc).to.be.eql([1, 2, 3]);
        done();
      }
      acc.push(n);
    });
    s1.next(1);
    s2.next(2);
    s1.next(3);
    s2.next(0);
  });
});
