(function() {
   
   'use strict';

    var baseurl = 'https://github.com/';
    var masterfeed = '/commits/master.atom';

    // This module currently only returns the feed for the master branch
    // The feed can be obtained three different ways:
    // 1. From a username and a repo name
    // 2. From the actual URL to the repo
    // 3. From the URL you get when trying to clone the repo

    // Usage example:

    // const format = require('./feedformat');
    // format.fromNameAndRepo({user: 'devedge', repo: 'GitNow'});
    // format.fromUrl('https://github.com/devedge/GitNow');
    // format.fromGitUrl('https://github.com/devedge/GitNow.git');

    // From the username and repo name
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
            
            return {
                ID: '' + username + reponame,
                url: baseurl + username + '/' + reponame + masterfeed,
                username: username,
                reponame: reponame
            };
        }
    }
    
    // From the URL to the repo
    function fromUrl(urlstring) {

        var username;
        var reponame;

        // ensure the github domain name is in the string
        if (urlstring.match(/github\.com/) === null) {
            
            // Return null if the value is invalid
            return null;
        } else {
            username = urlstring.match(/github\.com\/[^/]*/)[0]
                            .replace(/github\.com\//, '');

            reponame = urlstring.match(/github\.com\/[^/]*\/[^/]*/)[0]
                            .replace(/github\.com\/[^/]*\//, '');

            return {
                ID: '' + username + reponame,
                url: baseurl + username + '/' + reponame + masterfeed,
                username: username,
                reponame: reponame
            };
        }
    }

    // From the URL you get while trying to clone the repo
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

            return {
                ID: '' + username + reponame,
                url: baseurl + username + '/' + reponame + masterfeed,
                username: username,
                reponame: reponame
            };
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
    
})();
