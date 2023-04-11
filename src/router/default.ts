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


import {Route, RouteId, Router} from './index';
import {Subject} from 'rxjs';
import T from '../l10n';
import {KV} from '../kv/sync';

const observableCurrentRouter = new Subject<Route>();

export class DefaultRouter implements Router {
  routeNounsDeclension: Route = {
    id: RouteId.NOUNS_DECLENSION,
    title: T`Nouns declension`,
    is: (id) => id === RouteId.NOUNS_DECLENSION,
  };

  routePersonalPronounsDeclension: Route = {
    id: RouteId.PERSONAL_PRONOUNS_DECLENSION,
    title: T`Personal pronouns declension`,
    is: (id) => id === RouteId.PERSONAL_PRONOUNS_DECLENSION,
  };

  routeReflexivePronounsDeclension: Route = {
    id: RouteId.REFLEXIVE_PRONOUNS_DECLENSION,
    title: T`Reflexive pronouns declension`,
    is: (id) => id === RouteId.REFLEXIVE_PRONOUNS_DECLENSION,
  };

  routePossessivePronounsDeclension: Route = {
    id: RouteId.POSSESSIVE_PRONOUNS_DECLENSION,
    title: T`Possessive pronouns declension`,
    is: (id) => id === RouteId.POSSESSIVE_PRONOUNS_DECLENSION,
  };

  routeCaseInterrogativesDeclension: Route = {
    id: RouteId.CASE_INTERROGATIVES_DECLENSION,
    title: T`Case interrogatives declension`,
    is: (id) => id === RouteId.CASE_INTERROGATIVES_DECLENSION,
  };

  routeInterrogativePronounsDeclension: Route = {
    id: RouteId.INTERROGATIVE_PRONOUNS_DECLENSION,
    title: T`Interrogative pronouns declension`,
    is: (id) => id === RouteId.INTERROGATIVE_PRONOUNS_DECLENSION,
  };

  routeBitiConjugation: Route = {
    id: RouteId.BITI_CONJUGATION,
    title: T`Biti conjugation`,
    is: (id) => id === RouteId.BITI_CONJUGATION,
  };

  routeHtetiConjugation: Route = {
    id: RouteId.HTETI_CONJUGATION,
    title: T`Hteti conjugation`,
    is: (id) => id === RouteId.HTETI_CONJUGATION,
  };

  routeMociConjugation: Route = {
    id: RouteId.MOCI_CONJUGATION,
    title: T`Moći conjugation`,
    is: (id) => id === RouteId.MOCI_CONJUGATION,
  };

  routeVerbsConjugation: Route = {
    id: RouteId.VERBS_CONJUGATION,
    title: T`Verbs conjugation`,
    is: (id) => id === RouteId.VERBS_CONJUGATION,
  };

  currentRoute: Route; // = this.routeNounsDeclension;

  readonly observableCurrentRoute = observableCurrentRouter;

  private readonly kv: KV;

  constructor(kv: KV) {
    this.kv = kv;
    const routeId = kv.get<RouteId>('route', RouteId.NOUNS_DECLENSION);
    this.setRouteById(routeId);
  }

  private setRouteById(routeId: RouteId): void {
    switch (routeId) {
      case RouteId.NOUNS_DECLENSION:
        this.currentRoute = this.routeNounsDeclension;
        break;
      case RouteId.REFLEXIVE_PRONOUNS_DECLENSION:
        this.currentRoute = this.routeReflexivePronounsDeclension;
        break;
      case RouteId.POSSESSIVE_PRONOUNS_DECLENSION:
        this.currentRoute = this.routePossessivePronounsDeclension;
        break;
      case RouteId.INTERROGATIVE_PRONOUNS_DECLENSION:
        this.currentRoute = this.routeInterrogativePronounsDeclension;
        break;
      case RouteId.CASE_INTERROGATIVES_DECLENSION:
        this.currentRoute = this.routeCaseInterrogativesDeclension;
        break;
      case RouteId.PERSONAL_PRONOUNS_DECLENSION:
        this.currentRoute = this.routePersonalPronounsDeclension;
        break;
      case RouteId.BITI_CONJUGATION:
        this.currentRoute = this.routeBitiConjugation;
        break;
      case RouteId.HTETI_CONJUGATION:
        this.currentRoute = this.routeHtetiConjugation;
        break;
      case RouteId.MOCI_CONJUGATION:
        this.currentRoute = this.routeMociConjugation;
        break;
      case RouteId.VERBS_CONJUGATION:
        this.currentRoute = this.routeVerbsConjugation;
        break;
      default:
        throw Error(`Wrong routeId "${routeId}"`);
    }
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  go(routeId: RouteId): void {
    this.setRouteById(routeId);
    this.kv.set('route', routeId);
    observableCurrentRouter.next(this.currentRoute);
  }
}
