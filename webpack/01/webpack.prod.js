const common = require('./webpack.common');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 这个模块解构出来一个CleanWebpackPlugin, 就是用于清除dist目录的插件
const { merge } = require('webpack-merge');

// 使用Object.assign会后项完全覆盖前项相同键名的属性, 但是对于引用类型, 我们只希望做添加, 而不是完全覆盖
// 所以Object.assign并不合适, 可以使用lodash.merge, 不过社区中提供了专用的webpackMerge这个库
module.exports = () => {
    return merge(common, {
        mode: "production",
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { from: "src/favicons", to: "dest" },
                ],
            }),
        ],
        devtool: false
    })
}