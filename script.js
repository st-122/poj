const image = document.getElementsByClassName('image')[0];

// Додати обробник події click до зображення
image.addEventListener('click', (e) => {
    // Створити текстовий елемент
    const x = e.clientX - image.getBoundingClientRect().left;
    const y = e.clientY - image.getBoundingClientRect().top;

    // Створюємо текстове повідомлення
    const message = document.createElement('div');
    message.className = 'text-container';
    message.style.left = x + 'px';
    message.style.top = y + 'px';
    message.textContent = 'Ваш текстовий повідомлення';

    const svgCross = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgCross.setAttribute("width", "20");
    svgCross.setAttribute("height", "20");
    svgCross.setAttribute("viewBox", "0 0 20 20");

    // Створюємо дві лінії для хрестика
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", "5");
    line1.setAttribute("y1", "5");
    line1.setAttribute("x2", "15");
    line1.setAttribute("y2", "15");
    line1.setAttribute("stroke", "#000");
    line1.setAttribute("stroke-width", "2");

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", "15");
    line2.setAttribute("y1", "5");
    line2.setAttribute("x2", "5");
    line2.setAttribute("y2", "15");
    line2.setAttribute("stroke", "#000");
    line2.setAttribute("stroke-width", "2");

    // Додаємо лінії до SVG
    svgCross.appendChild(line1);
    svgCross.appendChild(line2);

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.appendChild(svgCross);

    message.appendChild(closeButton);
        // Додати текстовий елемент до контейнера зображення
        image.parentNode.appendChild(message);
        closeButton.addEventListener('click',()=>{
            message.remove();
        })
});