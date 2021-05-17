const path  = require('path');

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /.md$/,
                use: [
                    {
                        loader: 'html-loader', // 这里不仅可以使用模块名称, 还可以使用相对路径
                    },
                    {
                        loader: './markdown-loader.js'
                    }
                ]
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}