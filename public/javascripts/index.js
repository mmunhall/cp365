/*global $:true, util:true */

var app = {
    lastDate: new Date()
};

app.getMore = function (e) {
    "use strict";

    if (e) { e.preventDefault(); }
    $.get('/get/' + app.lastDate.getTime(), {}, app.appendPosts, 'json');
};

app.appendPosts = function (data) {
    "use strict";

    var i, out = "", post;

    // TODO: Implement a suitable templating system (or learn to use jade in the browser)
    for (i in data) {
        post = data[i];
        app.lastDate = new Date(post.postDate);

        if (i === '0') {
            out += '<h2>' + app.lastDate.toLocaleDateString() + '</h2>';
        }
        out += '<div class="postContainer">';
        out += '<h3>' + post.title + '</h3>';
        out += '<img src="#" title="' + post.title + '"><br>';
        out += post.body;
        out += '</div>';
    }

    $('#postsContainer').append(out);
};

$(function () {
    "use strict";

    $('#moreLink').on('click', app.getMore);

    app.getMore();
});

