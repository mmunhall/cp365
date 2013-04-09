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
};

exports.get = function (req, res) {
    "use strict";

    Post.find({}, function (error, posts) {
        res.send(posts);
    });
};