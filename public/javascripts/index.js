/*global $:true _:true */

var app = {};

app.appendPosts = function (data) {
    "use strict";

    var currentPostDate = new Date(1973, 1, 12);
    for (var i in data) {
        // TODO: Implement a suitable templating system (or learn to use jade in the browser)

        var out = "";
        var post = data[i];

        var thisPostDate = new Date(post.postDate);
        thisPostDate.setHours(0);
        thisPostDate.setMinutes(0);
        thisPostDate.setSeconds(0);
        thisPostDate.setMilliseconds(0);

        if (thisPostDate.getTime() !== currentPostDate.getTime()) {
            currentPostDate = thisPostDate;
            out += '<h2>' + currentPostDate + '</h2>';
        }
        out += '<div class="postContainer">';
        out += '<h3>' + post.title + '</h3>';
        out += '<img src="#" title="' + post.title + '"><br>';
        out += post.body;
        out += '</div>';

        $('#postsContainer').append(out);
    }
};

$(function () {
    "use strict";
    $.get('/get', {}, app.appendPosts, 'json');
});

