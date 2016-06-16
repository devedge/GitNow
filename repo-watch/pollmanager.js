(function() {

    'use strict';

    const Watcher = require('watcher');
    const genfeedurl = require('genfeedurl');

    // an example feed? maybe?
    var feed = {
        name: 'GitNow',
        user: 'devedge',
        feedurl: 'https://github.com/devedge/GitNow/commits/master.atom',
        refreshtime: '',
        live: true
    }


    // populate with live watchers from the config file,
    // and add new ones from the addFeed() function
    var livefeeds = {}; // an object containing a list of live watchers

    // livefeeds = {
    //     devedgeGitNow: Watcher {},
    //     etc...
    // }
    // livefeeds.devedgeGitNow.start();
    // livefeeds.devedgeGitNow.kill();

    var feedname;
    // the unique ID is the username + reponame (github doesn't allow duplicate repos)
    // NEED TO REMOVE ANY SPECIAL CHARACTERS ('.', '_', '-', etc)

    // To add a feed:
    // feedname = '' + feed.user + feed.name;
    // livefeeds[feedname] = new Watcher(url, time);


    // lifeeds array usage:
    /*
    
    var i = 0;
    // keep track of which array index was started at what point in the array
    // also store the location of the thing in some big object

    // initialize
    lifefeeds[i] = new Watcher(url, time);

    // start
    lifefeeds[i].start();

    // stop
    lifefeeds[i].kill();

    */

    // var feeds = {
    //     numfeeds: 1,
    //     active: [],
    //     '909adb9aec6641fd30e638ee43400b7f': {
    //         name: 'GitNow',
    //         user: 'devedge',
    //         feedurl: 'https://github.com/devedge/GitNow/commits/master.atom'
    //     }
    // }

    function FeedPollManager(configFile) {
        // if config file is specified, try to load it
        //      if there also another feed file, throw error

        // if no config file specified and there is no feed 
        // file, generate a new one


        /*
        var manager = new FeedPollManager();
        manager.addFeed(url, 60000);

        var Watcher = require('watcher');
        var x = new Watcher('https://github.com/devedge/GitNow/commits/master.atom', 2); // every 2min


        */

    }

    FeedPollManager.prototype.start = function start(cb) {
        // start all the repos to watch, and call back (or event emit) when done
    }

    FeedPollManager.prototype.addFeed = function addFeed(feedURL, pollTime) {
        // adds a feed, saves the feed locally (do later) and begins polling it
        // should return a unique id that can be referenced elsewhere

        // generate a new feedname
        // make that feedname a copy of the watcher function
    }

    FeedPollManager.prototype.deleteFeed = function deleteFeed(feedID) {
        
    }

    FeedPollManager.prototype.pauseFeed = function pauseFeed(feedID) {
        
    }

    FeedPollManager.prototype.resumeFeed = function resumeFeed(feedID) {
        
    }

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



    // keep an array of feeds being watched
    // if application close is called, clear the entire array
    // if a feed is paused, remove it from the array
    // if a feed is resumed, add it back to the array

})();
