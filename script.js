// =====================================================
// TELEGRAM
// =====================================================

const tg =
    window.Telegram?.WebApp;


if (tg) {

    tg.ready();

    tg.expand();


    try {

        tg.setHeaderColor("#211510");

        tg.setBackgroundColor("#211510");

    } catch (error) {

        console.log(
            "Telegram theme API unavailable"
        );

    }

}



// =====================================================
// START ANIMATIONS
// =====================================================

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document.body
                    .classList
                    .add("ready");

            },
            100
        );

    }
);



// =====================================================
// ELEMENTS
// =====================================================

const gmailButton =
    document.getElementById(
        "gmailButton"
    );


const timeButton =
    document.getElementById(
        "timeButton"
    );


const timeScreen =
    document.getElementById(
        "timeScreen"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


const clock =
    document.getElementById(
        "clock"
    );


const seconds =
    document.getElementById(
        "seconds"
    );


const clockDate =
    document.getElementById(
        "clockDate"
    );


const footerTime =
    document.getElementById(
        "footerTime"
    );



// =====================================================
// HAPTIC
// =====================================================

function haptic(
    type = "light"
) {

    try {

        tg
            ?.HapticFeedback
            ?.impactOccurred(type);

    } catch (error) {

        // Ничего не делаем,
        // если открыто не в Telegram.

    }

}



// =====================================================
// GMAIL
// =====================================================

function openGmail() {

    haptic("medium");


    const url =
        "https://mail.google.com/";


    if (tg?.openLink) {

        tg.openLink(url);

    } else {

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }

}


gmailButton.addEventListener(
    "click",
    openGmail
);



// =====================================================
// OPEN CLOCK
// =====================================================

function openClock() {

    haptic("medium");


    timeScreen
        .classList
        .remove("closing");


    timeScreen
        .classList
        .remove("active");


    /*
    Перезапускаем CSS-анимацию.
    */

    void timeScreen.offsetWidth;


    timeScreen
        .classList
        .add("active");

}


timeButton.addEventListener(
    "click",
    openClock
);



// =====================================================
// CLOSE CLOCK
// =====================================================

function closeClock() {

    if (
        !timeScreen
            .classList
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


    setTimeout(
        () => {

            timeScreen
                .classList
                .remove("closing");

        },
        1100
    );

}


backButton.addEventListener(
    "click",
    closeClock
);



// ESC на компьютере

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeClock();

        }

    }
);



// =====================================================
// SWIPE RIGHT
// =====================================================

let touchStartX = null;

let touchStartY = null;


timeScreen.addEventListener(
    "touchstart",
    event => {

        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.screenX;


        touchStartY =
            touch.screenY;

    },
    {
        passive: true
    }
);


timeScreen.addEventListener(
    "touchend",
    event => {

        if (
            touchStartX === null ||
            touchStartY === null
        ) {

            return;

        }


        const touch =
            event.changedTouches[0];


        const dx =
            touch.screenX -
            touchStartX;


        const dy =
            Math.abs(
                touch.screenY -
                touchStartY
            );


        if (
            dx > 85 &&
            dy < 90
        ) {

            closeClock();

        }


        touchStartX = null;

        touchStartY = null;

    },
    {
        passive: true
    }
);



// =====================================================
// MILANO TIME
// =====================================================

function updateMilanoTime() {

    const now =
        new Date();


    const time =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                timeZone:
                    "Europe/Rome",

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                hour12:
                    false
            }
        )
        .format(now);


    const second =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                timeZone:
                    "Europe/Rome",

                second:
                    "2-digit"
            }
        )
        .format(now);


    const date =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                timeZone:
                    "Europe/Rome",

                weekday:
                    "long",

                day:
                    "2-digit",

                month:
                    "long",

                year:
                    "numeric"
            }
        )
        .format(now);


    clock.textContent =
        time;


    seconds.textContent =
        second;


    clockDate.textContent =
        date.toUpperCase();


    footerTime.textContent =
        time;

}



updateMilanoTime();


setInterval(
    updateMilanoTime,
    1000
);
