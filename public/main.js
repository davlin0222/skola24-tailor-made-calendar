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
    })
        .then((res) => res.blob())
        .then(async (blob) => {
            console.log('blob', blob);

            const data_string = await blob.text();

            downloadBlobAsFile(data_string, 'school.ics');
        });
});

const downloadBlobAsFile = function (data, filename) {
    const contentType = 'application/octet-stream';
    if (!data) {
        console.error('No data');
        return;
    }

    if (!filename) filename = 'filetodonwload.txt';

    if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], { type: contentType }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
    e.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    );
    a.dispatchEvent(e);
};
