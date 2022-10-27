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

import {Observable, Subject, from, merge, mergeMap, of, skip} from 'rxjs';
import {expect} from 'chai';

const letters = ['a', 'b', 'c', 'd', 'e'];
describe('RXJS', () => {
  it('merge', (done) => {
    const ob1 = from([1, 2, 3]);
    const ob2 = (n: number) => from([letters[n - 1]]);

    const acc: string[] = [];
    ob1
      .pipe(mergeMap(o1 => ob2(o1)))
      .subscribe(c => {
        acc.push(c);
        if (c === 'c') {
          expect(acc).to.be.eql(['a', 'b', 'c']);
          done();
        }
      });
  });

  it('merge with last', (done) => {
    let last1 = 0;
    const subj1 = new Subject<number>();
    let last2: string;

    last2 = 'z';
    const subj2 = new Subject<string>();

    const issue2 = (s: string) => {
      last2 = s;
      subj2.next(s);
    };

    const observable: Observable<string> = merge(of(last1), subj1).pipe(mergeMap<number, Observable<string>>((s1) => {
      last1 = s1;
      return merge(
        of(last2),
        subj2,
      ).pipe(skip(1));
    }));

    const acc: string[] = [];
    observable.subscribe(a => {
      if (a === 'x') {
        expect(acc).to.be.eql(['a', 'b']);
        done();
      }
      acc.push(a);
    });

    // subj1.next(1); // wake up mergeMap, it is important to do it after subscribe

    issue2('a');
    issue2('b');
    subj2.next('x');

    expect(last1).to.be.eq(1);
    expect(last2).to.be.eq('b');
  });
});
