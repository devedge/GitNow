(function() {
    
    'use strict';

    // Initialize the variables used as imports. To reduce overhead, 
    // these modules are 'require()'d in the poll manager (pollmanager.js)
    var notifier;
    var request;

    // global (within this module) event emitter
    const EventEmitter = require('events');
    const w_event = new EventEmitter();

    var watcherInterval;
    var refreshtime;
    var feedURL;

    var started = false;

    var name;
    var repo;

    /*

    Adaptive watching?
    if a feed has been pushed to recently, watch it more closely for a period of x min (2nd level)
        if no updates within that time period, fall back to the regular watch time (1st level)
    if there are more pushes within that short time period, upgrade to a faster watch time (3rd level)?
        if there haven't been pushes within x time, fall all the way back to the 1st level?

    // usage:

    var Watcher = require('watcher');
    var gitnowrepo = new Watcher(feedurl, refreshtime);

    // start watching
    gitnowrepo.start();

    // kill it later
    gitnowrepo.kill();

    */

    // Constructor function to initiialize a new repository to watch
    // pass in time as seconds
    function Watcher(url, time, r, n, err) {
        // initialize a new repo here
        // need to ensure values here are valid?

        // make sure the time is greater than or equal to 1min 10sec
        // default time 5-7 minutes

        // verify the time is not too short
        // verify that it is an integer
        // verify that it is not too large

        feedURL = url;
        refreshtime = time * 1000;
        request = r;
        notifier = n;

        // do we still want to generate a unique id?
    }

    // Start the interval watcher (add an optional extra time argument?)
    Watcher.prototype.start = function start() {

        // if the watcher has already been started, throw an error?
        if (started !== false) {
            // throw some error
            console.log('ERROR: Feed has already been started');
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
            console.log('ERROR: Feed has not been started');
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
                w_event.emit('response', body);
            } else {
                w_event.emit('error', err, resp);
            }
        });
    }


    // set up event emitters to handle different actions
    
    w_event.on('error', function (err, resp) {
        var errortitle;
        var message;

        if (resp) {
            if (resp.statusCode === 404){
                errortitle = repo + ' - ERROR: Repo not found';
                message = 'The link location may have been mistyped';
            }
        }
        // depending on the status code sent out, return different error messages
        // eg., if 'resp.statusCode' is 404, return an error message about how the repo
        //      cannot be found, and double check spelling

        // try to find out if there is a connection error
        // if so, just display a message in the GUI about needing an internet conection
        console.log(err);
    });

    w_event.on('response', function (body) {
        // from here, asynchronously parse the body to determine if there were any changes
        // if anything notable happened, use the emitter 'w_event' to handle

        // console.log('yup, working');

        notifier.notify({
            title: 'GitNow - ERROR: Repo not found',
            message: 'The link location may have been mistyped'
        });

        // check for differences, probably with a hash since that will be quicker
        // if there are any, then handle them (with imported parser) and notify the application
    });

    w_event.on('notify', function() {
        // DONT DO THIS
        // to reduce overhead, import the notify module here
        // when the notification is done, set the value to 'null' so it will be garbage collected
    });


    module.exports = Watcher;

})();