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

/* eslint-disable no-console */
import {Subject} from 'rxjs';

let prevTS = 0;
const MS = 1000;
const SIXTY = 60;

const isDebug = (typeof process !== 'undefined') && process?.env?.LOG_LEVEL === 'DEBUG';

const log = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  d: isDebug ? console.debug : (a?: unknown, b?: unknown, c?: unknown): void => undefined, // console.debug,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug: isDebug ? console.debug : (a?: unknown, b?: unknown, c?: unknown): void => undefined, // console.debug,
  error: console.error,
  info: console.info,
  warn: console.warn,
  ts(message: string, params?: unknown): void {
    const ts = Date.now();
    if (prevTS > 0) {
      const d = ts - prevTS;
      if (d < MS) {
        if (params === undefined) {
          console.log(`ts: 0:0.${d} ${message}`);
        } else {
          console.log(`ts: 0:0.${d} ${message}`, params);
        }
      } else {
        const sec = Math.trunc((d / MS) % SIXTY);
        const min = Math.trunc((d / MS) / SIXTY);
        if (params === undefined) {
          console.log(`ts: ${min}:${sec}.${d % MS} ${message}`);
        } else {
          console.log(`ts: ${min}:${sec}.${d % MS} ${message}`, params);
        }
      }
    } else if (params === undefined) {
      console.log(`ts: 0 ${message}`);
    } else {
      console.log(`ts: 0 ${message}`, params);
    }
    prevTS = ts;
  },
  render(component: string, params?: unknown): void {
    if (params) {
      this.debug(`render: ${component}`, params);
    } else {
      this.debug(`render: ${component}`);
    }
  },
  promiseUse(id: string): void {
    this.debug(`promise: ${id} use`);
  },
  promiseEffect(id: string): void {
    this.debug(`promise: ${id} effect`);
  },
  promiseNext(id: string): void {
    this.debug(`promise: ${id} next`);
  },
  promiseValue(id: string, value: unknown): void {
    this.debug(`promise: ${id}`, value);
  },
  promiseState(id: string, state: unknown): void {
    this.debug(`promise: ${id} state`, state);
  },
  rxUse(id: string, initial?: unknown): void {
    this.debug(`rx: ${id} use`, initial);
  },
  rxSetState(id: string, value?: unknown): void {
    if (value === undefined) {
      this.debug(`rx: ${id} setState`);
    } else {
      this.debug(`rx: ${id} setState(${value})`);
    }
  },
  rxState(id: string, state?: unknown): void {
    this.debug(`rx: ${id} return state:`, state);
  },
  rxAdd(id: string): void {
    if (!this.rxCounters[id]) {
      this.rxCounters[id] = 0;
    }
    this.rxCounters[id]++;
    this.debug(`rx: ${id} = ${this.rxCounters[id]} +`);
  },
  rxAddSubject<T>(id: string, subject: Subject<T>): void {
    this.debug(`rx: ${id} = ${subject.observers.length} +`);
  },
  rxCounters: {} as Record<string, number>,
  rxDel(id: string): void {
    if (!this.rxCounters[id]) {
      this.rxCounters[id] = 0;
    }
    this.rxCounters[id]--;
    if (this.rxCounters[id] < 0) {
      this.error(`rx: ${id} = ${this.rxCounters[id]} -`);
    } else {
      this.debug(`rx: ${id} = ${this.rxCounters[id]} -`);
    }
  },
  rxDelSubject<T>(id: string, subject: Subject<T>): void {
    this.debug(`rx: ${id} = ${subject.observers.length} -`);
  },
  disableDebug() {
    this.d = (): void => undefined;
    this.debug = (): void => undefined;
  },
};

export default log;
