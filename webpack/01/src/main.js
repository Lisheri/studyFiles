// import createHeading from './heading.js';
// // import conSomething from './testExport.js';
// import './main.css';

// import url from './github.png';

// const heading = createHeading();

// document.body.append(heading);

// const img = new Image();

// img.src = url;

// document.body.append(img);

// ! 部分loader加载的资源中一些方法也会触发资源模块加载

import './main.css';

import footerHtml from './footer.html';

document.write(footerHtml);

