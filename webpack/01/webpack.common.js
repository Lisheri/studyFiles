const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 载入HtmlWebpackPlugin, 他不需要解构, 默认导出就是
const webpack = require('webpack');

class myPlugin {
    // 定义一个类, 然后定义一个apply方法
    apply(compiler) {
        // apply方法会在webpack启用时, 自动被调用
        // 接收一个compiler对象参数, 这个对象就是webpack工作过程中的核心对象, 包含了此次构建的所有配置信息, 也是通过这个对象去注册钩子函数
        // 这里编写一个插件用于去除打包过程后bundle.js下所有的注释, 因此, 这个过程应该是在bundle.js出现后实施
        // emit在 输出 asset 到 output 目录之前执行(就是即将往输出目录输出文件)
        // ! 通过compiler.hooks.emit去访问到这个钩子, 通过tap方法去注册函数
        // ! tap方法接收两个参数, 第一个是插件名称, 第二个就是挂载到这个钩子上的函数了
        compiler.hooks.emit.tap("myPlugin", compilation => {
            // * compilation这个对象可以理解成此次打包过程中的上下文, 打包结果都会放到这个对象中
            // assets是即将写入目录中的资源文件信息, 是一个对象, 键名是文件的名称
            for (const name in compilation.assets) {
                // 通过source方法可以拿到对应地内容
                // 需求是做一个去除bundle.js注释的插件, 因此要判断文件名
                if (name.match(/.js$/)) {
                    // console.info(compilation.assets[name].source())
                    // 然后进行处理
                    const contents = compilation.assets[name].source();
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, "");
                    // 处理完成后, 需要去替换compilation.assets下的对应地内容
                    compilation.assets[name] = {
                        source: () => withoutComments, // 依然使用一个source方法去暴露
                        size: () => withoutComments.length, // 还需要一个size方法, 去返回一个内容的大小, 这个是webpack要求的所必须的方法
                    }
                }
            }
        })
    }
}

module.exports = {
    // 开发模式变量
    entry: './src/main.js', // 入口文件, 如果是一个相对路径, 前面的./是不能省略的
    output: { // output设置输出文件的配置, 该属性是一个对象
        filename: 'bundle.js', // 设置输出文件名称
        path: path.join(__dirname, 'dist'), // path执行文件输出所在的目录, 他必须使用绝对路径, 默认就是dist
        // publicPath: '/'
    },
    mode: 'none',
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
                exclude: path.join(__dirname, 'node_modules')
            },
            {
                test: /.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /.(jpg|png|gif|bmp|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                    }
                }
            },
            {
                test: /.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        // attributes: ["img:src", "a:href"], // 目前已弃用这种方式
                        sources: {
                            list: [
                                {
                                    tag: 'img', // 标签名
                                    attribute: 'src', // 挂载标签上的属性名
                                    type: 'src', // 属性名对应地原类型
                                },
                            ]
                        },
                        minimize: process.env === 'production' ? true : false,
                        esModule: true
                    }
                },
                exclude: path.join(__dirname, 'index.html')
            }
        ]
    },
    plugins: [ // 配置插件的数组
        new HtmlWebpackPlugin({
            title: 'webpack学习',
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
        }),
        new myPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        http2: true,
        hot: true,
        // open: true,
        // https: true,
        contentBase: [
            path.join(__dirname, 'src/favicons')
        ], // 可以是字符串, 也可以是数组
        proxy: {
            '/api': {
                // 也就是说请求 localhost:3000/api/users -> https://api.github.com/api/users
                target: 'https://api.github.com',
                // 但是在https://api.github.com的接口中并没有/api, 因此需要添加一层代理路径的重写
                pathRewrite: {
                    '^/api': "", // 这个属性最终会生成一个正则去匹配上面的路径
                },
                // ws: true,
                // timeout: 9999999999,
                // 不能使用localhost:3000作为请求 github 的主机名
                // 主机名由于服务端判断请求应该走哪一个网站, 设置changeOrigin为true, 就会将代理请求作为实际的主机名去请求
                changeOrigin: true,
            }
        }
    }
}