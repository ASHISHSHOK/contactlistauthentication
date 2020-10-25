var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');




var app = express();

/* Mongoose init and schema load */
mongoose.connect("mongodb://localhost:27017/usercollection", {useNewUrlParser: true, useUnifiedTopology: true});
var teacherModel = require('./models/config');
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, 'views'));


/* routers */
var router = express.Router();

router.route('/contacts')
.get(require('./controllers/contactsGet'))
.post(require('./controllers/contactsPost'));

router.route('/contact/:id')
.get(require('./controllers/contactGet'))
.delete(require('./controllers/contactDelete'))
.put(require('./controllers/contactPut'));

app.use(router);

app.engine('html',require('ejs').renderFile);

app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

/* App Configs */
var port = process.env.PORT || 80;
app.listen(port);
console.log('Express started at Port 80');
