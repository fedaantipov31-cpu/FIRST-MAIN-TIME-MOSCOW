// Telegram Mini App
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    document.body.classList.add("telegram");
}

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const button = document.getElementById("showTime");

function updateMoscowTime() {

    const now = new Date();

    const time = now.toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString("ru-RU", {
        timeZone: "Europe/Moscow",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    timeElement.classList.add("update");

    timeElement.textContent = time;
    dateElement.textContent =
        date.charAt(0).toUpperCase() + date.slice(1);

    setTimeout(() => {
        timeElement.classList.remove("update");
    }, 300);
}

// Первое нажатие
button.addEventListener("click", () => {

    updateMoscowTime();

    // После первого нажатия кнопка становится "Обновить"
    button.innerHTML = "<span>Обновить</span>";

});

// Автообновление каждую секунду
setInterval(() => {

    if (timeElement.textContent !== "--:--:--") {
        updateMoscowTime();
    }

}, 1000);
