// import { log } from './logger';
// import messages from './messages';
// import {name, version} from '../package.json';
// import _ from 'lodash-es';

// console.info(name)
// console.info(version)
// // 使用模块成员
// const msg = messages.hi;

// log(msg);
// log(_.camelCase('hello world'))

import('./logger').then(({log}) => {
    log("code splitting");
})