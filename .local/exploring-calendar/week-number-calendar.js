const calendar_create = (calendar_name, events_string) => {
  const calendar_begin =
    `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${calendar_name}
X-WR-TIMEZONE:Europe/Stockholm
BEGIN:VTIMEZONE
TZID:Europe/Amsterdam
X-LIC-LOCATION:Europe/Amsterdam
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VTIMEZONE
TZID:Europe/Stockholm
X-LIC-LOCATION:Europe/Stockholm
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VTIMEZONE
TZID:Europe/Berlin
X-LIC-LOCATION:Europe/Berlin
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END: VTIMEZONE`
  const calender_end = `END: VCALENDAR`

  return `${calendar_begin}
${events_string}
${calender_end}`
}



const week_number_calendar_create = () => {
  const event_create = (summery, start_date, end_date) => {
    return `BEGIN:VEVENT
DTSTART;VALUE=DATE:${formatDate(start_date)}
DTEND;VALUE=DATE:${formatDate(end_date)}
DTSTAMP:20210430T062829Z
CREATED:20210430T061918Z
DESCRIPTION:
LAST-MODIFIED:20210430T061918Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:${summery}
TRANSP:TRANSPARENT
END:VEVENT`
  }

  const date_first_of_2021 = new Date(2021, 0, 2)
  const date_last_of_2021 = new Date(2021, 12, 1)

  const dates_mondays_2021 = populate_week_range_options(date_first_of_2021, date_last_of_2021)
  console.log('dates_mondays_2021.map(formatDate):', dates_mondays_2021.map(formatDate))

  const event_string = dates_mondays_2021.reduce((event_string, date_monday) => {
    return event_string + event_create('W.' + date_monday.getWeek(), date_monday, new Date(date_monday.getDate() - 1))
  }, '');

  console.log('event_string:', event_string)



  return calendar_create(name, event_string)
}

const week_number_calendar = week_number_calendar_create();



function formatDate(date) {
  return (
    date.getFullYear() +
    '' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '' +
    (date.getDate() < 10 ? '0' : '') +
    date.getDate()
  );
}

function populate_week_range_options(date_start, date_end) {
  // var start_week_date = new Date(2012, 7 - 1, 2); // no queries exist before this
  // var todays_date = new Date();

  // array to hold week commencing dates
  var week_commencing_dates = new Array();
  var first_monday_date = new Date(2012, 7 - 1, 2); // no queries exist before this
  week_commencing_dates.push(first_monday_date);

  while (date_start < date_end) {
    var next_date = date_start.setDate(date_start.getDate() + 1);

    var next_days_date = new Date(next_date);
    day_index = next_days_date.getDay();
    if (day_index == 2) {
      week_commencing_dates.push(next_days_date);
    }
    // increment the date
    date_start = new Date(next_date);
  }

  return week_commencing_dates;
}