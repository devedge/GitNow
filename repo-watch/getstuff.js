// (function() {

// 'use strict';
// 
// branch
// https://github.com/devedge/GitNow/commits/master.atom
// 
// full repo?
// https://github.com/devedge/GitNow/commits.atom

var request = require('request');

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

// });

/*

given: url to atom feed

call an 'add feed' function with the url & the time to check (poll time)

a function 















*/
