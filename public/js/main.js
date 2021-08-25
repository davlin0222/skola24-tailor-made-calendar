import { DateTime } from '../vendors/luxon.js';
import download_blob_as_file from './download_blob_as_file.js';

document.querySelector('.schedule_id__reveal').addEventListener('click', (e) => {
    console.log('document.querySelector ~ click');
    document.querySelector('.schedule_id__info').classList.toggle('hidden');
});

const custom_calendar__form = document.querySelector('.custom_calendar__form');

custom_calendar__form.week_number.value = DateTime.now().weekNumber;

custom_calendar__form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
        schedule_id: e.target.schedule_id.value,
        week_number: e.target.week_number.value,
    };

    fetch('/create-calendar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.blob())
        .then(async (blob) => {
            const data_string = await blob.text();
            download_blob_as_file(data_string, 'school.ics');
        });
});
