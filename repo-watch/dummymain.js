
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

