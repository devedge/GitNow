# repo-watch

Github repo watcher implementation
<br><br>

`pollmanager.js` <br>
Manages the list of repos to watch by instantiating 'watchers' that individually track a repo. Implements methods to address different watchers.<br>
Implementation: <br>

```javascript
// Import the module
var pm = require('pollmanager.js');
// Instantiate a new manager
var pollmanager = new pm();

// Start the manager
pollmanager.init();

```


<br>

`watcher.js` <br>
Watches an individual repo, and keeps track of any changes. Will probably directly implement the `notify` module. <br>
Example usage: <br>

```javascript
// imports
const request = require('request');
const notifier = require('node-notifier');
const Watcher = require('./watcher.js');

// define the fields and an object to store the watchers
var url = 'https://github.com/devedge/GitNow/commits/master.atom';
var time = 15;
var repolist = {};

// initialize a watcher in the 'repolist' object
repolist.devedgeGitNow = new Watcher(url, time, request, notifier);

// start the watcher
repolist.devedgeGitNow.start();
```

