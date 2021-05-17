const allModes = [
    'eval',
    // 'cheap-eval-source-map', // 这两个不能用了
    // 'cheap-module-eval-source-map',
    'eval-source-map',
    'cheap-source-map',
    'cheap-module-source-map',
    'inline-cheap-source-map',
    'inline-cheap-module-source-map',
    'source-map',
    'inline-source-map',
    'hidden-source-map',
    'nosources-source-map',
    // 往后版本新增
    'eval-nosources-cheap-source-map',
    'eval-cheap-source-map',
    'eval-cheap-module-source-map',
    'eval-nosources-cheap-module-source-map',
    'eval-nosources-source-map',
    'inline-nosources-cheap-source-map',
    'inline-nosources-cheap-module-source-map',
    'inline-nosources-source-map',
    'nosources-cheap-source-map',
    'nosources-cheap-module-source-map',
    'hidden-nosources-cheap-source-map',
    'hidden-nosources-cheap-module-source-map',
    'hidden-nosources-source-map',
    'hidden-cheap-source-map',
    'hidden-cheap-module-source-map',
]; // 数组中每一个成员就是devtool配置取值的一种

const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

// * webpack的配置对象可以是一个数组, 数组中每一个元素就是一个单独的打包配置, 这样就可以在一次打包过程中, 同时执行多个打包任务
module.exports = allModes.map(item => {
    return {
        devtool: `${item}`,
        mode: 'none',
        entry: './src/main.js',
        output: {
            filename: `js/${item}.js`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            // * 主要为了辨别不同模式之间的差异
                            presets: ['@babel/preset-env']
                        },
                    },
                    exclude: path.join(__dirname, 'node_modules')
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: `${item}.html`
            })
        ]
    }
})