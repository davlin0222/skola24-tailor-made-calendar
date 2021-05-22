const path = require('path');

const express = require('express');
const app = express();

// HTTP loggers
app.use(require('morgan')('dev'));
// app.use(require('pino-http')({ prettyPrint: true }));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/', (req, res) => {
  // console.log('🚀 ~ file: server.js ~ line 14 ~ app.post ~ req', req);
  console.log('🚀 ~ file: server.js ~ line 13 ~ app.post ~ req.body', req.body);
  res.send(req.body);
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server up and running on port ${PORT}`);
});
