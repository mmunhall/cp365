var express = require('express');
var stylus = require('stylus');
var mongoose = require('mongoose');
var url = require('url');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.set('url', url.parse('http://localhost:8080'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

mongoose.connect('mongodb://localhost/cp365');

var routes = {
    index: require('./routes/index.js'),
    posts: require('./routes/posts.js')
}

app.get("/", routes.index.drawPage);
app.get("/seed", routes.posts.seed);
app.get("/get/:date?", routes.posts.get);

app.listen(app.get('url').port);
console.log('App running on port ' + app.get('url').port + '. Navigate to ' + url.format(app.get('url')) + '.'); 
