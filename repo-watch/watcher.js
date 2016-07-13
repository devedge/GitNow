(function() {
    
    'use strict';

    // Initialize the variables used as imports. To reduce overhead, 
    // these modules are 'require()'d in the poll manager (pollmanager.js)
    var notifier;
    var request;

    // event emitter for this module
    const EventEmitter = require('events');
    const w_event = new EventEmitter();

    var localsettings = {};
    var watcherInterval;

    var started = false;
    var refreshtime;
    var feedURL;

    // variables for the adapt_interval() function
    // 20 min, 10 min, 3 min
    // var timeintervals = [1200000, 600000, 180000];
    var timeintervals = [20000, 10000, 3000];
    var watchlevel = 0;
    var wait = true;


    // Constructor function to initiialize a new repository to watch
    // pass in time as seconds
    function Watcher(url, r, n, err) {
        // initialize a new repo watcher here
        // need to ensure values here are valid?

        feedURL = url;
        // refreshtime = time * 1000;
        refreshtime = timeintervals[0];
        request = r;
        notifier = n;

        // do we still want to generate a unique id?
    }

    // Start the interval watcher (add an optional extra time argument?)
    Watcher.prototype.start = function start() {

        // if the watcher has already been started, throw an error?
        if (started === true) {
            // throw some error
            // console.log('ERROR: Feed has already been started');
        } else {
            // watch the 'feedURL' every 'refreshtime' amount
            watcherInterval = setInterval(function() {
                pollFeed(feedURL, false);
            }, refreshtime);

            started = true;

            pollFeed(feedURL, true);
        }
    }

    // Kill the interval watcher
    Watcher.prototype.kill = function kill() {

        // if the watcher has already been killed, throw an error?
        if (started === false) {
            // throw some error
            // console.log('ERROR: Feed has not been started');
        } else {
            clearInterval(watcherInterval);
            started = false;
        }
    }

    // Manually force a recheck
    Watcher.prototype.force = function force() {
        pollFeed(feedURL, true);
    }


    /* private function for requesting a url
     *
     * @param feedURL {string}
     * @param forced {bool} true if the poll was called by the '.force()' function
     *
     */
    function pollFeed(feedURL, forced) {
        var FeedParser = require('feedparser');

        var req = request(feedURL);
        var feedparser = new FeedParser([]);

        req.on('response', function (res) {
            var stream = this;

            if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

            stream.pipe(feedparser);
        });

        feedparser.on('error', function(error) {
            // always handle errors 
        });
        feedparser.on('readable', function() {
            // This is where the action is! 
            var stream = this;
             // **NOTE** the "meta" is always available in the context of the feedparser instance
            var meta = this.meta; 
            var item;
         
            while (item = stream.read()) {
                console.log(item);
            }
        });

        // Do a simple GET request for the feed
        // (do we want to send additional data, like headers?)
        // request(feedURL, function(err, resp, body) {
        //     if(!err && (resp.statusCode === 200)) {
        //         w_event.emit('response', body);
        //     } else {
        //         w_event.emit('error', err, resp);
        //     }
        // });

        console.log('polling url: ' + feedURL + ' -- ' + timeintervals[watchlevel]);

        // Dummy code for testings
        w_event.emit('response', 'exampledatainbody', forced);
    }



    function adapt_interval(updated) {
        if (updated) {
            if (watchlevel === 0) {
                watchlevel = 1; // refresh the watcher here
                reset_time(timeintervals[watchlevel]);
                wait = true;
            } else if (watchlevel === 1) {
                watchlevel = 2; // refresh the watcher here
                reset_time(timeintervals[watchlevel]);
                wait = true;
            }
        } else {
            if (watchlevel === 2) {
                if (wait) {
                    wait = false;
                } else {
                    watchlevel = 1; // refresh the watcher here
                    reset_time(timeintervals[watchlevel]);
                    wait = true;
                }
            } else if (watchlevel === 1) {
                if (wait) {
                    wait = false;
                } else {
                    watchlevel = 0; // refresh the watcher here
                    reset_time(timeintervals[watchlevel]);
                    wait = true;
                }
            }
        }
    }



    function reset_time(newtime) {
        // if (watcherInterval !== null) {
            // if (started === true) {

        // stop the interval
        clearInterval(watcherInterval);

        // restart it with the new time
        watcherInterval = setInterval(function() {
            pollFeed(feedURL);
        }, newtime);

        // stupid, but if the user killed the watcher just before
        // the previous operation, need to re-kill it
        if (started === false) {
            clearInterval(watcherInterval);
        }

            // }
        // }
    }



    w_event.on('error', function (err, resp) {

    });


    w_event.on('response', function (body, forced) {

        if (forced) {
            adapt_interval(false);
        } else {
            adapt_interval(true);
        }
        // if there was an update
        // adapt_interval(true);

        // else if there was no update
        // adapt_interval(false);
    });


    w_event.on('notify', function() {
    });








    module.exports = Watcher;


})();