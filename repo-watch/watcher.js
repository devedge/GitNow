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


        // Do a simple GET request for the feed
        // (do we want to send additional data, like headers?)
        // request(feedURL, function(err, resp, body) {
        //     if(!err && (resp.statusCode === 200)) {
        //         w_event.emit('response', body);
        //     } else {
        //         w_event.emit('error', err, resp);
        //     }
        // });

        // Dummy code for testings
        w_event.emit('response', 'exampledatainbody');
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


    w_event.on('response', function (body) {

        console.log('-- polled; watching: ' + timeintervals[watchlevel]);

        // if there was an update
        adapt_interval(true);

        // else if there was no update
        // adapt_interval(false);
    });


    w_event.on('notify', function() {
    });








    module.exports = Watcher;



    


    // this is true if the last check was new
    // var lastupdate = false;
    



    // var array = [1200, 600, 180];
    // 20 min
    // 10 min
    // 3 min

    
    // level 0, last 2 checks had no updates
    // level 1, the check before last had an update
    // level 2, last check had an update

    // var watch_time = 1200;



    // var name;
    // var repo;

    /*

    Adaptive watching?
    if a feed has been pushed to recently, watch it more closely for a period of x min (2nd level)
        if no updates within that time period, fall back to the regular watch time (1st level)
    if there are more pushes within that short time period, upgrade to a faster watch time (3rd level)?
        if there haven't been pushes within x time, fall all the way back to the 1st level?

    FLUSHED OUT

    first watch time: 20 min
    if there was something within that 20min, upgrade to 10 min watch time
        if there is something again within the next 10 min, upgrade to checking every 3? min
            if there has been no updates after 4 tries at 3? min, downgrade back to watching 
            every 10 min.

        else watch for another 10min. if there is still nothing after the second attempt,
        revert back to 20min.
    else keep watching at 20 min.




    // usage:

    var Watcher = require('watcher');
    var gitnowrepo = new Watcher(feedurl, refreshtime);

    // start watching
    gitnowrepo.start();

    // kill it later
    gitnowrepo.kill();

    */





    // local private functions for handling the interval
    // these are used when the adaptive watcher needs to change the watch times

    // call in pollFeed() after every call?
    // or call after the results of the diff?
    // @param updated - a boolean, true if the last check had an update and false otherwise
    // function adapt_interval(updated) {
    //     // if the last check had an update, then the watch time needs to be bumped up a level
    //     //      if the level is the highest, don't bump up anymore
    //     // if the last check did not have an update, then nothing done
    //     // if the last two checks did not have an update, then drop down a level

    //     // examples:
    //     // 20 min interval, + an update
    //     // interval bumped to 10 min

    //     // 10 min interval, no update
    //     // do nothing
    //     // another 10 min interval, no update
    //     // bump down to 20 min

    //     // 20 min interval, + an update
    //     // interval bumped to 10 min
    //     // no update after 10 min, do nothing
    //     // another update, bump interval to 3 min
    //     // after 3 min, no update
    //     // do nothing
    //     // after another 3 min, no update
    //     // again, do nothing
    //     // another 3 min, no update
    //     // downgrade back to 10 min (if there was any activity, it would stay at 3 min)

    // }





    // Handlers for the event emitters


    // set up event emitters to handle different actions
    
        // var errortitle;
        // var message;

        // if (resp) {
        //     if (resp.statusCode === 404){
        //         // errortitle = repo + ' - ERROR: Repo not found';
        //         // message = 'The link location may have been mistyped';
        //     }
        // }
        // depending on the status code sent out, return different error messages
        // eg., if 'resp.statusCode' is 404, return an error message about how the repo
        //      cannot be found, and double check spelling

        // try to find out if there is a connection error
        // if so, just display a message in the GUI about needing an internet conection
        // console.log(err);





        // from here, asynchronously parse the body to determine if there were any changes
        // if anything notable happened, use the emitter 'w_event' to handle

        // console.log('yup, working');

        // notifier.notify({
        //     title: 'GitNow - ERROR: Repo not found',
        //     message: 'The link location may have been mistyped'
        // });


        




        // check for differences, probably with a hash since that will be quicker
        // if there are any, then handle them (with imported parser) and notify the application
        // DONT DO THIS
        // to reduce overhead, import the notify module here
        // when the notification is done, set the value to 'null' so it will be garbage collected



})();