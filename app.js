const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const cors = require('cors');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {},
    // partialsDir: "views/partials/", // same as default, I just like to be explicit
    layoutsDir: "views/layouts/" // same as default, I just like to be explicit
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
// app.use(formidable());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.any(), (req, res) => {
    console.log('req.files -> ', req.files);
    setTimeout(() => {
        res.send(200);
    }, 1000);
});

app.post('/uploaderr', upload.any(), (req, res) => {
    console.log('req.files -> ', req.files);
    setTimeout(() => {
        res.send(500);
    }, 1000);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
