const ics = require('ics');
const date_fns = require('date-fns');

function construct_date(date) {
    return [
        date_fns.getYear(date),
        date_fns.getMonth(date) + 1,
        date.getDate() - 1,
        date.getHours(),
        date.getMinutes(),
    ];
}

function calendar__ics_formatted_data(calendar__formatted_data) {
    return calendar__formatted_data.map((calendar_block__formatted_data) => {
        const calendar_block__ics_formatted_data = {
            start: construct_date(
                calendar_block__formatted_data.start__date_time
            ),
            end: construct_date(calendar_block__formatted_data.end__date_time),
            title: calendar_block__formatted_data.lesson_title,
            description: calendar_block__formatted_data.teacher_id,
            location: calendar_block__formatted_data.classroom_id,
        };
        return calendar_block__ics_formatted_data;
    });
}

function construct_calendar_string(calendar__formatted_data) {
    const calendar__ics_formatted_data__data = calendar__ics_formatted_data(
        calendar__formatted_data
    );
    const { error, value } = ics.createEvents(
        calendar__ics_formatted_data__data
    );

    if (error) {
        console.error(error);
    }

    return value;
}

module.exports = construct_calendar_string;
