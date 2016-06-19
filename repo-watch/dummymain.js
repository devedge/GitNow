
var PollManager = require('pollmanager.js');
var manager = new PollManager(); // optionally add a filepath argument to config file

manager.init(function (info) {
    // stuff to do after all the watchers have been started
    // maybe callback or event emit here
});




