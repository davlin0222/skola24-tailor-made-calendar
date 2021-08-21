const ics = require('ics');

// const { error, value } = ics.createEvents([
//     {
//         title: 'Lunch',
//         start: [2018, 1, 15, 12, 15],
//         duration: { minutes: 45 },
//     },
//     {
//         title: 'Dinner',
//         start: [2018, 1, 15, 12, 15],
//         duration: { hours: 1, minutes: 30 },
//     },
// ]);

// const event = {
//   start: [2018, 5, 30, 6, 30],
//   duration: { hours: 6, minutes: 30 },
//   title: 'Bolder Boulder',
//   description: 'Annual 10-kilometer run in Boulder, Colorado',
//   location: 'Folsom Field, University of Colorado (finish line)',
//   url: 'http://www.bolderboulder.com/',
//   geo: { lat: 40.0095, lon: 105.2669 },
//   categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
//   status: 'CONFIRMED',
//   busyStatus: 'BUSY',
//   organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
//   attendees: [
//     { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
//     { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
//   ]
// }

function construct_date(date) {
    return [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
    ];
}

function calendar__ics_formatted_data(calendar__formatted_data) {
    return calendar__formatted_data.map((calendar_block__formatted_data) => {
        // return {
        //     start: calendar_block__formatted_data.start__date_time,
        //     end: calendar_block__formatted_data.end__date_time,
        //     title: calendar_block__formatted_data.lesson_title,
        //     description: calendar_block__formatted_data.teacher_id,
        //     location: calendar_block__formatted_data.classroom_id,
        // };
        // return {
        //     start: [2018, 5, 30, 6, 30],
        //     title: calendar_block__formatted_data.lesson_title,
        //     description: calendar_block__formatted_data.teacher_id,
        //     location: calendar_block__formatted_data.classroom_id,
        // };

        return {
            start: construct_date(
                calendar_block__formatted_data.start__date_time
            ),
            end: construct_date(calendar_block__formatted_data.end__date_time),
            title: calendar_block__formatted_data.lesson_title,
            description: calendar_block__formatted_data.teacher_id,
            location: calendar_block__formatted_data.classroom_id,
        };
    });
}

function construct_calendar(calendar__formatted_data) {
    console.log(
        '🚀: functionconstruct_calendar -> calendar__formatted_data',
        calendar__formatted_data
    );

    const { error, value } = ics.createEvents(
        calendar__ics_formatted_data(calendar__formatted_data)
    );

    if (error) {
        console.log(error);
    }

    return value;
}

module.exports = construct_calendar;
