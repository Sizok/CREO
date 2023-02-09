var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Pipedrive = require('pipedrive');
const PipedriveApi = require('./modules/pipedrive.module')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/uiux', function(req, res){
  console.log(req.body);
  console.log(PipedriveApi.user);
  debugger;
})

module.exports = app;
