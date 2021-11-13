"use strict";

var express = require('express');

var logger = require('morgan');

var mongoose = require('mongoose');

var PORT = process.env.PORT || 3005;
var app = express();
app.use(logger('dev'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express["static"]('public'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mgroberman:<password>@cluster0.toizs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false
});

require('./routes/htmlroutes')(app);

require('./routes/apiroutes')(app);

app.listen(PORT, function () {
  console.log("App running on port ".concat(PORT, "!"));
});