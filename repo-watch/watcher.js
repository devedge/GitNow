(function() {
    
    'use strict';

    var request = require('request');

    function Watcher(feedURL, cb) {

        request(feedURL, function(err, resp, body) {
            if(!err && (resp.statusCode === 200)) {
                cb(null, body);
            } else {
                cb(err, null);
            }
        });




        // cb(uniqueid);
    }

})();