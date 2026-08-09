const tg = window.Telegram?.WebApp;

if (tg) {

    tg.ready();

    tg.expand();

    try {

        tg.setHeaderColor("#221813");
        tg.setBackgroundColor("#221813");

    } catch (e) {}

}


/* =========================
START ANIMATION
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.add("ready");

    }, 120);

});


/* =========================
ELEMENTS
========================= */

const gmailButton =
    document.getElementById("gmailButton");

const timeButton =
    document.getElementById("timeButton");

const timeScreen =
    document.getElementById("timeScreen");

const closeTime =
    document.getElementById("closeTime");

const clock =
    document.getElementById("clock");

const seconds =
    document.getElementById("seconds");

const clockDate =
    document.getElementById("clockDate");

const footerTime =
    document.getElementById("footerTime");


/* =========================
HAPTIC
========================= */

function haptic(type = "light") {

    try {

        tg?.HapticFeedback?.impactOccurred(type);

    } catch (e) {}

}


/* =========================
GMAIL
========================= */

gmailButton.addEventListener("click", () => {

    haptic("light");

    const url = "https://mail.google.com/";

    if (tg?.openLink) {

        tg.openLink(url);

    } else {

        window.open(url, "_blank");

    }

});


/* =========================
OPEN TIME
========================= */

timeButton.addEventListener("click", () => {

    haptic("medium");

    timeScreen.classList.remove("closing");

    timeScreen.classList.add("active");

});


/* =========================
CLOSE TIME
========================= */

closeTime.addEventListener("click", closeTimeScreen);


function closeTimeScreen() {

    haptic("light");

    timeScreen.classList.remove("active");

    timeScreen.classList.add("closing");


    setTimeout(() => {

        timeScreen.classList.remove("closing");

    }, 900);

}


/* swipe to close */

let touchStartX = null;


timeScreen.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


timeScreen.addEventListener(
    "touchend",
    event => {

        if (touchStartX === null) return;

        const endX =
            event.changedTouches[0].screenX;

        const difference =
            endX - touchStartX;


        if (difference > 80) {

            closeTimeScreen();

        }


        touchStartX = null;

    },
    { passive: true }
);


/* =========================
MILANO TIME
========================= */

function updateTime() {

    const now =
        new Date();


    const timeFormatter =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                timeZone: "Europe/Rome",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        );


    const secondsFormatter =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                timeZone: "Europe/Rome",
                second: "2-digit"
            }
        );


    const dateFormatter =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                timeZone: "Europe/Rome",
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    const time =
        timeFormatter.format(now);


    const sec =
        secondsFormatter.format(now);


    const date =
        dateFormatter.format(now);


    clock.textContent =
        time;


    seconds.textContent =
        sec;


    footerTime.textContent =
        time;


    clockDate.textContent =
        date.toUpperCase();

}


updateTime();

setInterval(
    updateTime,
    1000
);
