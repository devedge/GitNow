(function() {
    
    'use strict';

    var request = require('request');

    // global (within this module) event emitter
    const EventEmitter = require('events');
    const e = new EventEmitter();

    var started = false;
    var watcherInterval;
    var feedURL;
    var refreshtime;

    /*

    // usage:

    var Watcher = require('watcher');
    var gitnowrepo = new Watcher(feedurl, refreshtime);

    // start watching
    gitnowrepo.start();

    // kill it later
    gitnowrepo.kill();

    */

    // Constructor function to initiialize a new repository to watch
    function Watcher(url, time) {
        // initialize a new repo here
        // need to ensure values here are valid?

        // make sure the time is greater than or equal to 1min 10sec
        // default time 5 minutes

        feedURL = url;
        refreshtime = time;

        // do we still want to generate a unique id?
    }

    // Start the interval watcher
    Watcher.prototype.start = function start() {
        // do error checking for the 'started' variable
        watcherInterval = setInterval(function() {
            pollFeed(feedURL);

        }, refreshtime);

        started = true;
    }

    // Kill the interval watcher
    Watcher.prototype.kill = function kill() {
        // do error checking for the 'started' variable
        clearInterval(watcherInterval);

        started = false;
    }


    // private function for requesting a url
    function pollFeed(feedURL) {

        request(feedURL, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                e.emit('response', body);
            } else {
                e.emit('error', err);
            }
        });
    }


    // set up event emitters to handle different actions
    
    e.on('error', function (err) {
        console.log(err);
    });

    e.on('response', function (body) {
        // check for differences, probably with a hash since that will be quicker
        // if there are any, then handle them (with imported parser) and notify the application
        console.log('yup, working');
    });


    module.exports = Watcher;

})();