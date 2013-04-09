var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    author: String,
    email: String,
    body: String,
    approved: {type: Boolean, default: false}    
});

var postSchema = new Schema({
    _id: ObjectId,
    postDate: {type: Date},
    title: String,
    body: String,
    image: String, // TODO: Make this a binary image
    comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
