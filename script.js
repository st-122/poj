const mainBox = document.querySelector('.main-box');
let selectedTextBlock = null;
let isDragging = false;
const dragData = {
    offsetX: 0,
    offsetY: 0,
};

mainBox.addEventListener('click', (e) => {
    if (e.target === mainBox && !isDragging) {
        createTextWithButton(e.clientX, e.clientY);
    }
});

function createTextWithButton(x, y) {
    const textContainers = document.querySelectorAll('.text-container');
    if (textContainers.length < 5) {
        const message = document.createElement('div');
        message.className = 'text-container';
        const mainBoxRect = mainBox.getBoundingClientRect();
        const mainBoxLeft = mainBoxRect.left;
        const mainBoxTop = mainBoxRect.top;

        message.style.left = Math.min(x - mainBoxLeft, mainBoxRect.width - 70) + 'px';
        message.style.top = Math.min(y - mainBoxTop, mainBoxRect.height - 20) + 'px';

        message.textContent = 'message';
        message.style.userSelect = 'none';
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        message.appendChild(closeButton);
        mainBox.appendChild(message);

        closeButton.addEventListener('click', () => {
            message.remove();
        });

        message.addEventListener('mousedown', (e) => {
            if (!isDragging && !selectedTextBlock) {
                startDragging(message, e);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging && selectedTextBlock === message) {
                moveDraggedElement(message, e);
            }
        });

        message.addEventListener('mouseup', () => {
            endDragging(message);
        });

        message.addEventListener('touchstart', (e) => {
            startDragging(message, e.touches[0]);
            disableScroll();
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging && selectedTextBlock === message) {
                moveDraggedElement(message, e.touches[0]);
            }
        });

        message.addEventListener('touchend', () => {
            endDragging(message);
            enableScroll();
        });
    }
}

function startDragging(message, event) {
    isDragging = true;
    message.style.zIndex = 1;
    selectedTextBlock = message;
    message.style.cursor = 'grab';
    dragData.offsetX = event.clientX - message.getBoundingClientRect().left;
    dragData.offsetY = event.clientY - message.getBoundingClientRect().top;
}

function moveDraggedElement(message, event) {
    const mainBoxRect = mainBox.getBoundingClientRect();
    const parentRect = mainBox.getBoundingClientRect();
    const newX = event.clientX - parentRect.left - dragData.offsetX;
    const newY = event.clientY - parentRect.top - dragData.offsetY;
    const x = event.clientX;
    const messageWidth = message.offsetWidth;

    // Check for borders and adjust position
    const leftBoundary = 1;
    const topBoundary = 1;
    const rightBoundary = mainBox.offsetWidth - message.offsetWidth - 1;
    const bottomBoundary = mainBox.offsetHeight - message.offsetHeight - 1;

    message.style.left = `${Math.min(Math.max(newX, leftBoundary), rightBoundary)}px`;
    message.style.top = `${Math.min(Math.max(newY, topBoundary), bottomBoundary)}px`;

    if (x + messageWidth >= mainBoxRect.right) {
        message.style.flexDirection = 'row-reverse';
    } else if (x - messageWidth <= parentRect.left) {
        message.style.flexDirection = 'row';
    }
}

function endDragging(message) {
    isDragging = false;
    message.style.zIndex = 0;
    message.style.cursor = 'grab';
    selectedTextBlock = null;
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}
