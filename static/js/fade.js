(function() {
    document.body.style.visibility = 'visible';
    const style = document.createElement('style');
    style.id = 'smooth-appear-styles'; // Добавляем ID для последующего удаления
    style.textContent = `
.smooth-appear {
opacity: 0;
transition: opacity 0.6s ease-out, transform 0.6s ease-out;
cursor: none
}

.smooth-appear.show {
opacity: 1;
}
    `;
    document.head.appendChild(style);

    const allElements = Array.from(document.body.querySelectorAll('*:not(script):not(style):not(link):not(meta):not(title):not(base):not(noscript)'));

    allElements.forEach(el => {
        el.classList.add('smooth-appear');
    });

    let delay = 50;
    const baseDelay = 50;
    const speedMultiplier = 0.95;

    allElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('show');
        }, delay);

        delay += Math.max(20, baseDelay * Math.pow(speedMultiplier, index));
    });

    // Удаляем стили через 2 секунды после последней анимации
    const maxDelay = delay; // Добавляем запас времени для завершения всех transition
    setTimeout(() => {
        // Удаляем стиль
        const styleElement = document.getElementById('smooth-appear-styles');
        if (styleElement) {
            styleElement.remove();
        }
        
        // Опционально: удаляем классы с элементов
        allElements.forEach(el => {
            el.classList.remove('smooth-appear', 'show');
        });
        document.body.style.cursor = 'default';
    }, maxDelay);
})();