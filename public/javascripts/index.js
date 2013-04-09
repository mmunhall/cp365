/*global $:true _:true */

var app = {};

app.appendPosts = function (data) {
    "use strict";

    for (var i in data) {
        var post = data[i];

        // TODO: Implement a suitable templating system (or learn to use jade in the browser)
        var out = "";
        out += '<div class="postContainer">';
        out += '<h3>' + post.title + '</h3>';
        out += '<img src="#" title="' + post.title + '">';
        out += post.body;
        out += '</div>';

        $('#postsContainer').append(out);
    }
};

$(function () {
    "use strict";
    $.get('/get/1', {}, app.appendPosts, 'json');
});

