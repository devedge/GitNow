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


<br><br>

`watcher.js` <br>
Watches an individual repo, and keeps track of any changes. Will probably directly implement the `notify` module.


