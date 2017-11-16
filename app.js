var express = require('express');
var bodyParser = require('body-parser')
const routes = require('./routes/routes');
const mongoose = require('mongoose');


var app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/crud-api');
}


app.use(bodyParser.json());
routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app