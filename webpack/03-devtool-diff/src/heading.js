export default () => {
    console.info("heading~");

    const element = document.createElement("h2");

    element.textContent = 'Hello world';
    element.classList.add('heading');
    element.addEventListener('click', () => {
        alert("Hello webpack");
    })

    return element;
}