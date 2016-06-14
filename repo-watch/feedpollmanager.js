(function() {

    'use strict';

    var request = require('request');

    // this module actually polls the rss/atom feed

    // set up a function that takes an array of times & feed urls
    // for each of the respective time periods, request the atom url

    // an initialization function
    // a function for adding a repo to watch
    // a function for removing a repo to watch
    // an internal function to save the info about these repos to disk in a JSON file
    // 

    // maybe have two main functions:
    // a poll manager, that manages many individual pollers
    // 
    // a poller, that polls a specific repository at a time. it takes
    // care of tracking the latest commit, latest push, and loading user
    // options from a file
    
    // maybe do some kind of callback or event emitter so that the notification
    // library can be called



    var livefeeds = [];
    var feedname = '';

    // keep an array of feeds being watched
    // if application close is called, clear the entire array
    // if a feed is paused, remove it from the array
    // if a feed is resumed, add it back to the array

    function FeedPollManager(configFile) {
        // initialize the manager from a config file, or generate a new one?



        /*
        var manager = new FeedPollManager();
        manager.addFeed(url, 60000);

        var Watcher = require('watcher');
        var x = new Watcher('https://github.com/devedge/GitNow/commits/master.atom', 2); // every 2min


        */

    }

    FeedPollManager.prototype.addFeed = function addFeed(feedURL, pollTime) {
        // adds a feed, saves the feed locally (do later) and begins polling it
        // should return a unique id that can be referenced elsewhere

        // generate a new feedname
        // make that feedname a copy of the watcher function
        var s = watcher(feedURL);

        setInterval(s, pollTime);
    }

    FeedPollManager.prototype.deleteFeed = function deleteFeed(feedID) {
        
    }

    FeedPollManager.prototype.pauseFeed = function pauseFeed(feedID) {
        
    }

    FeedPollManager.prototype.resumeFeed = function resumeFeed(feedID) {
        
    }

    // The actual code that watches the repo
    function watcher(feedURL) {
        
        request(feedURL, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                console.log(body);
                keepgoing = false;

            } else {
                console.log(err);
            }
        });
    }

})();
