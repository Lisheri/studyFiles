import { name, age } from './1.js';

console.info(name, age);

setTimeout(() => {
    console.info(name, age);
}, 1500)