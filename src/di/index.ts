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

import {CasesInterrogativesPronounsDb, LearningProgress, NounsDb, Tutor} from '../tutor';
import {Router} from '../router';
import {UiState} from '../ui-state';

export interface Di {
  readonly personPronounsDb: NounsDb
  readonly interrogativesDb: NounsDb
  readonly interrogativePronounsDb: CasesInterrogativesPronounsDb,
  readonly learningProgress: LearningProgress
  readonly tutor: Tutor
  readonly router: Router
  readonly uiState: UiState
}
