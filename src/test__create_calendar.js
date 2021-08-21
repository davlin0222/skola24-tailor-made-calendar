const calendar__raw_data = [
    ['33', 'Onsdag 09:00 - 13:30', 'Skolstart'],
    ['33', 'Torsdag 08:30 - 10:15', 'Datalagring', 'OLR', 'E212'],
    ['33', 'Torsdag 10:30 - 12:00', 'Teknisk specialisering', 'PEFR', 'E212'],
    ['33', 'Torsdag 12:40 - 14:10', 'Gy ingenjören i praktiken', 'OLL', 'E229'],
    ['33', 'Fredag 08:30 - 10:00', 'Gy ingenjören i praktiken', 'ÅSI', 'E229'],
    ['33', 'Fredag 10:20 - 12:10', 'Mjukvarudesign', 'OLR', 'E212'],
    ['33', 'Fredag 12:50 - 14:30', 'Webbutveckling', 'PEFR', 'E212'],
];

const calendar__formatted_data = require('./format_calendar_data')(
    calendar__raw_data
);
console.log('🚀: calendar__formatted_data', calendar__formatted_data);

const calendar__constructed = require('./construct_calendar')(
    calendar__formatted_data
);

console.log('🚀: calendar__constructed', calendar__constructed);
