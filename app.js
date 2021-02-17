const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const userRouter = require('./routes/user-route');
const storyRouter = require('./routes/story-router');
// const models = require('./models/index')

const app = express();
app.use(cors());

app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/story', storyRouter);

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
