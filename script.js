// ======================================
// TELEGRAM MINI APP
// ======================================

const tg =
    window.Telegram?.WebApp;


if (tg) {

    tg.ready();

    tg.expand();


    try {

        tg.setHeaderColor("#241814");

        tg.setBackgroundColor("#241814");

    } catch (error) {

        console.log(
            "Telegram colors unavailable"
        );

    }

}


// ======================================
// PAGE ARRIVAL
// ======================================

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document.body
                    .classList
                    .add("loaded");

            },
            120
        );

    }
);


// ======================================
// ELEMENTS
// ======================================

const gmailRow =
    document.getElementById(
        "gmailRow"
    );


const gmailAction =
    document.getElementById(
        "gmailAction"
    );


const timeRow =
    document.getElementById(
        "timeRow"
    );


const timeAction =
    document.getElementById(
        "timeAction"
    );


const timeScreen =
    document.getElementById(
        "timeScreen"
    );


const closeTime =
    document.getElementById(
        "closeTime"
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


// ======================================
// HAPTIC FEEDBACK
// ======================================

function haptic(
    type = "light"
) {

    try {

        tg
            ?.HapticFeedback
            ?.impactOccurred(type);

    } catch (error) {

        // Outside Telegram:
        // simply do nothing.

    }

}


// ======================================
// GMAIL
// ======================================

function openGmail() {

    haptic("light");


    const gmailUrl =
        "https://mail.google.com/";


    /*
    Inside Telegram:
    Telegram opens the link.

    In normal browser:
    regular new tab.
    */

    if (tg?.openLink) {

        tg.openLink(
            gmailUrl
        );

    } else {

        window.open(
            gmailUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }

}


// Whole Gmail row

gmailRow.addEventListener(
    "click",
    () => {

        openGmail();

    }
);


// Actual OPEN button

gmailAction.addEventListener(
    "click",
    event => {

        /*
        Otherwise click would
        fire twice:
        button + row.
        */

        event.stopPropagation();

        openGmail();

    }
);


// Enter keyboard support

gmailRow.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openGmail();

        }

    }
);


// ======================================
// TIME SCREEN
// ======================================

function openTimeScreen() {

    haptic("medium");


    timeScreen
        .classList
        .remove("closing");


    /*
    Remove and re-add active
    to restart animation properly.
    */

    timeScreen
        .classList
        .remove("active");


    void timeScreen.offsetWidth;


    timeScreen
        .classList
        .add("active");

}


// Whole TIME row

timeRow.addEventListener(
    "click",
    () => {

        openTimeScreen();

    }
);


// Actual LIVE button

timeAction.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        openTimeScreen();

    }
);


// Keyboard

timeRow.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openTimeScreen();

        }

    }
);


// ======================================
// CLOSE TIME SCREEN
// ======================================

function closeTimeScreen() {

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
        1200
    );

}


closeTime.addEventListener(
    "click",
    closeTimeScreen
);


// ESC in browser

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeTimeScreen();

        }

    }
);


// ======================================
// SWIPE RIGHT TO CLOSE
// ======================================

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


        const differenceX =
            touch.screenX -
            touchStartX;


        const differenceY =
            Math.abs(
                touch.screenY -
                touchStartY
            );


        /*
        Swipe right,
        but not a vertical swipe.
        */

        if (
            differenceX > 85 &&
            differenceY < 90
        ) {

            closeTimeScreen();

        }


        touchStartX = null;
        touchStartY = null;

    },
    {
        passive: true
    }
);


// ======================================
// MILANO TIME
// ======================================

function updateMilanoTime() {

    const now =
        new Date();


    // Hours and minutes

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


    // Seconds

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


    // Date

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


// immediately

updateMilanoTime();


// every second

setInterval(
    updateMilanoTime,
    1000
);
