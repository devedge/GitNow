(function() {
    
    'use strict';

    var request = require('request');
    const EventEmitter = require('events');
    const ee = new EventEmitter();

    var watcherInterval;

    /*

    // useage:

    var Watcher = require('watcher');
    var gitnowrepo = new Watcher(feedurl, refreshtime);

    // start watching
    gitnowrepo.start();

    // kill it later
    gitnowrepo.kill();

    */

    function Watcher(feedURL, time) {





        // cb(uniqueid);
    }

    // start the interval watcher
    Watcher.prototype.start = function start() {
        watcherInterval = setInterval(function() {

        }, );
    }

    // Kill the interval watcher
    Watcher.prototype.kill = function kill() {
        clearInterval(watcherInterval);
    }


    // private function for requesting a url
    function pollFeed(feedURL) {

        request(feedURL, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                cb(null, body);
            } else {
                cb(err, null);
            }
        });
    }


    // set up event emitters to handle different actions

})();