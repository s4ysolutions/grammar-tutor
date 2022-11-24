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

import {Observable} from 'rxjs';

export enum RouteId {
  NOUNS_DECLENSION,
  PERSONAL_PRONOUNS_DECLENSION,
  REFLEXIVE_PRONOUNS_DECLENSION,
  POSSESSIVE_PRONOUNS_DECLENSION,
  INTERROGATIVE_PRONOUNS_DECLENSION,
  CASE_INTERROGATIVES_DECLENSION,
  BITI_CONJUGATION,
  HTETI_CONJUGATION,
  VERBS_CONJUGATION,
}

export interface Route {
  readonly id: RouteId;
  readonly title: string;
  is(id: RouteId): boolean;
}

export interface Router {
  readonly routeNounsDeclension: Route;
  readonly routePersonalPronounsDeclension: Route;
  readonly routeReflexivePronounsDeclension: Route;
  readonly routePossessivePronounsDeclension: Route;
  readonly routeCaseInterrogativesDeclension: Route;
  readonly routeInterrogativePronounsDeclension: Route;
  readonly routeBitiConjugation: Route;
  readonly routeHtetiConjugation: Route;
  readonly routeVerbsConjugation: Route;

  readonly currentRoute: Route;
  readonly observableCurrentRoute: Observable<Route>;
  go(route: RouteId): void;
}
