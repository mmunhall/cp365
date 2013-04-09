var express = require('express');
var stylus = require('stylus');
var mongoose = require('mongoose');
var Post = require('./models/post.js');
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

app.get("/", function(req, res) {
    res.render('index.jade', {});
});

// Temporary: Used to create sample data.
app.get("/seed", function(req, res) {
    Post.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
    });
    new Post({
        postDate: new Date(),
        title: 'First Post',
        body: 'This is the first post of the blog.',
        image: 'tmp'
    }).save();
    new Post({
        postDate: new Date(),
        title: 'Second Post',
        body: 'This is the second post of the blog.',
        image: 'tmp'
    }).save();
    res.send('ok');
});

app.listen(app.get('url').port);
console.log('App running on port ' + app.get('url').port + '. Navigate to ' + url.format(app.get('url')) + '.'); 
