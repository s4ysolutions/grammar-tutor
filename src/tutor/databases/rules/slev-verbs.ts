/*
 * Copyright 2023 by s4y.solutions
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

export enum SlevVerbPresentRuleId {
  NONE,
  IM_E,
  AM_AJU,
  EM_U,
  EM_U_GATI_ZATI,
  EM_U_HATI_SATI,
  EM_U_KATI,
  EM_U_AVATI,
  EM_U_IVATI_OVATI,
  EM_U_TI,
  EM_U_CI,
  EM_EJU
}

export interface SlevVerbRule {
  description: string
}

export const slevVerbRules: Record<SlevVerbPresentRuleId, SlevVerbRule> = {
  [SlevVerbPresentRuleId.NONE]: {
    description: '',
  },
  [SlevVerbPresentRuleId.IM_E]: {
    description: '-им, -e',
  },
  [SlevVerbPresentRuleId.AM_AJU]: {
    description: '-ам, -ajу',
  },
  [SlevVerbPresentRuleId.EM_U]: {
    description: '-eм, -у',
  },
  [SlevVerbPresentRuleId.EM_U_GATI_ZATI]: {
    description: '-eм, -у; [г]ати, [з]ати ➟ ж',
  },
  [SlevVerbPresentRuleId.EM_U_HATI_SATI]: {
    description: '-eм, -у; [х]ати, [c]ати ➟ ш',
  },
  [SlevVerbPresentRuleId.EM_U_KATI]: {
    description: '-eм, -у; [к]ати ➟ ч',
  },
  [SlevVerbPresentRuleId.EM_U_AVATI]: {
    description: '-eм, -у; [ав]ати ➟ аj',
  },
  [SlevVerbPresentRuleId.EM_U_IVATI_OVATI]: {
    description: '-eм, -у; [ив]ати, [ов]ати ➟ уj',
  },
  [SlevVerbPresentRuleId.EM_U_TI]: {
    description: '-eм, -у; !!!',
  },
  [SlevVerbPresentRuleId.EM_U_CI]: {
    description: '-eм, -у; !!!',
  },
  [SlevVerbPresentRuleId.EM_EJU]: {
    description: '-eм, -еjу',
  },
};
