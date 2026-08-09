// =====================================================
// ULTRA SMOOTH OPEN CLOCK
// =====================================================

function openClock() {

    haptic("medium");


    /*
    Убираем состояние закрытия,
    если оно осталось.
    */

    timeScreen.classList.remove(
        "clock-close"
    );


    /*
    На всякий случай убираем
    старые классы предыдущей версии.
    */

    timeScreen.classList.remove(
        "active"
    );

    timeScreen.classList.remove(
        "closing"
    );


    /*
    Сначала экран находится
    за правой границей.
    */

    timeScreen.style.visibility =
        "visible";


    /*
    Очень важно:

    ждём два кадра браузера,
    чтобы Firefox точно успел
    отрисовать начальную позицию.

    После этого начинается
    абсолютно плавный transition.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            timeScreen.classList.add(
                "clock-open"
            );

        });

    });

}



// =====================================================
// ULTRA SMOOTH CLOSE CLOCK
// =====================================================

function closeClock() {

    if (
        !timeScreen.classList.contains(
            "clock-open"
        )
    ) {

        return;

    }


    haptic("light");


    timeScreen.classList.remove(
        "clock-open"
    );


    timeScreen.classList.add(
        "clock-close"
    );


    /*
    Закрытие занимает 1.65 сек.
    */

    setTimeout(
        () => {

            timeScreen.classList.remove(
                "clock-close"
            );


            timeScreen.style.visibility =
                "hidden";

        },

        1700
    );

}
