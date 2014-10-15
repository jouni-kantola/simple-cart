var rivets = require('rivets');
require('./views/index');

(function() {
    rivets.configure({
        preloadData: false
    })

    rivets.formatters.length = function(value) {
        return value.length || 0
    }

})()
