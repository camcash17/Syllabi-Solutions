const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

app.use('*', (req, res) => {
  res.redirect('/')
});