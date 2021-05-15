const path = require('path');

module.exports = {
    entry: './src/main.js', // 入口文件, 如果是一个相对路径, 前面的./是不能省略的
    output: { // output设置输出文件的配置, 该属性是一个对象
         filename: 'bundle.js', // 设置输出文件名称
         path: path.join(__dirname, 'dist'), // path执行文件输出所在的目录, 他必须使用绝对路径, 默认就是dist
         publicPath: 'dist/'
    },
    mode: 'none',
    module: { // 使用loader需要添加具体的配置, 就是在webpack.config.js中添加一个module, 下面配置rules数组
        // rules就是针对其他资源的加载规则配置, 每一个规则对象都有两个属性：
                                    // 一个test属性, 是正则表达式, 用于匹配打包过程中所遇到的文件路径
                                    // 一个use属性, 用于表示使用的loader
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.css$/,// 表示匹配所有的.css结尾的文件, 也就是匹配所有的css文件
                use: [
                    // 改成数组后, 配置多个loader, 执行是从后往前执行, 就像一个栈一样, 先进后出, 最先进去的最后执行
                    'style-loader', 'css-loader'
                ] // cssloader的作用就是将css文件转换成一个js模块, 具体实现就是将css代码转换成字符串push到了一个数组中
                // 但是单纯向上面这样只使用一个css-loader就会发现没有任何代码引用这一串字符串
                // 因此这里还需要一个style-loader, 就是将css的字符串通过style标签放到页面上
                // 通过设置两个loader就会发现 __webpack_modules__下面多了两个模块, 主要代表的就是css-loader和style-loader模块
                // css-loader生成的css字符串, 就通过 insertStyleElement函数 创建一个style标签, 挂载到页面中
            },
            {
                test: /.(jpg|png|gif|bmp|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    // 其实所有的loader都可以通过这种方式去配置
                    options: {
                        limit: 10 * 1024, // 10kb大小限制, 这样之后大于10kb的依然会使用file-loader
                        // 这种方式是默认使用file-loader, 因此一定不要忘了安装file-loader
                    }
                }
            },
            {
                test: /.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ["img:src", "a:href"]
                    }
                }
            }
        ]
    }
}