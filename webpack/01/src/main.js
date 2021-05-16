import createHeading from './heading.js';
// import conSomething from './testExport.js';
// import './main.css';

import url from './favicons/github.png';

const heading = createHeading();

document.body.append(heading);

const img = new Image();

img.src = url;

document.body.append(img);

// ! 部分loader加载的资源中一些方法也会触发资源模块加载

import './main.css';

console.info(API_BASE_URL)

// import footerHtml from './footer.html';

// console.info(footerHtml)

// const testHt = document.createElement(footerHtml)

// document.body.append(testHt);

module.hot.accept('./heading', () => {
    console.info("heading模块更新了, 需要手动处理热更新逻辑")
})
