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

const observableCurrentRouter = new Subject<Route>();


export class DefaultRouter implements Router {
  routePersonalPronounsDeclension: Route = {
    id: RouteId.PERSONAL_PRONOUNS_DECLENSION,
    title: T`Personal pronouns declension`,
    is: (id) => id === RouteId.PERSONAL_PRONOUNS_DECLENSION,
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

  currentRoute: Route = this.routePersonalPronounsDeclension;

  readonly observableCurrentRoute = observableCurrentRouter;

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  go(routeId: RouteId): void {
    switch (routeId) {
      case RouteId.INTERROGATIVE_PRONOUNS_DECLENSION:
        this.currentRoute = this.routeInterrogativePronounsDeclension;
        break;
      case RouteId.CASE_INTERROGATIVES_DECLENSION:
        this.currentRoute = this.routeCaseInterrogativesDeclension;
        break;
      default:
        this.currentRoute = this.routePersonalPronounsDeclension;
    }
    observableCurrentRouter.next(this.currentRoute);
  }
}
