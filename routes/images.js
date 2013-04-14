/*global require:true, exports:true */

var Post = require('../models/post.js');

exports.get = function (req, res) {
    "use strict";

    Post.findOne({_id: req.params.id}, function (error, post) {
        res.contentType(post.image.contentType);
        res.send(post.image.data);
    });
};