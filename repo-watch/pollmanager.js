(function() {

    'use strict';

    // to maximize memory efficiency, 'require' everything here. references can 
    // be passed around as arguments instead of 'requiring' a new module
    // every time something gets initialized
    const request = require('request');
    const notifier = require('node-notifier');
    const Watcher = require('./watcher');
    const genfeedurl = require('./genfeedurl');

    const fs = require('fs');

    // The application configuration. It is updated and saved locally as
    // JSON on major events (eg., just after adding/deleting a repo).
    // EXAMPLE
    var config = {
        repos: [],
        livefeeds: [],
        /*repos: ['devedgeGitNow', 'inikulinineed'],
        livefeeds: ['devedgeGitNow'],
        numrepos: 2,
        devedgeGitNow: {
            "ID": "devedgeGitNow",
            "feedurl": "https://github.com/devedge/GitNow/commits/master.atom",
            "refreshrate": 1200,
            "live": true,
            "user": "devedge",
            "repo": "GitNow",
            "lastpush": {
                "date": "",
                "hash": ""
            }
        },
        inikulinineed: {
            "ID": "inikulinineed",
            "feedURL": "https://github.com/inikulin/ineed/commits/master.atom",
            "refreshrate": 1200,
            "live": false,
            "user": "inikulin",
            "repo": "ineed",
            "lastpush": {
                "date": "",
                "hash": ""
            }
        }*/
    };

    // Poll time is currently 20 minutes, but may be adjusted
    // var polltime = 1200;
    
    // populate with live watchers from the config file,
    // and add new ones from the addFeed() function
    var livewatchers = {}; // an object containing a list of live watchers
    // var livefeedIDs = [];  // an array containing the IDs of all the live feeds

    // the unique ID is the username + reponame (github doesn't allow duplicate repos)
    // NEED TO REMOVE ANY SPECIAL CHARACTERS ('.', '_', '-', etc)
    // HOW TO HANDLE USERS WITH SPACES/SPECIAL CHARACTER IN THEIR NAME
    var newfeed;

    // configFile: '../app-data/app_config.json'
    function PollManager(configFile) {

        // load the configuration file
        try {
            // confirm that the config file exists
            fs.statSync(configFile).isFile();

            // read the JSON object into a local variable
            config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
            
        } catch (e) {
            // if it doesn't exist, create it
            fs.writeFileSync(configFile, JSON.stringify(config));

            // what if the file isn't JSON? overwrite it and create another one?

        }

        // DEPRECATED?
        // livefeedIDs = config.livefeeds;
    }

    PollManager.prototype.init = function init(cb) {
        // IF THERE IS AN INTERNET CONNECTION
        // start all the repos to watch, and call back (or event emit) when done

        console.log('Watching Repos:');

        // For each of the live feeds, start the watchers
        config.livefeeds.forEach(function (element) {

            console.log('-- ' + config[element].repo);

            // make a new watcher
            livewatchers[element] = new Watcher(config[element].feedurl, request, notifier);
            // start it
            livewatchers[element].start();

            // force an immediate check
            livewatchers[element].force();

        });
    }

    // have two poll times, regular and priority

    // Add a new feed to the config object and start watching it
    PollManager.prototype.addFeed = function addFeed(feedURL) {


        // adds a feed, saves the feed locally (do later) and begins polling it
        // should return a unique id that can be referenced elsewhere

        // generate a new feedname
        // make that feedname a copy of the watcher function

        newfeed = genfeedurl.fromGitUrl(feedURL);

        // Initialize this new feed in the config file (need to do async fs save)
        config[newfeed.ID] = {
            // ID: newfeed.ID,
            feedurl: newfeed.url,
            // refreshrate: polltime,
            // live: true,
            user: newfeed.username,
            repo: newfeed.reponame
            // latest push: {
            //     date: '',
            //     hash: '',
            // }
        };

        // add the feed id to the live feed arrays. These arrays keep track of what feeds
        // to initialize at start time
        // livefeeds.push(newfeed.ID);
        config.livefeeds.push(newfeed.ID);

        // To reduce memory overhead and optimize speed, pass shared (const) references 
        // to the 'request' and 'notifier' modules (instead of 'require()' a new one per module).
        livewatchers[feed.ID] = new Watcher(feed.url, /*polltime,*/ request, notifier);
        livewatchers[feed.ID].start();
    }

    // make sure the feed has been stopped, then remove it from the config object
    PollManager.prototype.deleteFeed = function deleteFeed(feedID) {
        
    }

    // Kill the watcher and remove it from the live feed list
    PollManager.prototype.pauseFeed = function pauseFeed(feedID) {
        // TODO
        livewatchers[feedID].kill();
        // async save to disk here
    }

    // Add the watcher back to the live feed list 
    PollManager.prototype.resumeFeed = function resumeFeed(feedID) {
        // If the feed is not present in the livefeeds array
        config.livefeeds.push(feedID);
        livewatchers[feedID].start();
        // async save to disk here
    }

    PollManager.prototype.shutDown = function shutDown() {
        
        config.livefeeds.forEach(function(element) {
            livewatchers[element].kill();
        });
    }


    // few other ideal methods:
    // list all live feeds
    // list all feeds


    // an example feed? maybe?
    // var feed = {
    //     name: 'GitNow',
    //     user: 'devedge',
    //     feedurl: 'https://github.com/devedge/GitNow/commits/master.atom',
    //     refreshtime: '',
    //     live: true
    // }
    // livefeeds = {
    //     devedgeGitNow: Watcher {},
    //     etc...
    // }
    // livefeeds.devedgeGitNow.start();
    // livefeeds.devedgeGitNow.kill();
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
    
    /*
    var manager = new PollManager();
    manager.addFeed(url, 60000);

    var Watcher = require('watcher');
    var x = new Watcher('https://github.com/devedge/GitNow/commits/master.atom', 2); // every 2min


    */


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

    module.exports = PollManager;

})();
