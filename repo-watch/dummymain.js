
var PollManager = require('./pollmanager.js');
var manager = new PollManager('./app-data/app_config.json'); // optionally add a filepath argument to config file

manager.init(function (info) {
    // stuff to do after all the watchers have been started
    // maybe callback or event emit here
});


/*

the pollmanager is required, and a 'new' instance is created. the location to the settings file is provided.
the init function is called. this iterates over every 'active' watcher and starts it. when done, it calls back.
















interval watch times are in an array, three values: 20, 10, 3 min
if no time is specified in the manager, then the time of 20 min is assumed




deadtime = false;

if watchlevel = 0 and updated = true
watchlevel = 1

if watchlevel = 1 and updated = true
watchlevel = 2



if watchlevel = 2 and updated = false
    if deadtime = false
        deadtime = true
    else
        watchlevel = 1
        deadtime = false


if watchlevel = 1 and updated = false
    if deadtime = false
        deadtime = true
    else 
        watchlevel = 0
        deadtime = false


*/











// var timeintervals = [1200, 600, 180];
// var watchlevel = 0;
// var wait = true;



// function adapt_interval(updated) {
//     if (updated) {

//         if (watchlevel === 0) {
//             watchlevel = 1; // refresh the watcher here
//             reset_time(timeintervals[watchlevel]);
//             wait = true;

//         } else if (watchlevel === 1) {
//             watchlevel = 2; // refresh the watcher here
//             reset_time(timeintervals[watchlevel]);
//             wait = true;
//         }

//     } else {

//         if (watchlevel === 2) {

//             if (wait) {
//                 wait = false;
//             } else {
//                 watchlevel = 1; // refresh the watcher here
//                 reset_time(timeintervals[watchlevel]);
//                 wait = true;
//             }

//         } else if (watchlevel === 1) {

//             if (wait) {
//                 wait = false;
//             } else {
//                 watchlevel = 0; // refresh the watcher here
//                 reset_time(timeintervals[watchlevel]);
//                 wait = true;
//             }
//         }
//     }

//     console.log('time now: ' + timeintervals[watchlevel]);
// }



// // examples:
// // 20 min interval, + an update
// // interval bumped to 10 min




// // 10 min interval, no update
// // do nothing
// // another 10 min interval, no update
// // bump down to 20 min



// console.log('start time: ' + timeintervals[watchlevel]); // 20
// adapt_interval(false);
// adapt_interval(false);
// // 20 min interval, + an update
// // interval bumped to 10 min
// adapt_interval(true); // 10
// // no update after 10 min, do nothing
// adapt_interval(false); // 10
// // another update, bump interval to 3 min
// adapt_interval(true); // 3
// // after 3 min, no update
// // do nothing
// adapt_interval(false); // 3
// // after another 3 min, no update
// // again, do nothing
// adapt_interval(false);
// // another 3 min, no update
// adapt_interval(false);
// // downgrade back to 10 min (if there was any activity, it would stay at 3 min)
// adapt_interval(false);
// adapt_interval(false);
// adapt_interval(false);
// adapt_interval(true);
// adapt_interval(false);



// // function adapt_interval(updated) {
// //     // if the last check had an update, then the watch time needs to be bumped up a level
// //     //      if the level is the highest, don't bump up anymore
// //     // if the last check did not have an update, then nothing done
// //     // if the last two checks did not have an update, then drop down a level

// //     // Update the watch level
// //     if (updated && (watchlevel < 2)) {
// //         // the last check had an update & the level is 0 or 1
// //         // elevate the watch level by one
// //         watchlevel++;
        
// //     } else if (!updated && (watchlevel > 0)) {

// //         // the last check did not have an update, and the level is 1 or 2
// //         // decrease the watch level by one
// //         watchlevel--;
// //     }
    
// //     // Depending on the watch level, adjust the interval time




// //     if (oldwatch !== watchlevel) {
// //         reset_time(array[watchlevel]);
// //         oldwatch = watchlevel;
// //     }


// //     // if ((watchlevel === 2) && !highest) {
// //     //     highest = true;
// //     //     lowest = false;

        
// //     // } else if ((watchlevel === 0) && !lowest) {
// //     //     highest = false;
// //     //     lowest = true;

// //     //     reset_time(array[watchlevel]);
// //     // }

// // }


// function reset_time(value) {
//     // console.log('reset the time to: ' + value);
//     console.log('RESET CALLED');
// }
