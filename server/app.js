if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/router'));
app.use(require('./middlewares/errorhandler'));

module.exports = app;
