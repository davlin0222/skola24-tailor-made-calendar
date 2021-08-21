const date_fns = require('date-fns');

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

function set_date_time(date, time_string) {
    time_array = time_string.split(':');
    const hours = time_array[0];
    const minutes = time_array[1];

    return date_fns.setMinutes(date_fns.setHours(date, hours), minutes);
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

    const start__time_string = time_values[1];
    const start__date_time = set_date_time(date, start__time_string);
    const end__time_string = time_values[3];
    const end__date_time = set_date_time(date, end__time_string);

    return { start__date_time, end__date_time };
}

function format_calendar_data(calendar__raw_data) {
    const calendar__formatted_data = calendar__raw_data.map(
        (calendar__block__data) => {
            const week_number = calendar__block__data[0];
            const date_time__obscure_string = calendar__block__data[1];

            const { start__date_time, end__date_time } = extract_date(
                week_number,
                date_time__obscure_string
            );

            return {
                start__date_time,
                end__date_time,
                lesson_title: calendar__block__data[2],
                teacher_id: calendar__block__data[3],
                classroom_id: calendar__block__data[4],
            };
        }
    );

    return calendar__formatted_data;
}

module.exports = format_calendar_data;
