let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimerDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);   // stop existing timer
    const now = Date.now();
    const then = now + (seconds * 1000);
    console.log({now, then});
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we sghould stop
        if(secondsLeft < 0) {
            clearInterval(countdown);   
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const displayTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    timerDisplay.textContent = displayTime;
    document.title = displayTime;
    console.log({mins, secs});
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    endTimerDisplay.textContent = `Be Back at ${hours}:${mins < 10 ? '0' : ''}${mins}`;    // 24hr time
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})