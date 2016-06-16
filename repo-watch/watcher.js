(function() {
    
    'use strict';

    var request = require('request');

    // global (within this module) event emitter
    const EventEmitter = require('events');
    const event = new EventEmitter();

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

        // if the watcher has already been started, throw an error?
        if (started !== false) {
            // throw some error
        } else {
            // watch the 'feedURL' every 'refreshtime' amount
            watcherInterval = setInterval(function() {
                pollFeed(feedURL);
            }, refreshtime);

            started = true;
        }
    }

    // Kill the interval watcher
    Watcher.prototype.kill = function kill() {

        // if the watcher has already been killed, throw an error?
        if (started !== true) {
            // throw some error
        } else {
            clearInterval(watcherInterval);
            started = false;
        }
    }


    // private function for requesting a url
    function pollFeed(feedURL) {

        // Do a simple GET request for the feed
        // (do we want to send additional data, like headers?)
        request(feedURL, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                event.emit('response', body);
            } else {
                event.emit('error', err, resp);
            }
        });
    }


    // set up event emitters to handle different actions
    
    event.on('error', function (err) {

        // depending on the status code sent out, return different error messages
        // eg., if 'resp.statusCode' is 404, return an error message about how the repo
        //      cannot be found, and double check spelling

        console.log(err);
    });

    event.on('response', function (body) {
        // from here, asynchronously parse the body to determine if there were any changes
        // if anything notable happened, use the emitter 'event' to handle

        console.log('yup, working');


        // check for differences, probably with a hash since that will be quicker
        // if there are any, then handle them (with imported parser) and notify the application
    });


    module.exports = Watcher;

})();