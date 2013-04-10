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

    var lastDate = new Date(parseInt(req.params.date, 10)),
        dateQuery;

    dateQuery = Post.findOne({postDate: {$lt: lastDate}});
    dateQuery.limit(1);
    dateQuery.sort('-postDate');
    dateQuery.exec(function (error, nextDateObj) {
        var maxDate, minDate;
        if (nextDateObj === null) {
            res.send({});
        } else {
            maxDate = new Date(nextDateObj.postDate);
            minDate = new Date(maxDate);
            minDate.setHours(0, 0, 0, 0);
            Post.find({postDate: {$lte: maxDate, $gt: minDate}}, function (error, posts) {
                res.send(posts);
            });
        }
    });
};