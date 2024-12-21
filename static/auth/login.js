let lastX = 0;
let lastY = 0;
let lastTranslateY = 0;
let lastTranslateX = 0;
let blurAmount = 0;
let timeoutId = null;

function updateBlur(amount) {
    blurAmount = Math.min(20, amount); // Ограничиваем максимальное размытие
    $('.-mouse-parallax__blur').css('backdrop-filter', `blur(${blurAmount}px)`);
}

function resetBlur() {
    $('.-mouse-parallax__blur').css('transition', 'backdrop-filter 0.3s ease-out');
    updateBlur(0);
}

$('body').on('mousemove', (e) => {
    const x = e.pageX / $(window).width();
    const y = e.pageY / $(window).height();

    // Вычисляем смещение фона
    const translateX = -x * 30;
    const translateY = -y * 30;

    // Обновляем положение фона
    $('.-mouse-parallax__background').css(
        'transform',
        `translate3d(${translateX}px, ${translateY}px, 0)`
    );

    // Вычисляем разницу в смещении фона
    const deltaTranslateY = translateY - lastTranslateY;
    const deltaTranslateX = translateX - lastTranslateX;

    // Обновляем размытие на основе смещения фона
    if (deltaTranslateY < 0) {
        // Фон смещается вверх, увеличиваем размытие
        blurAmount += Math.abs(deltaTranslateY) * 0.5; // Коэффициент 0.1 можно настроить
    } else if (deltaTranslateY > 0) {
        // Фон смещается вниз, уменьшаем размытие
        blurAmount += Math.abs(deltaTranslateY) * 0.5; // Коэффициент 0.1 можно настроить
    }

    if (deltaTranslateX < 0) {
        // Фон смещается вверх, увеличиваем размытие
        blurAmount += Math.abs(deltaTranslateX) * 0.1; // Коэффициент 0.1 можно настроить
    } else if (deltaTranslateX > 0) {
        // Фон смещается вниз, уменьшаем размытие
        blurAmount += Math.abs(deltaTranslateX) * 0.1; // Коэффициент 0.1 можно настроить
    }

    // Ограничиваем размытие в пределах 0 и 20
    blurAmount = Math.max(0, Math.min(10, blurAmount));

    updateBlur(blurAmount);

    // Обновляем последние значения
    lastX = x;
    lastY = y;
    lastTranslateY = translateY;

    // Очищаем предыдущий таймер и устанавливаем новый для сброса размытия
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetBlur, 100); // Возвращаем размытие к нулю через 100мс после остановки движения
});