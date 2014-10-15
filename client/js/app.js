var rivets = require('rivets');
require('./views/index');

(function() {
    rivets.configure({
        preloadData: false
    })

    rivets.formatters.numberAsText = function(value) {
        return value.toString() || '0'
    }
})()
