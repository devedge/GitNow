(function() {
    
    'use strict';

    var request = require('request');

    // global (withing this module) event emitter
    const EventEmitter = require('events');
    const e = new EventEmitter();

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

    function Watcher(fu, r) {
        // initialize a new repo here
        // need to ensure values here are valid?
        feedURL = fu;
        refreshtime = r;

        // do we still want to generate a unique id?
    }

    // Start the interval watcher
    Watcher.prototype.start = function start() {
        watcherInterval = setInterval(function() {
            pollFeed(feedURL);

        }, refreshtime);
    }

    // Kill the interval watcher
    Watcher.prototype.kill = function kill() {
        clearInterval(watcherInterval);
    }


    // private function for requesting a url
    function pollFeed(feedURL) {

        request(feedURL, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                // cb(null, body);
                e.emit('response', body);
            } else {
                // cb(err, null);
                e.emit('error', err);
            }
        });
    }


    // set up event emitters to handle different actions
    e.on('err', function (err) {
        console.log(err);
    });

    e.on('response', function (body) {
        // check for differences, probably with a hash since that will be quicker
        // if there are any, then handle them and notify the application
    });

})();