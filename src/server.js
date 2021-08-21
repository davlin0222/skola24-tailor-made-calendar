const path = require('path');
// const fs = require('fs');

const express = require('express');
const app = express();

// HTTP loggers
app.use(require('morgan')('dev'));
// app.use(require('pino-http')({ prettyPrint: true }));

// Middlewares
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});

app.post('/create-calendar', (req, res) => {
    const calendar__raw_data = require('./webscrape')({ ...req.body });
    console.log('🚀: calendar__raw_data', calendar__raw_data);

    // const calendar__formatted_data = require("./format_calendar_data")(calendar__raw_data)
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Server up and running on port ${PORT}`);
});
