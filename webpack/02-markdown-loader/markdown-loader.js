// 每个webpack的loader都需要导出一个函数, 这个函数就是对所加载到的资源的一个处理过程
const marked = require("marked"); // 解析markdown用的库
module.exports = source => {
    // * 该函数的输入就是加载到的资源文件的内容
    // * 输出就是此次加工过后的结果
    // * 通过 source 来接收输入, 通过返回值来输出
    const html = marked(source); // 获取的结果是一段html字符串
    // 如果直接返回, 就会和刚刚一样, 返回值不是一段js代码
    // 这里我们其实就是希望导出这段html字符串
    // 但是又不能只做一段简单的拼接, 这样换行符, 内部的引号等会出问题
    // 因此使用JSON.stringify()做转换
    // return `export default${JSON.stringify(html)}`;
    return html;
}

