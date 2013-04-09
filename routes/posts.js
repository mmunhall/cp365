/*global require:true, exports:true */

var Post = require('../models/post.js');

// Temporary: Used to create sample data.
exports.seed = function (req, res) {
    "use strict";

    Post.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
    });
    new Post({
        postDate: new Date(2013, 1, 12, 7, 36, 0),
        title: 'First Post',
        body: 'This is the first post of the blog.',
        image: 'tmp'
    }).save();
    new Post({
        postDate: new Date(2013, 1, 12, 7, 35, 0),
        title: 'Second Post',
        body: 'This is the second post of the blog.',
        image: 'tmp'
    }).save();
    new Post({
        postDate: new Date(2013, 1, 13, 7, 35, 0),
        title: 'Third Post',
        body: 'This is the third post of the blog.',
        image: 'tmp'
    }).save();
    res.send('ok');
};

exports.get = function (req, res) {
    "use strict";

    var startDate = req.params.date ? new Date(req.params.date) : new Date();

    // TODO: limit by postDate, order by postDate
    Post.find({}, function (error, posts) {
        res.send(posts);
    });
};