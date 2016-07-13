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



    module.exports = PollManager;

})();
