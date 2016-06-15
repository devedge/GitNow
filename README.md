# GitNow
A cross-platform Github notification app

***

[Developer information is in the wiki](https://github.com/devedge/GitNow/wiki)
<br><br>
[Ideas about how the program will work here](https://github.com/devedge/GitNow/wiki/Ideas)

## License

GNU GPLv3

<!-- To run after cloning the repository: <br>
`npm install && npm start`
<br><br>
Currently under development (check wiki)
<br><br>
<b>Go to:</b>
* [Dev Notes](#dev-notes)
* [Program Flow](#program-flow)
* [Folder Organization](#folder-organization)



## Dev Notes

  * Using `electron.atom.io v1.0.1` (http://electron.atom.io/)
  * <b>Cross-platform notifications:</b> `node-notifier` (https://www.npmjs.com/package/node-notifier)
  * <b>Watch a repository:</b> `githubhook` (https://www.npmjs.com/package/githubhook)
  * Example electron-style application: `webtorrent.io` (https://webtorrent.io/)
  * Electron.io API & tutorial application (https://github.com/electron/electron-api-demos)
  * npm modules imported: `electron-prebuilt`, `node-notifier`
  
<br>

## Program Flow

  * When `npm start` is entered, the `main.js` is executed
  * `main.js` starts the application and displays the homepage, `views/main.html`

<br>

## Folder Organization

 <i>Home directory</i>
 * main.js <i>(Program start)</i>
 * package.json <i>(Information about the application)</i>
 * repo-watch
   * <i>(code for watching repositories)</i>
 * styling <i>(code for application styling)</i>
    - style.css <i>(custom stylesheet for the application)</i>
    - bootstrap <i>(bootstrap stylesheet stuff. optional, it's just here if we need to use something)</i>
    - jquery <i>(to make the stylesheets work)</i>
    - materialize <i>(the current application theme, but could be replaced)</i> -->


