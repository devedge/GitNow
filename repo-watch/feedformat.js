(function() {
   
   'use strict';

    // functions here will have the option to generate an the right url 
    // for the feed the user will want
    
    // ideas:
    // maybe verify that the url is a legit github url
    // looks like github has several rss feeds for branches, need to check that

    function FeedFormat() {
        // maybe some setup stuff here
        // 
        // this can be instantiated with: "var feedformat = new FeedFormat();"
        // and then the 'init()' function can be called to re-initialize the
        // variables for each repo
    }

    FeedFormat.prototype.init = function init(argument) {
        // settings to initialise a FeedFormat instance
    }

    // other functions to create a feed url from 
    // 1. a user name and repo name
    // 2. the direct url to the repository
    // 3. the git url you can copy while cloning a repo
    // anything else... Not hard to implement, but maybe too many options for the user...
    
    FeedFormat.prototype.fromNameAndRepo = function fromNameAndRepo(values, cb) {
        var u = values.user;
        var r = values.repo;

        // after parsing, call back using 'cb'
    }
    
    FeedFormat.prototype.fromUrl = function fromUrl(urlstring, cb) {
        // after parsing, call back using 'cb'
    }

    FeedFormat.prototype.fromGitUrl = function fromGitUrl(urlstring, cb) {
        // after parsing, call back using 'cb'
    }

    // Allow this module to be exported and used
    module.exports = FeedFormat;

})();
