(function() {

    'use strict';

    // this module actually polls the rss/atom feed

    // set up a function that takes an array of times & feed urls
    // for each of the respective time periods, request the atom url

    // maybe have two main functions:
    // a poll manager, that manages many individual pollers
    // 
    // a poller, that polls a specific repository at a time. it takes
    // care of tracking the latest commit, latest push, and loading user
    // options from a file
    
    // maybe do some kind of callback or event emitter so that the notification
    // library can be called

});