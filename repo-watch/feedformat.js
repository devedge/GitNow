(function() {
   
   'use strict';

    var baseurl = 'https://github.com/';
    var masterfeed = '/commits/master.atom';

    // This module currently only returns the feed for the master branch
    // The feed can be obtained three different ways:
    // 1. From a username and a repo name
    // 2. From the actual URL to the repo
    // 3. From the URL you get when trying to clone the repo

    function fromNameAndRepo(values) {
        var username = values.user;
        var reponame = values.repo;

        // return null if either values contain '/' or spaces
        if ((username.match(/\//) !== null) ||
            (username.match(/ /) !== null)  ||
            (reponame.match(/\//) !== null) ||
            (reponame.match(/ /) !== null)) {

            return null;
        } else {
            return baseurl + username + '/' + reponame + masterfeed;
        }
    }
    

    function fromUrl(urlstring, cb) {

        var username;
        var reponame;
        

        if (urlstring.match(/github\.com/) === null) {
            
            return null;
        } else {
            username = urlstring.match(/github\.com\/[^/]*/)[0]
                            .replace(/github\.com\//, '');

            reponame = urlstring.match(/github\.com\/[^/]*\/[^/]*/)[0]
                            .replace(/github\.com\/[^/]*\//, '');

            return baseurl + username + '/' + reponame + masterfeed;
        }
    }

    // currently only returns the master branch
    function fromGitUrl(urlstring) {

        var username;
        var reponame;

        // ensure the github domain name is in the string
        if (urlstring.match(/github\.com/) === null) {

            // Return null if the value is invalid
            return null;
        } else {
            // simplified: github.com/[^/]*
            username = urlstring.match(/github\.com\/[^/]*/)[0]
                        .replace(/github\.com\//, '');

            // simplified: [^/]*.git
            reponame = urlstring.match(/[^/]*\.git/)[0]
                        .replace(/\.git/, '');

            return baseurl + username + '/' + reponame + masterfeed;
        }
    }

    // Allow this module to be exported and used
    module.exports = {
        fromUrl,
        fromGitUrl,
        fromNameAndRepo
    };


    // functions here will have the option to generate an the right url 
    // for the feed the user will want
    
    // ideas:
    // maybe verify that the url is a legit github url
    // looks like github has several rss feeds for branches, need to check that


    // other functions to create a feed url from 
    // 1. a user name and repo name
    // 2. the direct url to the repository
    // 3. the git url you can copy while cloning a repo
    // anything else... Not hard to implement, but maybe too many options for the user...
    
})();
