import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delayValue = parseInt(this.elements['delay'].value, 10);

  const stateValue = this.elements['state'].value;

  const promise = new Promise((resolve, reject) => {
    if (stateValue === 'fulfilled') {
      setTimeout(() => resolve(delayValue), delayValue);
    } else {
      setTimeout(() => reject(delayValue), delayValue);
    }

  });

  promise
    .then((delay) => {
      iziToast.success({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
      });
    })

    .catch((delay) => {
      iziToast.error({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
      });
    })

    //  Clean forms
    .finally(() => {
      this.reset();
    });
});