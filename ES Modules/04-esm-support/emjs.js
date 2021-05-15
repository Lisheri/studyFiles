// // 加载模块函数
// console.info(require);

// // 模块对象
// console.info(module);

// // 导出对象别名
// console.info(exports);

// // 当前文件的绝对路径
// console.info(__filename);

// // 当前文件所在目录
// console.info(__dirname);

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

console.info(__filename);
console.info(__dirname);