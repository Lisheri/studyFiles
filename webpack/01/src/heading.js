import conSomething from './testExport.js';
import './heading.css';

const y = conSomething();

const testHas0 = () => {
    console.info("123");
    return 10;
}

const x = testHas0()

export default () => {
    const element = document.createElement("h2");
    element.textContent = "hello world";
    element.classList.add('heading');
    element.addEventListener('click', () => {
        alert("hello webpack");
    });

    return element;
}

const x111 = () => {
    console.info(123)
}