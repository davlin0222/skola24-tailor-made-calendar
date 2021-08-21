const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

/* ------------------------------- Middlewares ------------------------------ */

// HTTP loggers
app.use(require('morgan')('dev'));
// app.use(require('pino-http')({ prettyPrint: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});

app.post('/create-calendar', async (req, res) => {
    const calendar__raw_data = await require('./webscrape/webscrape')({
        ...req.body,
    });

    const calendar__formatted_data = require('./calendar/format_calendar_data')(
        calendar__raw_data
    );

    const calendar_string__constructed = require('./calendar/construct_calendar_string')(
        calendar__formatted_data
    );

    fs.writeFileSync(
        `${__dirname}/../,created-calendars/school.ics`,
        calendar_string__constructed
    );
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Server up and running on port ${PORT}`);
});
