const date_fns = require('date-fns');

const calendar__raw_data = [
    ['33', 'Onsdag 09:00 - 13:30', 'Skolstart'],
    ['33', 'Torsdag 08:30 - 10:15', 'Datalagring', 'OLR', 'E212'],
    ['33', 'Torsdag 10:30 - 12:00', 'Teknisk specialisering', 'PEFR', 'E212'],
    ['33', 'Torsdag 12:40 - 14:10', 'Gy ingenjören i praktiken', 'OLL', 'E229'],
    ['33', 'Fredag 08:30 - 10:00', 'Gy ingenjören i praktiken', 'ÅSI', 'E229'],
    ['33', 'Fredag 10:20 - 12:10', 'Mjukvarudesign', 'OLR', 'E212'],
    ['33', 'Fredag 12:50 - 14:30', 'Webbutveckling', 'PEFR', 'E212'],
];

const event = {
    start: [2018, 5, 30, 6, 30],
    duration: { hours: 6, minutes: 30 },
    title: 'Bolder Boulder',
    description: 'Annual 10-kilometer run in Boulder, Colorado',
    location: 'Folsom Field, University of Colorado (finish line)',
    url: 'http://www.bolderboulder.com/',
    geo: { lat: 40.0095, lon: 105.2669 },
    categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
    attendees: [
        {
            name: 'Adam Gibbons',
            email: 'adam@example.com',
            rsvp: true,
            partstat: 'ACCEPTED',
            role: 'REQ-PARTICIPANT',
        },
        {
            name: 'Brittany Seaton',
            email: 'brittany@example2.org',
            dir: 'https://linkedin.com/in/brittanyseaton',
            role: 'OPT-PARTICIPANT',
        },
    ],
};

function getDateOfWeek(w, y) {
    var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function getDateOfSwedishWeek(w, y) {
    return date_fns.add(getDateOfISOWeek(w, y), { days: 1 });
}

function extract_date(week_number, date_time__obscure_string) {
    const swedish_week_day_names = [
        'måndag',
        'tisdag',
        'onsdag',
        'torsdag',
        'fredag',
        'lördag',
        'söndag',
    ];

    const time_values = date_time__obscure_string.split(' ');
    const week_day__index = swedish_week_day_names.indexOf(
        time_values[0].toLowerCase()
    );

    const YEAR = 2021;
    const date = date_fns.add(getDateOfSwedishWeek(week_number, YEAR), {
        days: week_day__index,
    });

    return date;
}

function format_calendar_data(calendar__raw_data) {
    const calendar__formatted_data = calendar__raw_data.map(
        (calendar__block__data) => {
            const week_number = calendar__block__data[0];
            const date_time__obscure_string = calendar__block__data[1];

            const date = extract_date(week_number, date_time__obscure_string);

            // const event_info = [
            //     'start__date',
            //     'end__date',
            //     'lesson_title',
            //     'teacher_id',
            //     'classroom_id',
            // ];

            return { date };
        }
    );

    return calendar__formatted_data;
}

console.log(
    '🚀: format_calendar_data(calendar__raw_data);',
    format_calendar_data(calendar__raw_data)
);

module.exports = format_calendar_data;
