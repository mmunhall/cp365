/*global require:true, module:true, Buffer:true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//var Buffer = Schema.Buffer;

var commentSchema = new Schema({
    author: String,
    email: String,
    body: String,
    approved: {type: Boolean}
});

var postSchema = new Schema({
    _id: ObjectId,
    postDate: Date,
    title: String,
    body: String,
    image: {
        data: Buffer,
        contentType: String
    },
    comments: [commentSchema]
});

postSchema.methods.toJSON = function () {
    "use strict";

    var obj = this.toObject();
    delete obj.image;
    return obj;
};

module.exports = mongoose.model('Post', postSchema);
