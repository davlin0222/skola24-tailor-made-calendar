import { DateTime } from '../vendors/luxon.js';
import download_blob_as_file from './download_blob_as_file.js';

refresh();

function refresh() {
    if (window.location.href.includes('/downloading')) {
        set_currently_downloading(true);
        return;
    }
    set_currently_downloading(false);
}

function set_href(pathname, bool) {
    if (!bool) {
        return window.location.href.replace('/' + pathname, '');
    }
    const aleady_there = window.location.href.includes('/' + pathname);
    if (aleady_there) {
        return window.location.href;
    }
    if (window.location.pathname.slice(-1) == '/') {
        return window.location.href + pathname;
    }
    return window.location.href + '/' + pathname;
}

function set_currently_downloading(bool) {
    history.replaceState(
        {
            downloading: bool,
        },
        null,
        set_href('downloading', bool)
    );

    document.getElementById('download_button').disabled = bool;

    const download_info = document.getElementById('download_info');
    const next_download = document.getElementById('next_calendar');
    next_download.classList.add('-display_none');

    if (bool) {
        download_info.classList.remove('-display_none');
        setTimeout(() => {
            next_download.classList.remove('-display_none');
        }, 9000);
        return;
    }
    download_info.classList.add('-display_none');
}

const calendar_form = document.querySelector('.calendar_form');

document.getElementById('schedule_id__reveal').addEventListener('click', (e) => {
    document.getElementById('schedule_id_info').classList.toggle('-display_none');
});

calendar_form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (window.location.pathname.includes('/downloading')) return;

    set_currently_downloading(true);

    const data = {
        schedule_id: e.target.schedule_id.value,
        week_number: e.target.week_number.value,
    };
    console.log('data', data);

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

document.getElementById('next_calendar').addEventListener('click', (e) => {
    set_currently_downloading(false);
    reset_calendar_form();
});

function reset_calendar_form() {
    calendar_form.reset();

    document.getElementById('week_number').value = DateTime.now().weekNumber;
}