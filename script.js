const mainBox = document.getElementsByClassName('main-box')[0];
let selectedTextBlock = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

mainBox.addEventListener('click', (e) => {
    
    if ((e.target === mainBox)&& !isDragging) {
        createTextWithButton(e.clientX, e.clientY);
    }
});

function createTextWithButton(x, y) {
    if ((document.querySelectorAll('.text-container')).length < 5) {
        const message = document.createElement('div');
        message.className = 'text-container';

        const mainBoxRect = mainBox.getBoundingClientRect();
        const mainBoxLeft = mainBoxRect.left;
        const mainBoxTop = mainBoxRect.top;

        if (x + 70 > mainBoxRect.width + mainBoxLeft) {
            message.style.left = (mainBoxRect.width - 70) + 'px';
        } else {
            message.style.left = x - mainBoxLeft + 'px';
        }
        if (y + 20 > mainBoxRect.height + mainBoxTop) {
            message.style.top = (mainBoxRect.height - 20) + 'px';
        } else {
            message.style.top = y - mainBoxTop + 'px';
        }

        message.textContent = 'message';
        message.style.userSelect = 'none';
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        message.appendChild(closeButton);
        mainBox.appendChild(message);
        console.log(message.width);

        closeButton.addEventListener('click', () => {
            message.remove();
        });

        message.addEventListener('mousedown', (e) => {
            
            if (!isDragging && !selectedTextBlock) {
                isDragging = true;
                message.style.zIndex = 1;
                selectedTextBlock = message;
                message.style.cursor = 'grab';
                offsetX = e.clientX - message.getBoundingClientRect().left;
                offsetY = e.clientY - message.getBoundingClientRect().top;
            }
        });

        document.addEventListener('mousemove', (e) => {
            
            if (isDragging && selectedTextBlock === message) {
                
                const parentRect = mainBox.getBoundingClientRect();
                const newX = e.clientX - parentRect.left - offsetX;
                const newY = e.clientY - parentRect.top - offsetY;
                //right side
                if(e.clientX + message.clientWidth-1 >= mainBoxRect.width + parentRect.left){
                    console.log('border')
                    message.style.flexDirection = 'row-reverse';
                }else{
                    message.style.flexDirection = 'row';
                }
                //check border
                if(e.clientX + message.clientWidth-1-20 >= mainBoxRect.width + parentRect.left){
                    selectedTextBlock.style.left = (mainBoxRect.width - message.clientWidth-1) + 'px';
                }else if(e.clientX <= parentRect.left ){
                    selectedTextBlock.style.left = 1 + 'px';
                }else{
                    selectedTextBlock.style.left = newX + 'px';
                }
                console.log(e.clientY)
                console.log(mainBoxRect.height + parentRect.top)


                if(e.clientY - message.clientHeight-1 <= parentRect.top){
                    selectedTextBlock.style.top = 1 + 'px';
                }else if(e.clientY+3 >= parentRect.bottom){
                    selectedTextBlock.style.top = (mainBoxRect.height - message.clientHeight)-1 + 'px';
                }else{
                    selectedTextBlock.style.top = newY + 'px';
                }


            }
        });


        message.addEventListener('mouseup', (e) => {
            
            // Завершення перетягування
            if (selectedTextBlock === message) {
                isDragging = false;
                message.style.zIndex = 0;
                message.style.cursor = 'grab';
                selectedTextBlock = null;
            }
        });



        message.addEventListener('touchstart', (e) => {
            // Початок перетягування на сенсорних пристроях
            isDragging = true;
            selectedTextBlock = message;
            const touch = e.touches[0];
            offsetX = touch.clientX - message.getBoundingClientRect().left;
            offsetY = touch.clientY - message.getBoundingClientRect().top;

            // Вимкнення прокручування сторінки
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        });

        message.addEventListener('touchmove', (e) => {
            // Перетягування блоку на сенсорних пристроях
            if (isDragging && selectedTextBlock === message) {
                const touch = e.touches[0];
                if (touch) {
                    const parentRect = mainBox.getBoundingClientRect();
                    const newX = touch.clientX - parentRect.left - offsetX;
                    const newY = touch.clientY - parentRect.top - offsetY;

                    if(touch.clientX + message.clientWidth-1 >= mainBoxRect.width + parentRect.left){
                        console.log('border')
                        message.style.flexDirection = 'row-reverse';
                    }else{
                        message.style.flexDirection = 'row';
                    }

                    if(touch.clientX + message.clientWidth-1-20 >= mainBoxRect.width + parentRect.left){
                        selectedTextBlock.style.left = (mainBoxRect.width - message.clientWidth-1) + 'px';
                    }else if(touch.clientX <= parentRect.left ){
                        selectedTextBlock.style.left = 1 + 'px';
                    }else{
                        selectedTextBlock.style.left = newX + 'px';
                    }
                    console.log(touch.clientY)
                    console.log(mainBoxRect.height + parentRect.top)
    
    
                    if(touch.clientY - message.clientHeight-1 <= parentRect.top){
                        selectedTextBlock.style.top = 1 + 'px';
                    }else if(touch.clientY+3 >= parentRect.bottom){
                        selectedTextBlock.style.top = (mainBoxRect.height - message.clientHeight)-1 + 'px';
                    }else{
                        selectedTextBlock.style.top = newY + 'px';
                    }
    
                    selectedTextBlock.style.left = newX + 'px';
                    selectedTextBlock.style.top = newY + 'px';
                }
                e.preventDefault();
            }
        });


        message.addEventListener('touchend', () => {
            // Завершення перетягування на сенсорних пристроях
            isDragging = false;
            selectedTextBlock = null;

            // Включення прокручування сторінки
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        });


    }
}
