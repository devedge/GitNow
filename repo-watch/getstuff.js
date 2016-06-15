
const format = require('./feedformat');
url = 'https://github.com/devedge/GitNow.git';

console.log(format.fromGitUrl(url));


/*const Watcher = require('./watcher.js');

var gitnowrepo = new Watcher('https://github.com/devedge/GitNow/commits/master.atom', 15000);

// start watching
gitnowrepo.start();*/


/*
var request = require('request');
const EventEmitter = require('events');
var ee = new EventEmitter();

// check every 30 seconds
var repo1 = setInterval(function() {
    wtest('https://github.com/devedge/GitNow/commits/master.atom');
}, 30000);




function wtest(feedURL) {

    ee.emit('req-sent');

    request(feedURL, function(err, resp, body) {
        if(!err && (resp.statusCode === 200)) {
            // and pretend nothing changed
            ee.emit('no-change');

            // stop the interval function
            clearInterval(repo1);
        } else {

            ee.emit('error', err);
        }
    });
}



ee.on('req-sent', function() {
    console.log('Request Sent');
});

ee.on('no-change', function() {
    console.log('No changes found');
});

ee.on('error', function(err) {
    console.log(err);
});

*/



// (function() {

// 'use strict';
// 
// branch
// https://github.com/devedge/GitNow/commits/master.atom
// 
// full repo?
// https://github.com/devedge/GitNow/commits.atom
/*

var username = 'devedge';
var reponame = 'GitNow';

var url = 'https://github.com/' + username + '/' + reponame + '/commits.atom';

var keepgoing = true;
// var task_is_running = false;
var time_interval_in_miliseconds = 6 * 1000;

setInterval(function(){
    if(keepgoing){
        request(url, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                console.log(body);
                keepgoing = false;
            } else {
                console.log(err);
                keepgoing = false;
            }
        });
    }
}, time_interval_in_miliseconds);


*/

// });

/*

given: url to atom feed

call an 'add feed' function with the url & the time to check (poll time)

a function 















*/
