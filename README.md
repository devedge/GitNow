# GitNow
A cross-platform Github notification app

***

To run after cloning the repository: <br>
`npm install && npm start`
<br><br>
Currently under development (check wiki)




## Dev Notes

  * Using `electron.atom.io v1.0.1` (http://electron.atom.io/)
  * For cross-platform notifications: `node-notifier` (https://www.npmjs.com/package/node-notifier)
  * Example electron-style application: `webtorrent.io` (https://webtorrent.io/)
  * Electron.io examples and API application (https://github.com/electron/electron-api-demos)
  
<br>

<h2>Program Flow</h2>

  * When `npm start` is entered, the `main.js` is executed
  * `main.js` starts the application and displays the homepage, `views/main.html`
