// =====================================================
// OPEN CLOCK — SMOOTH
// =====================================================

function openClock() {

    haptic("medium");


    /*
    Если до этого экран закрывался,
    убираем состояние closing.
    */

    timeScreen.classList.remove(
        "closing"
    );


    /*
    Сначала делаем экран видимым,
    но он всё ещё находится справа.
    */

    timeScreen.style.visibility =
        "visible";


    /*
    Два animation frame нужны,
    чтобы браузер успел отрисовать
    начальное положение.

    Это сильно уменьшает рывок
    в Firefox / Telegram WebView.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            timeScreen
                .classList
                .add("active");

        });

    });

}



// =====================================================
// CLOSE CLOCK — SMOOTH
// =====================================================

function closeClock() {

    if (
        !timeScreen.classList
            .contains("active")
    ) {

        return;

    }


    haptic("light");


    timeScreen
        .classList
        .remove("active");


    timeScreen
        .classList
        .add("closing");


    /*
    Ждём окончания движения.
    */

    setTimeout(
        () => {

            timeScreen
                .classList
                .remove("closing");


            timeScreen.style.visibility =
                "hidden";

        },
        1300
    );

}
