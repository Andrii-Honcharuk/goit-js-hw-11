import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        position: 'topCenter',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.innerText = addLeadingZero(days);
  hoursEl.innerText = addLeadingZero(hours);
  minutesEl.innerText = addLeadingZero(minutes);
  secondsEl.innerText = addLeadingZero(seconds);
  console.log(daysEl);
}

function startTimer(targetDate) {

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    const currentDate = Date.now();
    const timeDiff = targetDate - currentDate;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      updateTimer(0);
      iziToast.success({
        title: 'Countdown Finished',
        position: 'topCenter',
        message: 'The countdown has reached zero.',
      });
      startBtn.disabled = true;
    } else {
      updateTimer(timeDiff);
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value, 'Y-m-d H:i:S');
  startTimer(selectedDate);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}