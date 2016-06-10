// (function() {

    // 'use strict';
    // 
    // branch
    // https://github.com/devedge/GitNow/commits/master.atom
    // 
    // full repo?
    // https://github.com/devedge/GitNow/commits.atom
    
    var username = 'devedge';
    var reponame = 'GitNow';

    var url = 'https://github.com/' + username + '/' + reponame + '/commits.atom';

    var task_is_running = false;
    var time_interval_in_miliseconds = 1000;

    setInterval(function(){
        if(!task_is_running){
            task_is_running = true;
            console.log('yolo');
            // do_something(42, function(result){
            task_is_running = false;
            // });
            // break;
        }
    }, time_interval_in_miliseconds);

// });