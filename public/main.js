import { DateTime } from './vendors/luxon.js';

const form = document.querySelector('form');

form.week_number.value = DateTime.now().weekNumber;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const schedule_id = e.target.schedule_id.value;
    const week_number = e.target.week_number.value;
    console.log('form values:', e.target.schedule_id.value, week_number);

    const data = { schedule_id, week_number };

    fetch('/create-calendar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
});
