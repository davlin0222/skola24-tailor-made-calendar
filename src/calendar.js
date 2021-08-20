const ical = require('ical-generator');
const { DateTime } = require('luxon');

const week_swedish_days = [
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
    'Söndag',
];
/**
 * @param  {} week_number
 * @param  {} calendar_blocks__array
 */
module.exports = function (week_number, calendar_blocks__array) {
    // console.log('🚀 ~ week_number', week_number);
    const calendar = new ical.ICalCalendar();
    // calendar.timezone({
    //     name: 'foo',
    //     generator: ical.getVtimezoneComponent,
    // });
    calendar_blocks__array.forEach(calendar__block => {
        console.log('🚀 ~ calendar__block[0]', calendar__block[0]);
        const week_day__swedish = calendar__block[0].slice(
            0,
            calendar__block[0].indexOf(' ')
        );
        const week_day_index = week_swedish_days.indexOf(week_day__swedish);
        // console.log('🚀 ~ week_day_index', week_day_index);
        calendar.createEvent({
            start: DateTime.local(),
            end: DateTime.local().plus({ hours: 1 }),
            summary: 'Example Event',
            description: 'It works ;)',
            location: 'my room',
            url: 'http://sebbo.net/',
        });
        // console.log(
        //     '🚀 ~ DateTime.local()',
        //     DateTime.local().plus({ hours: 1 })
        // );
    });
    save(calendar);
    return calendar;
};
/**
 * @param  {} calendar
 */
async function save(calendar) {
    await calendar.save('./.local/calendar.ical');
}
