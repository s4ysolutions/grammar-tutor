import {StaticPronounsDB} from '../teacher/pronouns/static';
import indexedDbFactory from '../../kv/promise/indexedDB';
import {DefaultTeacher} from '../teacher/default';
import {Teacher} from '../teacher';
import {KvPromiseLearningDB} from '../teacher/learned/kv-promise-db';

const promiseKV = indexedDbFactory('sluchaj-zamenica');
const pronounsDB = new StaticPronounsDB();
const learnedDB = new KvPromiseLearningDB(promiseKV);
const teacher = new DefaultTeacher(pronounsDB, learnedDB);

export const getTeacher = (): Teacher => teacher;
