// 这个文件同样运行在node环境中
// 不过rollup会自己处理这个配置文件, 因此可以直接使用es module
// 需要导出一个配置对象
// 同时必须使用--config 去使用配置文件, 因为默认他不会 使用配置文件
import json from 'rollup-plugin-json';// 默认导出的就是一个函数
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
    input: 'src/index.js',
    output: {
        // file: 'dist/bundle.js',
        // format: 'iife'
        dir: 'dist',
        format: 'amd'
    },
    plugins: [
        json(), // 将调用结果放过来, 而不是函数
        resolve(), // 这样即可在js文件中通过文件名导入第三方模块了
        commonjs()
    ]
}