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

import {GrammarPerson} from '../tutor';

const translation = {
  'en': {
    'App title': 'Grammar',
    'Reset': 'Reset results',

    'Masculine': 'masc.',
    'Feminine': 'fem.',
    'Neuter': 'neut.',

    'Short': 'short',
    'Long': 'long',

    'Singular': 'sing.',
    'Plural': 'pl.',

    'Inanimate': 'inanimate',
    'Animate': 'animate',

    [GrammarPerson.FIRST]: '1st.',
    [GrammarPerson.SECOND]: '2nd.',
    [GrammarPerson.THIRD]: '3rd.',
  },
  'ru': {
    'App title': 'Грамматика',
    'Hint': 'Подсказка',

    'Biti conjugation': 'Спряжение глагола "бити"',
    'Case interrogatives declension': 'Склонение падежных вопросов',
    'Interrogative pronouns declension': 'Склонение вопросительных местоимений',
    'Nouns declension': 'Склонение существительных',
    'Personal pronouns declension': 'Склонение личных местоимений',

    'Reset': 'Сбросить результаты',

    'Masculine': 'муж.',
    'Feminine': 'жен.',
    'Neuter': 'ср.',

    'Short': 'короткая форма',
    'Long': 'длинная форма',

    'Singular': 'ед. ч.',
    'Plural': 'мн. ч.',
    'Nominative': 'Именительный',
    'Genitive': 'Родительный',
    'Accusative': 'Винительный',
    'Locative': 'Предложный',
    'Dative': 'Дательный',
    'Instrumental': 'Творительный',
    'Vocative': 'Звательный',

    'Inanimate': 'неодушевленный',
    'Animate': 'одушевленный',

    [GrammarPerson.FIRST]: '1-e л.',
    [GrammarPerson.SECOND]: '2-e л.',
    [GrammarPerson.THIRD]: '3-e л.',

    'Which?': 'Который? Какой из?',
    'What kind?': 'Какой?',
    'Whose?': 'Чей?',
  },
  'sr': {
    'App title': 'Граматика',
    'Pronouns cases': 'Падежи заменица',
  },
};

export default translation;
