function attachEventsListeners() {
    let days = document.getElementById('days');
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    let daysButtonElement = document.getElementById('daysBtn');
    let hoursButtonElement = document.getElementById('hoursBtn');
    let minutesButtonElement = document.getElementById('minutesBtn');
    let secondsButtonElement = document.getElementById('secondsBtn');

    daysButtonElement.addEventListener('click', () => {
        const daysInput = days.value;
        hours.value = daysInput * 24;
        minutes.value = hours.value * 60;
        seconds.value = minutes.value * 60;
    });

    hoursButtonElement.addEventListener('click', () => {
        const hoursInput = hours.value;
        days.value = hoursInput / 24;
        minutes.value = hoursInput * 60;
        seconds.value = minutes.value * 60;
    });

    minutesButtonElement.addEventListener('click', () => {
        const minutesInput = minutes.value;
        hours.value = minutesInput / 60;
        seconds.value = minutesInput * 60;
        days.value = hours.value / 24;
    });

    secondsButtonElement.addEventListener('click', () => {
        const secondsInput = seconds.value;
        minutes.value = secondsInput / 60;
        hours.value = minutes.value / 60;
        days.value = hours.value / 24;
    });
}