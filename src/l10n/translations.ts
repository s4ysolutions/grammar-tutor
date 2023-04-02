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
    'Exception': 'Исключение',
    'Hint': 'Подсказка',
    '-и Declension of female nouns': '"-и" спряжение женского рода',

    'Biti conjugation': 'Спряжение глагола "бити"',
    'Case interrogatives declension': 'Склонение падежных вопросов',
    'Hteti conjugation': 'Спряжение глагола "хтети"',
    'Moći conjugation': 'Спряжение глагола "моћи"',
    'Verbs conjugation': 'Спряжение глаголов',
    'Interrogative pronouns declension': 'Склонение вопросительных местоимений',
    'Nouns declension': 'Склонение существительных',
    'Personal pronouns declension': 'Склонение личных местоимений',
    'Possessive pronouns declension': 'Склонение притяжательных местоимений',
    'Reflexive pronouns declension': 'Склонение возвратных местоимений',

    'Reset': 'Сбросить результаты',

    'Masculine': 'муж.',
    'Feminine': 'жен.',
    'Neuter': 'ср.',

    'Short': 'короткая форма',
    'Long': 'длинная форма',

    'Singular': 'ед. ч.',
    'Plural': 'мн. ч.',
    'Nominative': 'Именительный',
    'nominative': 'именительный',
    'Genitive': 'Родительный',
    'genitive': 'родительный',
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

    'Calling/addressing someone.': 'Обращение, призыв.',
    'Direct object. Also with motion verbs.': 'Объект действия или с глаголами движения.',
    'Names of things.': 'Имена объектов.',
    'Object relation, quantity, time, possessive.': 'Отношения, количество, время, владение.',
    'Where? About whom or what?': 'Где, о чем или о ком?',
    'With or by what.  Indefinite recurrences.': 'С чем или с помощью чего. Повторение.',
    'Toward, to, for.': 'Направление, к, для.',

    'Used with trailing soft consonants:ц,ћ,ч,ђ,џ,j,љ,њ,ш,ж, except male names.':
      'Оканчивается на согласные ц,ћ,ч,ђ,џ,j,љ,њ,ш,ж, кроме мужских имен',
    'Used with masculine monosyllabic nouns only.':
      'Только с односложными существительными мужского рода',
    'Don’t change ending for some female names (mostly long names).':
    'Окончание не меняется у некоторых женских имен (обычно длиных).',
    'Female names ending on -ца': 'Женские имена оканчивающися на -ца',
  },
  'sr': {
    'App title': 'Граматика',
    'Pronouns cases': 'Падежи заменица',
  },
};

export default translation;
