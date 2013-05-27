/*global module:true, require:true, setInterval:true, console:true */

/*
determine date of last post successfully processed
create a connection
fetch mail
find posts after last successful post
    parse
        allow only from listed email addresses
        must contain image file attachment

    validate
    persist
    ? log events?
    ? delete message upon successful persist?
    ? delete message upon validation failure?
setTimeout for interval

 */


var Post = require('../models/post.js'),
    POP3Client = require("poplib"),
    MailParser = require("mailparser").MailParser;

var PostFetch = function (options) {
    "use strict";

    var _this = this;
    this.options = options;
    this.mailParser = new MailParser();

    this.mailParser.on("end", function (message) {
        if (_this.messageIsValid(message)) {
            _this.savePost(message);
        }
    });
};

PostFetch.prototype.start = function () {
    "use strict";

    console.log('PostFetch fetching posts every ' + this.options.interval + ' seconds.');
    setInterval(this.createAndExecuteClient.bind(this), this.options.interval * 1000);
};

PostFetch.prototype.messageIsValid = function (message) {
    "use strict";

    if (message.attachments && message.attachments.length === 1) {
        return true;
    } else {
        console.log('invalid');
        return false;
    }
};

PostFetch.prototype.savePost = function (message) {
    "use strict";

    console.log(message);

    var post = new Post({
        postDate: new Date(message.date), // TODO: PARSE THIS CORRECTLY!
        title: message.subject,
        body: message.text,
        image: {
            data: message.attachments[0].content,
            contentType: message.attachments[0].contentType
        }
    });
    post.save();
};

PostFetch.prototype.parseMessage = function (message) {
    "use strict";

    this.mailParser.write(message);
    this.mailParser.end();
};

PostFetch.prototype.createAndExecuteClient = function () {
    "use strict";

    var _this = this,
        numMessages  = 0,
        thisMessage  = 0,
        opts         = this.options,
        client       = new POP3Client(opts.port, opts.host, {
            tlserrs: false,
            enabletls: false,
            debug: false
        });

    client.on("error", function (err) {
        if (err.errno === 111) {
            console.log("Unable to connect to server");
        } else {
            console.log("Server error occurred");
        }
        console.log(err);
    });

    client.on("connect", function () {
        client.login(opts.user, opts.pass);
    });

    client.on("invalid-state", function (cmd) {
        console.log("Invalid state. You tried calling " + cmd);
    });

    client.on("locked", function (cmd) {
        console.log("Current command has not finished yet. You tried calling " + cmd);
    });

    client.on("login", function () {
        console.log("Logged into POP3 client as " + opts.user + ".");
        client.list();
    });

    client.on("list", function (status, msgCount, msgNumber, data, rawData) {
        if (status === false) {
            console.log("LIST failed");
            client.quit();
        } else if (msgCount > 0) {
            console.log("List success with " + msgCount + " messages.");
            numMessages = msgCount;
            thisMessage = 1;
            client.retr(thisMessage);
        } else {
            client.quit();
        }
    });

    client.on("retr", function (status, msgNumber, data, rawData) {
        if (status === true) {
            console.log("RETR success for message number " + msgNumber);
            // TODO: Validate data.
            _this.parseMessage(data);
            client.dele(msgNumber);
        } else {
            console.log("RETR failed for msgnumber " + msgNumber);
            client.quit();
        }
    });

    client.on("dele", function (status, msgNumber, data, rawData) {
        if (status === true) {
            console.log("DELE success for msgnumber " + msgNumber);
            if (thisMessage < numMessages) {
                client.retr(++thisMessage);
            } else {
                client.quit();
            }
        } else {
            console.log("DELE failed for msgnumber " + msgNumber);
            client.rset();
        }
    });

    client.on("rest", function () {
        client.quit();
    });
};

module.exports = PostFetch;


