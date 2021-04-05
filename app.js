var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games');
var usersRouter = require('./routes/users');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.io = io;
    next();
});

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/users', usersRouter);


io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('ip', function (data) {
        console.log(data);
    });
    socket.on('send', function (data) {
        //console.log(data);
        io.emit('receive', data);


        if (data === "exit") {
            socket.disconnect(console.log('sender disconnected'));
        }

    });

});

module.exports = app;
